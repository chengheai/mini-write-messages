<template>
	<view class="wall-wrap">
		<view class="" v-if="hasData">
			<view class="art-item" v-for="(item, index) in payload" :key="index">
				<view class="content" @click="handleCopy(item,index)">{{ item.content }}</view>
				<view class="act-btn" @click="handleCopy(item,index)">
					<image src="../../static/copy.png" mode="aspectFit"></image>
					<text class="copy">复制</text>
					<text>{{ item.copyNum }}</text>
				</view>
			</view>
		</view>
		<x-empty v-if="!hasData" />
	</view>
</template>
<script>
import xEmpty from '@/components/xEmpty.vue';
export default {
	components: {
		xEmpty
	},
	props: {
		payload: {
			type: Array,
			default: []
		}
	},
	data() {
		return {};
	},
	computed: {
		hasData() {
			return this.payload.length !== 0;
		}
	},
	methods: {
		// 复制数
		async handleCopy(row, index) {
			let that = this;
			const { content, _id } = row;
			let obj = {
				...row,
				copyNum: row.copyNum++
			};
			const { code, message } = await that.$api.wall.editWall(obj);
			if (code === 200) {
				uni.setClipboardData({
					data: content,
					success: function() {
						//调用方法成功
						console.log('success');
						// uni.showToast({
						// 	icon: 'success',
						// 	title: '已复制'
						// });
						let page = Math.floor(parseInt(index) / 10) + 1;
						that.$emit('d-reload',{page})
					}
				});
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.wall-wrap {
	background: #f5f5f5;
	padding: 20rpx 15rpx;
	.art-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0rpx 0rpx 5rpx 1rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 20rpx;
		overflow: hidden;
		.content {
			padding: 40rpx 40rpx;
			font-size: 30rpx;
			line-height: 1.5;
			color: #333333;
		}
		.act-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
			font-size: 24rpx;
			background-color: #f9f9f9;
			padding: 15rpx 30rpx;
			color: #888888;
			font-weight: 500;
			font-weight: bold;
			image {
				width: 30rpx;
				height: 30rpx;
			}
			.copy {
				margin: 0 10rpx;
			}
		}
	}
}
</style>
