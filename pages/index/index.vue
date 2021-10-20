<template>
	<view style="background-color: f5f5f5;" :style="[wrapStyle]">
		<view v-if="theme == 'default'"><i-default :payload="dList" @d-reload="handleReload" /></view>

		<view v-if="theme == 'custom'">
			<i-user v-if="active == 2" :payload="uList" :userInfo="userInfo" :total="total" @u-reload="handleReload" />
			<i-write v-if="active == 1" />
			<i-article v-if="active == 0" :payload="aList" @a-reload="handleReload" />
			<view class="b-tab f-sa-c" :style="{ 'padding-bottom': isIphoneX ? '64rpx' : '0' }">
				<view class="t-item f-c-c-c" :class="{ active: active == index }" v-for="(it, index) in tabs" :key="index" @click="handleClick(index, it)">
					<image :src="active == index ? it.asrc : it.src" mode="aspectFill"></image>
					<text>{{ it.name }}</text>
				</view>
			</view>
		</view>
		<uni-load-more v-if="currentType && currentType != 'uList'" :status="status" :content-text="contentText"></uni-load-more>
	</view>
</template>

<script>
import iUser from '@/pages/user/index';
import iWrite from '@/pages/custom/index.vue';
import iArticle from '@/pages/article/index';
import iDefault from '@/pages/default/index.vue';
import aimg1 from '@/static/images/tabs/nav_1_s.png';
import img1 from '@/static/images/tabs/nav_1_n.png';
import aimg2 from '@/static/images/tabs/nav_2_s.png';
import img2 from '@/static/images/tabs/nav_2_n.png';
import aimg3 from '@/static/images/tabs/nav_3_s.png';
import img3 from '@/static/images/tabs/nav_3_n.png';
import { clearStorage } from '@/utils/str.js';
export default {
	components: {
		iUser,
		iWrite,
		iArticle,
		iDefault
	},
	props: {
		activeIndex: {
			type: [String],
			default: '1'
		}
	},
	data() {
		return {
			isIphoneX: uni.getStorageSync('isIphoneX'),
			active: uni.getStorageSync('tabIndex'),
			tabs: [
				{ name: '寄语墙', src: img3, asrc: aimg3, url: '/pages/article/index' },
				{ name: '写寄语', src: img1, asrc: aimg1, url: '/pages/index/index' },
				{ name: '我 的', src: img2, asrc: aimg2, url: '/pages/user/index' }
			],
			theme: '',
			status: 'more',
			initLoad: false,
			form: {
				page: 1,
				pageSize: 10
			},
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '加载中...',
				contentnomore: '我是有底线的'
			},
			total: 0,
			userInfo: {},
			userQuery: {
				type: 'self',
				userId: ''
			},
			dList: [], // 默认列表
			uList: [], // 用户页面
			aList: [], // 寄语墙
			resList: []
		};
	},
	async onLoad(options) {
		await this.getTheme();
		console.log('options:', options);
		if (options.isShare && options.isShare == '1' && options.theme == 'custom') {
			this.active = options.tabIndex;
			uni.setStorageSync('tabIndex', options.tabIndex);
			// uni.redirectTo({
			// 	url: '../index/index'
			// });
		}
		setTimeout(function() {
			console.log('start pulldown');
		}, 300);
		console.log('----', this.data);
		uni.startPullDownRefresh();
	},
	onReachBottom() {
		console.log('onReachBottom');
		this.initLoad = false;
		if (this.resList.length < 10) {
			this.status = 'noMore';
			return;
		}
		this.status = 'loading';
		setTimeout(() => {
			if (this.resList.length == 10) {
				this.form.page++;
			}
			console.log('=====');
			this.getData();
		}, 300);
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
		console.log(this.form);
		this.form.page = 1;
		this.initCommon();
		console.log('first');
		this.getData();
		console.log('end');
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 500);
	},
	computed: {
		// 当前list值
		currentType() {
			let result = null;
			switch (this.currentPage) {
				case 'default':
					result = 'dList';
					break;
				case 'article':
					result = 'aList';
					break;
				case 'user':
					result = 'uList';
					break;
			}
			return result;
		},
		// 是否有pb样式
		wrapStyle() {
			let style = {};
			style.paddingBottom = this.currentType && this.theme == 'custom' ? '100rpx' : '';
			return style;
		},
		// 当前页
		currentPage() {
			let result = null;
			if (this.theme == 'default') {
				result = 'default';
			} else if (this.theme == 'custom') {
				if (this.active == '1') {
					result = 'write';
				} else if (this.active == '2') {
					result = 'user';
					// this.handleClick(2);
				} else {
					result = 'article';
				}
			}
			return result;
		}
	},
	watch: {
		active: {
			immediate: true,
			handler(val) {
				if (val == '0') {
					uni.setNavigationBarTitle({
						title: '寄语墙'
					});
				} else if (val == '1') {
					uni.setNavigationBarTitle({
						title: '写寄语'
					});
				} else if (val == '2') {
					uni.setNavigationBarTitle({
						title: '我的'
					});
				}
				this.initLoad = true;
			}
		},
		theme: {
			immediate: true,
			handler(val) {
				if (val == 'default') {
					uni.setNavigationBarTitle({
						title: '寄语语录'
					});
				} else if (val == 'custom') {
					uni.setNavigationBarTitle({
						title: '写寄语'
					});
					uni.stopPullDownRefresh();
				} else {
					uni.setNavigationBarTitle({
						title: '寄语语录'
					});
				}
			}
		}
	},
	onShareAppMessage: function(options) {
		var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
		var shareObj = {
			title: `${this.theme == 'custom' ? '写诗、写实、写史、写事' : '寄语语录'}`, // 默认是小程序的名称(可以写slogan等)
			path: `/pages/index/index?isShare=1&tabIndex=${that.active}&theme=${that.theme}`, // 默认是当前页面，必须是以‘/’开头的完整路径
			imgUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			success: function(res) {
				// 转发成功之后的回调
				if (res.errMsg == 'shareAppMessage:ok') {
					console.log('分享ok');
				}
			},
			fail: function() {
				// 转发失败之后的回调
				if (res.errMsg == 'shareAppMessage:fail cancel') {
					// 用户取消转发
				} else if (res.errMsg == 'shareAppMessage:fail') {
					// 转发失败，其中 detail message 为详细失败信息
				}
			}
		}; // 来自页面内的按钮的转发
		if (options.from == 'button') {
			var eData = options.target.dataset;
			console.log(eData.name); // shareBtn // 此处可以修改 shareObj 中的内容
			shareObj.path = `/pages/index/index?btn_name=${eData.name}&isShare=1&tabIndex=${that.active}&theme=${that.theme}`;
		} // 返回shareObj
		return shareObj;
	},
	methods: {
		// 重新加载
		handleReload({ page, _id }) {
			console.log('_id:', _id);
			if (_id) {
				this.uList = this.uList.filter(item => item._id !== _id);
			}
			this.form.page = page;
			this.getData();
		},
		// 初始化data
		initCommon() {
			this.initLoad = true;
			this.dList = [];
			this.uList = [];
			this.aList = [];
			this.resList = [];
		},
		// 点击切换
		async handleClick(index, row) {
			this.active = index;
			uni.setStorageSync('tabIndex', index);
			this.initCommon();

			setTimeout(function() {
				console.log('start pulldown');
			}, 300);
			uni.startPullDownRefresh();
		},
		// 获取主题
		async getTheme() {
			const { code, data } = await this.$api.wall.fetchTheme();
			if (code == 200) {
				this.theme = data;
			}
		},
		// 个人信息
		async getUser() {
			this.$api.user
				.fetchUser()
				.then(res => {
					const { code, result } = res;
					if (code == 200 && result) {
						uni.setStorageSync('hasLogin', 1);
						this.userInfo = result;
						this.userQuery.userId = result._id;
					} else {
						console.log('unlogin');
						uni.setStorageSync('hasLogin', -1);
						clearStorage();
					}
				})
				.catch(err => {
					console.log('err unlogin');
					uni.setStorageSync('hasLogin', -1);
					clearStorage();
				});
		},

		// 获取数据
		async getData() {
			if (this.active == 2 && this.theme == 'custom') {
				await this.getUser();
			}
			console.log('this.currentType:', this.theme, this.currentType);
			if (!this.currentType) {
				return;
			}
			console.log('===', this.currentPage);
			let URL = null;
			switch (this.currentPage) {
				case 'default':
					URL = this.$api.wall.fetchList(this.form);
					break;
				case 'article':
					URL = this.$api.article.fetchList({ ...this.form, public: '1' });
					break;
				case 'user':
					URL = this.$api.article.fetchList({ ...this.form, ...this.userQuery });
					break;
				default:
					URL = this.$api.wall.fetchList(this.form);
			}
			if (this.currentPage == 'user') {
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
			}
			let {
				code,
				result: { data, total }
			} = await URL;
			console.log('code:', code);
			if (code == 200) {
				this.resList = data;
				this.total = total;
				let formatList = [];
				console.log(this[this.currentType].length == 0);
				if (this[this.currentType].length == 0) {
					this[this.currentType] = data;
				} else {
					this[this.currentType] = this[this.currentType].map(item => {
						return data.find(i => i._id == item._id) || item;
					});
					let ids = this[this.currentType].map(item => item._id);
					formatList = data.filter(item => !ids.includes(item._id));
				}
				// 第一次加载新数据加在前面
				if (this.initLoad) {
					this[this.currentType] = (this[this.currentType].length == 0 ? data : formatList).concat(this[this.currentType]);
				} else {
					this[this.currentType] = this[this.currentType].concat(this[this.currentType].length == 0 ? data : formatList);
				}
				if (data.length == 0) {
					this.status = 'noMore';
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.b-tab {
	position: fixed;
	bottom: 0;
	z-index: 99;
	width: 750rpx;
	height: 98rpx;
	// padding-bottom: 22rpx;
	bottom: var(--window-bottom);
	background: #ffffff;
	box-shadow: 0px -10rpx 20rpx 0px rgba(0, 0, 0, 0.1);

	.t-item {
		width: 203rpx;
		height: 90rpx;
		background: #fff;
		border-radius: 5rpx;
		position: relative;
		image {
			width: 44rpx;
			height: 44rpx;
			margin-bottom: 13rpx;
		}
		text {
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #393a3a;
			line-height: 25rpx;
		}
	}
}
.active {
	background-color: #13c2c2 !important;
	text {
		color: #fff !important;
	}
}
/deep/.uni-load-more {
	background-color: #f5f5f5;
}
</style>
