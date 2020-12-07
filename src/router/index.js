import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cookies from 'js-cookie';
import store from '@/store';

Vue.use(VueRouter)

const routes = [
{
	path: '/',
	name: 'home',
	redirect: '/home'
},
{
	path: '/home',
	name: 'home',
	component: Home
},
{
	path: '/login',
	name: 'login',
	component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
},
{
	path: '/about',
	name: 'about',
	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
},
{
	path: '/echarts',
	name: 'echarts',
	component: () => import(/* webpackChunkName: "about" */ '../views/echarts.vue')
},
{
	path: '/cron',
	name: 'cron',
	component: () => import(/* webpackChunkName: "about" */ '../views/cron.vue')
},
{
	path: '/client',
	name: 'client',
	component: () => import(/* webpackChunkName: "about" */ '../views/client/index.vue')
},
{
	path: '/catalog',
	name: 'catalog',
	component: () => import(/* webpackChunkName: "about" */ '../views/catalog/index.vue')
},
{
	path: '/apps',
	name: 'apps',
	component: () => import(/* webpackChunkName: "about" */ '../views/apps/index.vue')
},
{
	path: '/power',
	name: 'power',
	component: () => import(/* webpackChunkName: "about" */ '../views/power/index.vue')
},
{
	path: '/audit',
	name: 'audit',
	component: () => import(/* webpackChunkName: "about" */ '../views/audit/index.vue')
},
{
	path: '/control',
	name: 'control',
	component: () => import(/* webpackChunkName: "about" */ '../views/control/index.vue')
}
]

const router = new VueRouter({
mode: 'hash',//hash history
base: process.env.BASE_URL,
routes
})
//跳转前拦截
router.beforeEach((to, from, next) => {
if (navigator.cookieEnabled){
	if (!Cookies.get('token')) {// 判断是否已经登录
	if(to.name !== "login"){ // 判断前往的页面不是登录页
		next({
		name: 'login'
		});
	}else{
		next()
	}
	} else{

		store.commit('userName', {
		userName: Cookies.get('userName')
	});
	store.commit('userId', {
		userId: Cookies.get('userId')
	});

	if(to.name === "login"){
		next({
		name: 'home'
		});
	}else{
		next()
	}
	}
}else{
	if (!sessionStorage.getItem('token')) {// 判断是否已经登录
	if(to.name !== "login"){ // 判断前往的页面不是登录页
		next({
		name: 'login'
		});
	}else{
		next()
	}
	} else{
	if(to.name === "login"){
		next({
		name: 'home'
		});
	}else{
		next()
	}
	}
}
});

//跳转后拦截
router.afterEach((to, from) => {

})

export default router
