import Vue from 'vue'
import App from './App'
import memberApi from '@/common/utils/memberApi'
import couponApi from '@/common/utils/couponApi'
import orderApi from '@/common/utils/orderApi'
import goodsApi from '@/common/utils/goodsApi'
import util from '@/common/util'
import uView from "uview-ui";

import store from './store'  

Vue.use(uView);
Vue.config.productionTip = false

Vue.prototype.$memberApi = memberApi
Vue.prototype.$couponApi = couponApi
Vue.prototype.$orderApi = orderApi
Vue.prototype.$goodsApi = goodsApi
Vue.prototype.util = util
Vue.prototype.$store = store 

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
