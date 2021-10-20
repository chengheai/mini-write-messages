<template>
	<view class="mine-wrapper">
		<x-tips ref="myTip" />
		<view class="bg"></view>
		<view class="mine" v-if="hasLogin == '-1'">
			<image class="logo" src="../../static/logo5.png" mode="aspectFit"></image>
			<view class="title">写寄语</view>
			<view class="decs">写诗、写实、写史、写事</view>
			<x-login title="微信一键登录" style="margin-top: 48rpx;" @submit="handleSubmit" />
		</view>
		<view class="center" v-if="hasLogin == '1'">
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
			<view class="" style="padding-bottom: 100rpx;" v-if="hasData">
				<view class="m-list" v-for="(item, index) in payload" :key="index">
					<x-card :showAvatar="false" :showAction='true' :subIndex="index" :showReport="false" @reload="handleReload" :dataSource="item" />
				</view>
			</view>
			<x-empty v-if="!hasData" />
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
			hasLogin: uni.getStorageSync('hasLogin') || null,
			base64Avatar
		};
	},
	props: {
		payload: {
			type: Array,
			default: () => []
		},
		userInfo: {
			type: Object,
			default: () => {}
		},
		total: {
			type: Number,
			default: 0
		}
	},
	computed: {
		hasData() {
			return this.payload.length !== 0;
		},
		integral() {
			return Math.ceil(this.total * 0.58936);
		}
	},

	methods: {
		async handleSubmit() {
			await this.getUser();
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
			this.$emit('u-reload', page);
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
	height: auto;
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
		min-height: calc(100vh - 100rpx);
		padding: 50rpx 15rpx 15rpx;
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
		height: calc(100vh - 100rpx);
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
