<template>
	<view class="" v-show="tipVisible">
		<view class="tips">
			<text>{{ title }}</text>
			<uni-icons class="icon" color="#fff" size="20" type="close" @click="handleClose"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// visible: {
		// 	type: Boolean,
		// 	default: false
		// },
		title: {
			type: String,
			default: '添加到我的小程序，下次使用更便捷'
		}
	},
	data() {
		return {
			tipVisible:false
		};
	},
	computed: {},
	methods: {
		handleClose() {
			this.tipVisible = false;
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
.tips {
	position: absolute;
	right: 0;
	top: 115rpx;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	padding: 10rpx 20rpx;
	font-size: 22rpx;
	margin-right: 60rpx;
	&::after {
		content: '';
		position: absolute;
		bottom: 100%;
		right: 60rpx;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
	}
	.icon {
		margin-left: 10rpx;
	}
}
</style>
