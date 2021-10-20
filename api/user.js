import {
	request
} from '@/utils/http'
/**
 * 登录接口
 * @param {object} data
 */
export function login(data) {
	return request({
		method: 'POST',
		url: '/api/login',
		data
	}, false)
}
// 个人信息
export function fetchUser(data) {
	return request({
		method: 'POST',
		url: '/api/user/detail',
		data
	})
}

// 上传图片
export function fetchUpload(data) {
	return request({
		method: 'POST',
		url: '/api/file/upload',
		data
	})
}