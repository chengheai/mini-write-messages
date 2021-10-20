const api = {}

const files = require.context('.', true, /\.js$/);
const bizs = files.keys().filter(it => it !== './index.js')
bizs.forEach(it => {
	const name = it.substring(2, it.length - 3)
	api[name] = files(it)
})

export default api
