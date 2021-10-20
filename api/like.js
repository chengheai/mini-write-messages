import {
	request
} from '@/utils/http'
// list
export function fetchList(data) {
	return request({
		method: 'GET',
		url: '/api/article/like/list',
		data
	})
}
// like
export function fetchLike(data) {
	return request({
		method: 'POST',
		url: '/api/article/like',
		data
	})
}
// report
export function fetchReport(data) {
	return request({
		method: 'POST',
		url: '/api/article/report',
		data
	})
}