import {
	clearStorage
} from './str.js'
// env: testing
const envVersion = __wxConfig.envVersion
console.log('envVersion:', envVersion)
// export const BASE_URL = envVersion === 'release' ? 'https://api.stack021.cn' : 'http://localhost:8899'

export const BASE_URL = 'https://api.stack021.cn'
// export const BASE_URL = 'http://localhost:8899'

// 回显图片
export const RES_ROOT = `https://static.stack021.cn`

let lastRequestTask;
let islogin = true
/**
 * 网络请求
 */
export function request(params, isToken = true, showLoading = false) {
	return new Promise((resolve, reject) => {
		const url = `${BASE_URL}${params.url}`
		const data = params.data || {}
		const header = params.header || {}
		const method = params.method || 'POST'
		const loadingTitle = params.loadingTitle || '加载数据...'
		let tabIndex = uni.getStorageSync('tabIndex')
		if (isToken) {
			header.token = uni.getStorageSync('token')
		}
		if (showLoading) {
			uni.showLoading({
				title: loadingTitle,
				mask: false
			});
		}
		lastRequestTask = uni.request({
			url,
			data,
			header,
			method,
			success: res => {
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
				console.log('[' + url + '] [' + method + '] :', res.data)
				const pages = getCurrentPages()
				const page = pages[pages.length - 1].route
				// console.log('page:',page)
				if (res.statusCode === 200) {
					if (res.data.code === 200) {
						resolve(res.data)
					} else if (res.data.code === 401) { // 需要登录
						clearStorage()
						if (tabIndex != 2) {
							uni.showModal({
								title: '提示',
								content: '登录已过期，请重新登录',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										console.log('confirm')
										console.log('tabIndex:', tabIndex)
										uni.setStorageSync('tabIndex', 2)
										uni.setStorageSync('hasLogin', -1)
										uni.redirectTo({
											url: '../index/index'
										});
									}
								}
							});
						}
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
