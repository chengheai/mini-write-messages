<template>
	<view class="content">
		<view class="" v-if="hasData">
			<view class="" v-for="(item, index) in list" :key="index">
				<x-card :dataSource="item" :subIndex='index' @reload="handleReload" />
			</view>
			<uni-load-more :status="status" :content-text="contentText"></uni-load-more>
		</view>
		<x-empty v-else />
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
	data() {
		return {
			status: 'more',
			initLoad: false,
			from: {
				page: 1,
				pageSize: 10,
				public: '1'
			},
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '加载中...',
				contentnomore: '我是有底线的'
			},
			list: [],
			resList: []
		};
	},
	computed: {
		hasData() {
			return this.list.length !== 0;
		}
	},
	async onShow() {
		this.initLoad = true;
		this.list = [];
		setTimeout(function() {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onShareAppMessage: function(options) {
		var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
		var shareObj = {
			title: '写诗、写实、写史、写事', // 默认是小程序的名称(可以写slogan等)
			path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
			imgUrl: share, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
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
			shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
		} // 返回shareObj
		return shareObj;
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
			if (this.resList.length === 10) {
				this.from.page++;
			}
			this.getData();
		}, 300);
	},
	async onPullDownRefresh() {
		this.from.page = 1;
		this.getData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 300);
	},
	methods: {
		async handleReload(page) {
			this.from.page = page;
			this.getData();
		},
		async getData() {
			const {
				code,
				result: { data }
			} = await this.$api.article.fetchList(this.from);
			if (code === 200) {
				this.resList = data;
				let formatList = [];

				if (this.list.length === 0) {
					this.list = data;
				} else {
					this.list = this.list.map(item => {
						return data.find(i => i._id === item._id) || item;
					});
					let ids = this.list.map(item => item._id);
					formatList = data.filter(item => !ids.includes(item._id));
				}
				// 第一次加载新数据加在前面
				if (this.initLoad) {
					this.list = (this.list.length === 0 ? data : formatList).concat(this.list);
				} else {
					this.list = this.list.concat(this.list.length === 0 ? data : formatList);
				}
				if (data.length === 0) {
					this.status = 'noMore';
				}
			}
		}
	}
};
</script>

<style>
.content {
	background: #f5f5f5;
	width: 100%;
	box-sizing: border-box;
	overflow-x: hidden;
	min-height: 100vh;
	padding: 15rpx;
}
</style>
