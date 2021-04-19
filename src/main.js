import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import {
  Button, Container, Header, Main, Row, Col,
  Table, TableColumn, Dialog, Input, Form, FormItem,
  Tooltip, Upload, Loading, Message, Tabs, TabPane, Avatar,
    Card, Pagination, Menu, MenuItem, Checkbox, Select,
    Option,Link, InputNumber,Badge,Aside,
    Image
} from 'element-ui'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import VeLine from 'v-charts/lib/line.common'

import App from './app.vue'
// /home/hongyan/Desktop/hongyan/my-order/dist
import router from './routes/router.js'
import cookie from './util/cookie.js'
import './style.css'
import createStore from './store/store.js'
Vue.use(Vuex)
Vue.use(Router)

Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)
Vue.component(VeLine.name, VeLine)

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Loading)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Image)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Link)
Vue.use(InputNumber)
Vue.use(Badge)
Vue.use(Aside)
Vue.prototype.$message = Message

router.beforeEach((to, from, next) => {
  const username = cookie.getCookie('username')
  if(username === null && to.path !== '/login') {
  	//next('/login')
    next()
  } else {
  	next()
  }
  
})
router.beforeResolve((to, from, next) => {
  console.log('router before resolve')
  next()
})
router.afterEach((to, from) => {
  console.log('router after each')
})
const store = createStore()
new Vue({
	router,
  store,
	render: h => h(App)
}).$mount('#root')