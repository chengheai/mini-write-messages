<template>
	<view class="mine-wrapper">
		<x-tips ref="myTip" />
		<view class="bg"></view>
		<view class="mine" v-if="hasLogin === false">
			<image class="logo" src="../../static/logo5.png" mode="aspectFit"></image>
			<view class="title">写寄语</view>
			<view class="decs">写诗、写实、写史、写事</view>
			<x-login title="微信一键登录" style="margin-top: 48rpx;" @submit="handleSubmit" />
		</view>
		<view class="center" v-if="hasLogin === true">
			<view class="center-avatar">
				<image :src="userInfo.avatarUrl || base64Avatar" mode="aspectFill"></image>
				<view class="avatar-name">
					<text>{{ userInfo.nickName || '路人甲' }}</text>
					<text>普通用户</text>
				</view>
			</view>
			<view class="top-card">
				<view class="top">
					<text>寄语：{{ total }}</text>
					<text>积分：{{ integral }}</text>
				</view>

				<view class="bom">
					<view class="bom-item" @click="handleFav">
						<uni-icons type="star" color="#606266" size="20"></uni-icons>
						<text>收藏小程序</text>
					</view>
					<button class="bom-item btn-reset" data-name="shareBtn" open-type="share">
						<uni-icons type="redo" color="#606266" size="20"></uni-icons>
						<text>好友分享</text>
					</button>
					<view class="bom-item" @click="handleRules">
						<uni-icons type="settings" color="#606266" size="20"></uni-icons>
						<text>积分规则</text>
					</view>
				</view>
			</view>
			<view class="" v-if="hasData">
				<view class="m-list" v-for="(item, index) in list" :key="index"><x-card :showAvatar="false" :subIndex='index' :showReport="false" @reload="handleReload" :dataSource="item" /></view>
				<uni-load-more color="#fff" :content-text='contentText' :status="status"></uni-load-more>
			</view>
			<x-empty v-else />
		</view>
	</view>
</template>

<script>
import xCard from '@/components/xCard.vue';
import xEmpty from '@/components/xEmpty.vue';
import xLogin from '@/components/xLogin.vue';
import xTips from '@/components/xTips.vue';
import share from '@/static/images/share.jpg';
let base64Avatar =
	'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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';
export default {
	components: {
		xCard,
		xEmpty,
		xLogin,
		xTips
	},
	data() {
		return {
			hasLogin: null,
			initLoad: false,
			base64Avatar,
			list: [],
			resList: [],
			total: 0,
			status: 'more',
			from: {
				page: 1,
				pageSize: 10,
				type: 'self',
				userId: ''
			},
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '加载中...',
				contentnomore: '我是有底线的'
			},
			userInfo: {}
		};
	},
	computed: {
		hasData() {
			return this.list.length !== 0;
		},
		integral() {
			return Math.ceil(this.total * 0.58936);
		}
	},
	onShareAppMessage: function(options) {
		var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
		var shareObj = {
			title: '写诗、写实、写史、写事', // 默认是小程序的名称(可以写slogan等)
			path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
			imgUrl: share, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			success: function(res) {
				// 转发成功之后的回调
				if (res.errMsg == 'shareAppMessage:ok') {
					console.log('分享ok');
				}
			},
			fail: function() {
				// 转发失败之后的回调
				if (res.errMsg == 'shareAppMessage:fail cancel') {
					// 用户取消转发
				} else if (res.errMsg == 'shareAppMessage:fail') {
					// 转发失败，其中 detail message 为详细失败信息
				}
			}
		}; // 来自页面内的按钮的转发
		if (options.from == 'button') {
			var eData = options.target.dataset;
			console.log(eData.name); // shareBtn // 此处可以修改 shareObj 中的内容
			shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
		} // 返回shareObj
		return shareObj;
	},
	async onShow() {
		this.initLoad = true;
		this.list = [];
		await this.getUser();
		this.getData();
		// setTimeout(function() {
		// 	console.log('start pulldown');
		// }, 1000);
		// uni.startPullDownRefresh();
	},
	onReachBottom() {
		console.log('onReachBottom');
		this.initLoad = false;
		if (this.resList.length < 10) {
			this.status = 'noMore';
			return;
		}
		this.status = 'loading';
		setTimeout(() => {
			if (this.resList.length === 10) {
				this.from.page++;
			}
			this.getData();
		}, 300);
	},
	async onPullDownRefresh() {
		this.from.page = 1;
		this.getData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 300);
	},
	methods: {
		async handleSubmit() {
			await this.getUser();
			this.getData();
		},
		handleFav() {
			this.$refs.myTip.tipVisible = true;
			setTimeout(() => {
				this.$refs.myTip.tipVisible = false;
			}, 5000);
			console.log(this.$refs.myTip);
		},
		handleRules() {
			uni.showModal({
				showCancel: false,
				confirmText: '知道了',
				title: '积分规则',
				content: '积分计算规则根据寄语条数、寄语系数、寄语点赞数、寄语举报数、用户活跃度综合计算打分。'
			});
		},
		handleReload(page) {
			this.from.page = page;
			this.getData();
		},
		async getUser() {
			this.$api.user
				.fetchUser()
				.then(res => {
					const { code, result } = res;
					if (code === 200) {
						this.hasLogin = true;
						this.userInfo = result;
						this.from.userId = result._id;
					}
				})
				.catch(err => {
					// this.hasLogin = false;
					console.log('err');
				});
		},
		async getData() {
			const {
				code,
				result: { data, total }
			} = await this.$api.article.fetchList(this.from);
			if (code === 200) {
				this.resList = data;
				this.total = total;
				let formatList = [];
				if (this.list.length === 0) {
					this.list = data;
				} else {
					this.list = this.list.map(item => {
						return data.find(i => i._id === item._id) || item;
					});
					let ids = this.list.map(item => item._id);
					formatList = data.filter(item => !ids.includes(item._id));
				}
				// 第一次加载新数据加在前面
				if (this.initLoad) {
					this.list = (this.list.length === 0 ? data : formatList).concat(this.list);
				} else {
					this.list = this.list.concat(this.list.length === 0 ? data : formatList);
				}
				if (data.length === 0) {
					this.status = 'noMore';
				}
			}
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
.mine-wrapper {
	position: relative;
	background-color: #f5f5f5;
	height: 100vh;
	.bg {
		position: fixed;
		background: url('../../static/images/3.webp') no-repeat;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.center {
		position: absolute;
		min-height: calc(100vh - 160rpx);
		padding: 120rpx 15rpx 80rpx;
		width: 100%;
		box-sizing: border-box;
		z-index: 3;
		&-avatar {
			@extend .flex;
			justify-content: flex-start;
			width: 100%;
			margin-bottom: 50rpx;
			image {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}
			.avatar-name {
				@extend .flex;
				flex-direction: column;
				align-items: flex-start;
				margin-left: 20rpx;
			}
		}
		.top-card {
			width: 100%;
			border-radius: 10rpx;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			.top {
				@extend .flex;
				justify-content: space-between;
				padding: 10rpx 15rpx;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #f5f5f5;
			}
			.bom {
				@extend .flex;
				justify-content: space-between;
				padding: 10rpx 15rpx;
				padding-top: 20rpx;
				&-item {
					@extend .flex;
					flex-direction: column;
					text {
						margin-top: 10rpx;
						color: #333333;
						font-size: 24rpx;
					}
				}
				.btn-reset {
					padding: 0 !important;
					line-height: inherit !important;
					background: #fff !important;
					&::after {
						border: none;
					}
				}
			}
		}
		.m-list {
			margin-top: 30rpx;
		}
	}
	.mine {
		width: 100%;
		height: 100vh;
		position: absolute;
		z-index: 3;
		// background: url('../../static/images/b2.webp') no-repeat;
		// opacity: 0.7;
		@extend .flex;
		flex-direction: column;
		.logo {
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
		}
		.title {
			font-size: 80rpx;
			letter-spacing: 30rpx;
			font-weight: 600;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #13c2c2;
		}
		.decs {
			color: #13c2c2;
			position: relative;
			// &::after{
			// 	content: '----';
			// 	position: absolute;
			// 	right: 0;
			// 	top: 50%;
			// 	margin-top: -50%;
			// }
		}
		.uni-btn-v {
			margin-top: 48rpx;
			// background-color: #fff;
			button {
				width: 702rpx;
				height: 88rpx;
				background: #13c2c2;
				box-shadow: 0px 10rpx 20rpx 0px rgba(0, 0, 0, 0.1);
				border-radius: 9rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				line-height: 88rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
