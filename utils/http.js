// env: testing
// const envVersion = __wxConfig.envVersion
// console.log('envVersion:',envVersion)

export const BASE_URL = 'https://api.stack021.cn'
// export const BASE_URL = 'http://localhost:8899'

// 回显图片
export const RES_ROOT = `https://static.stack021.cn`

let lastRequestTask;
/**
 * 网络请求
 */
export function request(params, isToken = true) {
	return new Promise((resolve, reject) => {
		const url = `${BASE_URL}${params.url}`
		const data = params.data || {}
		const header = params.header || {}
		const method = params.method || 'POST'
		const loadingTitle = params.loadingTitle || '加载数据...'
		if (isToken) {
			header.token = uni.getStorageSync('token')
		}
		uni.showLoading({
			title: loadingTitle,
			mask: false
		});
		lastRequestTask = uni.request({
			url,
			data,
			header,
			method,
			success: res => {
				uni.hideLoading()
				console.log('[' + url + '] [' + method + '] :', res.data)
				const pages = getCurrentPages()
				const page = pages[pages.length - 1].route
				// console.log('page:',page)
				if (res.statusCode === 200) {
					if (res.data.code === 200) {
						resolve(res.data)
					} else if (res.data.code === 401) { // 需要登录
						if (url === 'https://api.stack021.cn/api/user/detail') {
							return
						}
						uni.clearStorage()
						uni.showModal({
							title: '提示',
							content: '登录已过期，请重新登录',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									console.log('confirm')
									if (page !== '/pages/user/index') {
										uni.switchTab({
											url: '/pages/user/index'
										});
									}
								}
							}
						});
						reject(res.data)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.info || '请求失败'
						})
						reject(res.data)
					}
				} else {
					reject(res.data)
				}
			},
			fail: (e) => {
				uni.hideLoading()
				console.error('[' + url + '] [' + method + '] :', e)
				reject(e)
			}
		})
	})
}

export function abortTask() {
	if (lastRequestTask) {
		lastRequestTask.abort()
	}
}
