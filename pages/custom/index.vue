<template>
	<view class="x-content">
		<lunar-date style="width: 100%;" />
		<view class="form-wrapper">
			<!-- 内容 -->
			<view class="uni-textarea"><textarea v-model="form.content" placeholder-style="color:#13c2c2" :auto-blur="true" maxlength="-1" :placeholder="words[radomIndex]" /></view>
			<!-- 图片 -->
			<view class="img-list">
				<view v-for="(i, index) in form.imgs" :key="index">
					<view class="item-img mr20">
						<image :src="RES_ROOT + i" mode="aspectFit" @click.native.stop="preImg(RES_ROOT + i)"></image>
						<uni-icons type="close" color="#606266" size="20" class="del-btn" @click="handleDel(index, i)"></uni-icons>
					</view>
				</view>
				<view v-if="form.imgs.length < 2" class="uni-hello-addfile f-c-c-c" @click="handleChooseImage">
					<uni-icons type="plusempty" color="#606266" size="24" class="mb12"></uni-icons>
					<text>选择图片</text>
				</view>
			</view>
			<!-- 位置 -->
			<view class="map" @click="handleSelLocaltion">
				<view class="map-item">
					<uni-icons :type="mapIcon" :color="mapColor" size="20"></uni-icons>
					<text :style="{ color: mapColor }">{{ mapAddress }}</text>
				</view>
				<uni-icons class="map-action" @click.native.stop="handleClearLocaltion" :type="actionIcon" color="#ccc" size="20"></uni-icons>
			</view>
			<!-- 是否公开 -->
			<view class="public-wrapper"><uni-data-checkbox v-model="form.public" :localdata="types" /></view>
			<view class="sub-wrp"><x-login @submit="handleSubmit" /></view>
		</view>
		<uni-popup ref="popup" type="message"><uni-popup-message type="error" :message="errMsg" :duration="2000"></uni-popup-message></uni-popup>
	</view>
</template>

<script>
import { BASE_URL } from '@/utils/http';
import { RES_ROOT } from '@/utils/http';
import lunarDate from '@/components/lunarDate.vue';
import xLogin from '@/components/xLogin.vue';
import logo from '@/static/logo.png';
let mapObj = {
	color: '#ccc',
	size: '20',
	type: 'location'
};
export default {
	components: {
		lunarDate,
		xLogin
	},
	data() {
		return {
			words: [
				'路就在脚下，你无力改变终点，但却能决定脚踏出的方向',
				'热情和欲望可以突破一切难关',
				'忘记失败的痛苦，铭记失败的原因',
				'要成功，不要与马赛跑，要骑在马上，马上成功',
				'当一个人真正觉悟的一刻，他放下追寻外在世界的财富，而开始追寻他内心世界的真正财富'
			],
			radomIndex: 0,
			types: [
				{
					text: '寄语墙',
					value: 1
				},
				{
					text: '私密寄语',
					value: 0
				}
			],
			hasLocaltion: false,
			errMsg: '请输入寄语',
			RES_ROOT,
			form: {
				content: '',
				imgs: [],
				address: {},
				public: 1
			}
		};
	},
	computed: {
		mapColor() {
			return this.hasLocaltion ? 'green' : '#ccc';
		},
		mapIcon() {
			return this.hasLocaltion ? 'location-filled' : 'location';
		},
		actionIcon() {
			return this.hasLocaltion ? 'close' : 'forward';
		},
		mapAddress() {
			return this.hasLocaltion ? this.form.address.name : '选择位置信息';
		}
	},
	onShow() {
		this.radomIndex = Math.round(Math.random() * 4) + 0;
	},
	onLoad() {
		this.$nextTick(() => {
			this.resetForm();
		});
	},
	// onShareAppMessage: function(options) {
	// 	var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
	// 	var shareObj = {
	// 		title: '写诗、写实、写史、写事', // 默认是小程序的名称(可以写slogan等)
	// 		path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
	// 		imgUrl: share, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
	// 		success: function(res) {
	// 			// 转发成功之后的回调
	// 			if (res.errMsg == 'shareAppMessage:ok') {
	// 				console.log('分享ok');
	// 			}
	// 		},
	// 		fail: function() {
	// 			// 转发失败之后的回调
	// 			if (res.errMsg == 'shareAppMessage:fail cancel') {
	// 				// 用户取消转发
	// 			} else if (res.errMsg == 'shareAppMessage:fail') {
	// 				// 转发失败，其中 detail message 为详细失败信息
	// 			}
	// 		}
	// 	}; // 来自页面内的按钮的转发
	// 	if (options.from == 'button') {
	// 		var eData = options.target.dataset;
	// 		console.log(eData.name); // shareBtn // 此处可以修改 shareObj 中的内容
	// 		shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
	// 	} // 返回shareObj
	// 	return shareObj;
	// },
	methods: {
		// 重置
		resetForm() {
			this.form.content = '';
			this.form.imgs = [];
			this.form.address = {};
			this.form.public = 1;
			this.hasLocaltion = false;
		},
		// 清除位置
		handleClearLocaltion() {
			if (!this.hasLocaltion) {
				return;
			}
			this.hasLocaltion = false;
			this.form.address = {};
		},
		// 提交
		async handleSubmit() {
			let query = {
				...this.form,
				address: JSON.stringify(this.form.address),
				imgs: this.form.imgs.join(',')
			};
			if (this.form.content === '') {
				this.$refs.popup.open();
				return;
			}
			if (this.form.content.length > 800) {
				this.errMsg = '寄语长度不能超过800字';
				this.$refs.popup.open();
				return;
			}
			// if (this.form.content.length > 5) {
			// 	this.errMsg ='请输入不小于5个字的寄语'
			// 	this.$refs.popup.open();
			// 	return;
			// }
			const { code, result } = await this.$api.article.addArticle(query);
			if (code === 200) {
				uni.showToast({
					title: '创建成功',
					icon: 'success',
					duration: 1500
				});
				this.resetForm();
				uni.setStorageSync('tabIndex',0)
				uni.redirectTo({
					url:'../index/index'
				})
			}
		},
		// 选位置
		handleSelLocaltion() {
			uni.chooseLocation({
				success: res => {
					this.form.address = Object.assign({}, res);
					this.hasLocaltion = true;
					mapObj = Object.assign(mapObj, { type: 'location-filled', color: 'green' });
					console.log(res);
				}
			});
		},
		// 删除
		handleDel(index, row) {
			this.form.imgs.splice(index, 1);
			console.log(index, row);
		},
		// 预览
		preImg(logourl) {
			let imgsArray = [];
			imgsArray[0] = logourl;
			uni.previewImage({
				current: 0,
				urls: imgsArray
			});
		},
		// 上传
		handleChooseImage() {
			let that = this;
			uni.chooseImage({
				count: 2,
				sourceType: ['album', 'camera'],
				success: res => {
					console.log('chooseImage success, temp path is', res.tempFilePaths[0]);
					var imageSrc = res.tempFilePaths[0];
					uni.uploadFile({
						url: `${BASE_URL}/api/file/upload`,
						filePath: imageSrc,
						fileType: 'image',
						formData: {
							prefix: that.$dayjs().format('YYYYMMDD')
						},
						name: 'file',
						success: res => {
							console.log('uploadImage success, res is:', res);
							const { code, result } = JSON.parse(res.data);
							if (code === 200) {
								uni.showToast({
									title: '图片上传成功',
									duration: 1000
								});
								that.form.imgs.push(result);
							}
						},
						fail: err => {
							console.log('uploadImage fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
						}
					});
				},
				fail: err => {
					console.log('chooseImage fail', err);
					// #ifdef MP
					uni.getSetting({
						success: res => {
							let authStatus = res.authSetting['scope.album'];
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: '写寄语需要从您的相册获取图片，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
					// #endif
				}
			});
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
.x-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #f5f5f5;
	overflow-y: auto;
	.form-wrapper {
		width: 100%;
		// background-color: #fff;
		.uni-textarea {
			width: 100%;
			padding: 20rpx 15rpx;
			box-sizing: border-box;
			textarea {
				width: 100%;
				height: 500rpx;
				color: #333;
			}
		}
		.img-list {
			background: #fff;
			padding: 20rpx 15rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.item-img {
				position: relative;
				width: 150rpx;
				height: 150rpx;
				image {
					width: 100%;
					height: 100%;
				}
				.del-btn {
					position: absolute;
					right: -20rpx;
					top: -20rpx;
				}
			}
		}
		.uni-hello-addfile {
			width: 150rpx;
			height: 150rpx;
			background-color: #f4f5f6;
			color: #606266;
			font-size: 20rpx;
		}
		.public-wrapper {
			background-color: #fff;
			padding: 10rpx 15rpx;
			// padding-bottom: 48rpx;
		}
		.sub-wrp {
			background-color: #fff;
			padding-top: 48rpx;
			// margin-bottom: 100rpx;
			// box-sizing: border-box;
		}
		.map {
			@extend .flex;
			justify-content: space-between;
			padding: 30rpx 15rpx;
			background-color: #fff;

			&-item {
				color: #c8c7cc;
				@extend .flex;
				text {
					margin-left: 15rpx;
				}
			}
			&-action {
			}
		}
	}
}
</style>
