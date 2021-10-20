import Vue from 'vue'
import App from './App'
import api from '@/api'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import '@/common/index.scss'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.prototype.$dayjs = dayjs

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
