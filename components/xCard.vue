<template>
	<view class="card-item">
		<!-- 头像 -->
		<view class="card-item-avatar" v-if="showAvatar" :style="imgStyle"><image :src="dataSource.avatarUrl" alt=""></image></view>
		<view class="card-item-avatar" v-else>
			<view class="card-item-avatar-text" :class="dataSource.public === '1' ? 'is-public' : ''">{{ dataSource.public === '1' ? '公开' : '私密' }}</view>
		</view>
		<!-- 右边 -->
		<view class="card-item-right">
			<text v-show="showReport" class="report" @click="actionSheetTap(dataSource)">举报</text>
			<view class="action-wrap" v-show="showAction">
				<image @tap.stop="handleLock(dataSource)" class="scale-task i-lock" v-if="dataSource.public === '0'" src="../static/lock.png" mode="aspectFit"></image>
				<image @tap.stop="handleLock(dataSource)" class="scale-task i-unlock" v-if="dataSource.public === '1'" src="../static/unlock.png" mode="aspectFit"></image>
				<image @tap.stop="handleDel(dataSource)" class="scale-task i-trash" src="../static/trash.png" mode="aspectFit"></image>
			</view>
			<!-- 昵称 -->
			<view class="card-item-right-name">{{ dataSource.nickName }}</view>
			<!-- 内容 -->
			<view class="card-item-right-content">{{ dataSource.content }}</view>
			<!-- 图片 -->

			<view class="card-item-right-imgs" v-if="dataSource.imgs && dataSource.imgs.split(',').length > 0">
				<image mode="aspectFill" class="mr20" :src="RES_ROOT + i" v-for="i in dataSource.imgs.split(',')" @click.native.stop="preImg(RES_ROOT + i)" :key="i"></image>
			</view>
			<!-- 位置 -->
			<view class="card-item-right-address" @click="handleOpenMap(dataSource.address)" v-if="Object.keys(JSON.parse(dataSource.address)).length > 0">
				{{ JSON.parse(dataSource.address).name }}
			</view>
			<view class="card-item-right-bom">
				<!-- 时间 -->
				<view class="card-item-right-bom-date">{{ timestampFormat($dayjs(dataSource.date).format('YYYY-MM-DD HH:mm:ss')) }}</view>
				<!-- 点赞 -->
				<view class="card-item-right-bom-heart" @click="handleLike(dataSource, canLike(dataSource))">
					<uni-icons :type="canLike(dataSource) ? 'heart' : 'heart-filled'" color="#606266" size="20"></uni-icons>
					<text>{{ dataSource.like || 0 }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { RES_ROOT } from '@/utils/http';
import { timestampFormat } from '@/utils/str.js';
export default {
	props: {
		dataSource: {
			type: Object,
			default() {
				return {};
			}
		},
		subIndex: {
			type: [String, Number],
			default: 0
		},
		// 头像模型，square-带圆角方形，circle-圆形
		mode: {
			type: String,
			default: 'circle'
		},
		showReport: {
			type: Boolean,
			default: true
		},
		showAvatar: {
			type: Boolean,
			default: true
		},
		// 个人操作
		showAction: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			RES_ROOT
		};
	},
	computed: {
		imgStyle() {
			let style = {
				borderRadius: this.mode == 'circle' ? '50%' : '20rpx'
			};
			return style;
		}
	},
	methods: {
		timestampFormat,
		async handleLock(row) {
			let that = this;
			let obj = {
				...row,
				public: row.public === '1' ? '0' : '1'
			};
			const { code, result } = await that.$api.article.editArticle({ ...obj });
			if (code === 200) {
				uni.showToast({
					icon: 'none',
					title: '更新成功'
				});
				that.$emit('reload', { page: Math.floor(parseInt(that.subIndex) / 10) + 1 });
			}
		},
		handleDel(row) {
			let that = this;
			uni.showModal({
				title: '提示',
				content: `确定删除该条寄语吗?`,
				success: async function(res) {
					if (res.confirm) {
						const { code, result } = await that.$api.article.fetchDel({ ...row });
						if (code === 200) {
							uni.showToast({
								icon: 'none',
								title: '删除成功'
							});
							that.$emit('reload', { page: Math.floor(parseInt(that.subIndex) / 10) + 1, _id: row._id });
						}
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		actionSheetTap(query) {
			const that = this;
			let userId = uni.getStorageSync('userId');
			uni.showActionSheet({
				title: '举报类型',
				itemList: ['垃圾信息', '色情低俗', '黄毒政等', '其他'],
				// popover: {
				// 	// 104: navbar + topwindow 高度，暂时 fix createSelectorQuery 在 pc 上获取 top 不准确的 bug
				// 	top: that.buttonRect.top + 104  + that.buttonRect.height,
				// 	left: that.buttonRect.left + that.buttonRect.width / 2
				// },
				success: async e => {
					console.log(e.tapIndex);
					if (query.reports && query.reports.split(',').includes(userId)) {
						uni.showModal({
							title: '提示',
							content: '您已经举报过了，无需重复提交 ！',
							showCancel: false,
							confirmText: '知道了'
						});
						return;
					}
					let type = e.tapIndex + 1;
					const { code, result } = await that.$api.like.fetchReport({
						query,
						type
					});
					if (code === 200) {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						});
						that.$emit('reload', { page: Math.floor(parseInt(that.subIndex) / 10) + 1 });
					}
				}
			});
		},
		// 是否可以点赞
		canLike(item) {
			const { likers } = item;
			let result = true;
			let userId = uni.getStorageSync('userId');
			// console.log('-----',(likers && likers.split(',').length > 0))
			if (likers && likers.split(',').length > 0) {
				result = likers.split(',').filter(l => l === userId).length > 0 ? false : true;
			}
			return result;
		},
		// 点赞
		async handleLike(query, type) {
			let obj = {
				query,
				isLike: type ? '1' : '0'
			};
			const { code, result } = await this.$api.like.fetchLike(obj);
			if (code === 200) {
				console.log('ok');
				// 发送操作的内容所处的页数
				console.log(this.subIndex);
				console.log(Math.floor(parseInt(this.subIndex) / 10) + 1);
				this.$emit('reload', Math.floor(parseInt(this.subIndex) / 10) + 1);
			}
		},
		handleOpenMap(data) {
			// JSON.parse(data)
			uni.openLocation(JSON.parse(data));
		},
		// 预览
		preImg(logourl) {
			let imgsArray = [];
			imgsArray[0] = logourl;
			uni.previewImage({
				current: 0,
				urls: imgsArray
			});
			uni.stopPullDownRefresh();
		}
	}
};
</script>

<style lang="scss" scoped>
.flex {
	display: flex;
	justify-content: center;
	align-items: center;
}
.is-public {
	background-color: #0090be !important;
}
.card-item {
	@extend .flex;
	justify-content: flex-start;
	align-items: flex-start;
	width: 720rpx;
	padding: 30rpx;
	box-sizing: border-box;
	background-color: #fff;
	// margin: 0 auto;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
	&-avatar {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		image {
			width: 100%;
			height: 100%;
		}
		&-text {
			width: 100%;
			font-size: 30rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background: #f0ad4e;
			border: 10rpx solid #f5f5f5;
			border-radius: 20rpx;
			box-sizing: border-box;
		}
	}
	&-right {
		@extend .flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		.report {
			position: absolute;
			z-index: 9;
			right: 0;
			top: 0;
			color: #c8c7cc;
			font-size: 24rpx;
		}
		.action-wrap {
			position: absolute;
			z-index: 9;
			right: 0;
			top: 0;
			image {
				width: 30rpx;
				height: 30rpx;
				margin-left: 30rpx;
			}
		}
		&-name {
			font-weight: 600;
			font-size: 38rpx;
			color: #0090be;
		}
		&-content {
			// font-size: 24rpx;
			margin-bottom: 25rpx;
			width: 500rpx;
		}
		&-imgs {
			width: 200rpx;
			height: 200rpx;
			@extend .flex;
			justify-content: flex-start;
			align-items: flex-start;
			image {
				width: 100%;
				height: 100%;
				object-fit: cover;
				float: left;
			}
		}
		&-address {
			color: #0090be;
			font-size: 24rpx;
			font-weight: 400;
			margin: 15rpx 0;
		}
		&-bom {
			@extend .flex;
			width: 100%;
			padding: 0 5rpx;
			box-sizing: border-box;
			justify-content: space-between;
			&-date {
				font-weight: 300;
				color: #c8c7cc;
			}
			&-heart {
				// font-weight: 300;
				// color: #C8C7CC;
				@extend .flex;
				// font-size: 28rpx;
				text {
					margin-left: 5rpx;
				}
			}
		}
	}
}
</style>
