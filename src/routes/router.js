import Router from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/main',
		component: () => import('../views/Main.vue')
	},
	{
		path: '/pay',
		component: () => import('../views/ImcomePay.vue')
	},
	{
		path: '/manager',
		component: () => import('../views/Manager.vue')
	},
	{
		path: '/car',
		component: () => import('../views/Car.vue')
	},
	{
		path: '/myOrder',
		component: () => import('../views/MyOrder.vue')
	},
	{
		path: '/login',
		component: () => import('../views/Login.vue')
	}
]

export default new Router({
	routes,
	mode: 'history'
})