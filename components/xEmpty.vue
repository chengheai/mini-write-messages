<template>
	<view class="empty">
		<image src="../static/empty.png" mode="aspectFit"></image>
		<text>{{ desc }}</text>
	</view>
</template>
<script>
export default {
	props: {
		desc: {
			type: String,
			default: '暂无数据'
		}
	}
};
</script>
<style lang="scss" scoped>
.empty {
	width: 100%;
	height: 300rpx;
	background-color: #fff;
	border-radius: 20rpx;
	margin-top: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	image {
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
	}
	text {
		font-size: 30rpx;
		color: #dbdbdb;
	}
}
</style>
