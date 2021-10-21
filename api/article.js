import {
	request
} from '@/utils/http'

// 列表
export function fetchList(data) {
	return request({
		method: 'GET',
		url: '/api/article/list',
		data
	})
}
// 删除
export function fetchDel(data) {
	return request({
		method: 'DELETE',
		url: `/api/article/delete/${data.id}`,
		data
	})
}

// 详情
export function fetchArticle(data) {
	return request({
		method: 'GET',
		url: `/api/article/detail/${data.id}`,
		data
	})
}
// 更新
export function editArticle(data) {
	return request({
		method: 'PUT',
		url: `/api/article/detail/${data.id}`,
		data
	})
}
// 创建
export function addArticle(data) {
	return request({
		method: 'POST',
		url: `/api/article/add`,
		data
	})
}