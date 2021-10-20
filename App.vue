<script>
export default {
	onLaunch: function() {
		this.checkIphoneX();
		this.checkBarH();
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	methods: {
		checkIphoneX() {
			let info = uni.getSystemInfoSync();
			if (/iPhone X/i.test(info.model)) {
				uni.setStorageSync('isIphoneX', true);
			} else {
				uni.setStorageSync('isIphoneX', false);
			}
		},
		checkBarH() {
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44;
			uni.setStorageSync('BTHeight', statusBarHeight);
		}
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
