<template>
	<view class="brn-wrap">
		<view class="uni-btn-v" v-if="hasLogin !='1'">
			<button @click="handleBeforeLogin">{{ title }}</button>
		</view>
		<view class="uni-btn-v" v-else>
			<button @click="handleTitleClick">{{ title }}</button>
		</view>
	</view>
</template>

<script>
import { requestLogin } from '@/utils/str.js';
export default {
	props: {
		title: {
			type: String,
			default: '提交发布'
		}
	},
	data() {
		return {
			hasLogin: uni.getStorageSync('hasLogin')
		};
	},
	methods: {
		handleTitleClick() {
			this.$emit('submit');
		},
		handleBeforeLogin() {
			let that = this;
			// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			wx.getUserProfile({
				desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					console.log(res);
					that.doLogin(res);
				}
			});
		},
		doLogin(detail) {
			const self = this;
			if (detail.errMsg === 'getUserProfile:ok') {
				console.log('===', detail);
				const options = wx.getLaunchOptionsSync();
				const scene = options.scene + '';
				if (scene.startsWith('CRLAND:')) {
					detail.userInfo.scene = scene.substr(7);
				}
				requestLogin().then(async data => {
					console.log('========', detail.userInfo);
					const obj = {
						...detail.userInfo,
						userInfo: detail.rawData,
						code: data.code
					};
					const { code, result } = await this.$api.user.login(obj);
					if (code === 200) {
						uni.setStorageSync('userInfo', JSON.stringify(detail.userInfo));
						uni.setStorageSync('token', result.token);
						uni.setStorageSync('userId', result.userId);
						uni.setStorageSync('hasLogin', 1);
						// this.hasLogin = true;
						uni.setStorageSync('tabIndex', 1);
						uni.redirectTo({
							url: '../index/index'
						});
					} else {
						uni.showModal({
							title: '提示',
							content: e.msg || '登录失败',
							showCancel: false,
							confirmText: '确定',
							success: res => {}
						});
					}
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.brn-wrap {
	// background-color: #fff;
	// padding-top: 48rpx;
	.uni-btn-v {
		button {
			width: 702rpx;
			height: 88rpx;
			background: #13c2c2;
			box-shadow: 0px 10rpx 20rpx 0px rgba(0, 0, 0, 0.1);
			border-radius: 9rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
		}
	}
}
</style>
