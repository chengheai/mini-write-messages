<template>
	<view class="uni-padding-wrap uni-common-mt">
		<view class="demo">
			<block v-if="imageSrc"><image :src="imageSrc" class="image" mode="widthFix"></image></block>
			<block v-else><view class="uni-hello-addfile f-c-c-c" @click="chooseImage">
			<uni-icons type="plusempty" color="#606266" size="24" class="mb12"></uni-icons>
			<text>选择图片</text>
			</view></block>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title: 'uploadFile',
			imageSrc: ''
		};
	},
	onUnload() {
		this.imageSrc = '';
	},
	methods: {
		chooseImage: function() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: res => {
					console.log('chooseImage success, temp path is', res.tempFilePaths[0]);
					var imageSrc = res.tempFilePaths[0];
					uni.uploadFile({
						url: 'https://unidemo.dcloud.net.cn/upload',
						filePath: imageSrc,
						fileType: 'image',
						name: 'data',
						success: res => {
							console.log('uploadImage success, res is:', res);
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							});
							this.imageSrc = imageSrc;
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
.image {
	width: 100%;
}

.demo {
	background: #fff;
	padding: 20rpx 15rpx;
}
.uni-hello-addfile{
	width: 150rpx;
	height: 150rpx;
	background-color: #F4F5F6;
	color: #606266;
	font-size: 20rpx;
}
</style>
