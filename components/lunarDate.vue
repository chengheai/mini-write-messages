<template>
	<view class="f-s-c date">
		<text>{{ dateObj.cYear }}年{{ dateObj.cMonth }}月{{ dateObj.cDay }}日</text>
		<text>{{ dateObj.ncWeek }}</text>
		<text>{{ dateObj.IMonthCn }}{{ dateObj.IDayCn }}</text>
	</view>
</template>

<script>
import { calendar } from '@/utils/lunar.js';
console.log(calendar);
export default {
	data() {
		return {
			dateObj: {
				cYear:'-',
				cMonth:'-',
				cDay:'-',
				ncWeek:'-',
				IMonthCn:'-',
				IDayCn:'-'
			}
		};
	},
	mounted() {
		const solar2lunarData = calendar.solar2lunar();
		console.log(solar2lunarData);
		// const { IMonthCn,IDayCn,cYear,cMonth,cDay,ncWeek } = solar2lunarData
		this.dateObj = Object.assign({}, solar2lunarData);
	}
};
</script>

<style lang="scss" scoped>
.date {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 15rpx;
	background-color: #fff;
}
</style>
