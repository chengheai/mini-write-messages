import {
	request
} from '@/utils/http'

// 列表
export function fetchList(data) {
	return request({
		method: 'GET',
		url: '/api/wall/list',
		data
	})
}

// 更新
export function editWall(data) {
	return request({
		method: 'PUT',
		url: `/api/wall/update/${data._id}`,
		data
	})
}

// theme
export function fetchTheme(data) {
	return request({
		method: 'GET',
		url: '/api/theme/pick',
		data
	},true,false)
}