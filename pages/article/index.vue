<template>
	<view class="a-content">
		<view class="" v-if="hasData">
			<view class="" v-for="(item, index) in payload" :key="index"><x-card :dataSource="item" :subIndex="index" @reload="handleReload" /></view>
		</view>
		<x-empty v-if="!hasData" />
	</view>
</template>

<script>
import xCard from '@/components/xCard.vue';
import xEmpty from '@/components/xEmpty.vue';
export default {
	components: {
		xCard,
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
		handleReload(page) {
			this.$emit('a-reload',page)
		},
	}
};
</script>

<style lang="scss" scoped>
.a-content {
	background: #f5f5f5;
	width: 100%;
	box-sizing: border-box;
	overflow-x: hidden;
	min-height: calc(100vh - 200rpx);
	padding: 15rpx;
}
</style>
