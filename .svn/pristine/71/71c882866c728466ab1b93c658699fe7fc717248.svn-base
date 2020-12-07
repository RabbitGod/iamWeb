import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userName:'',
		userId:'',
		userPhoto:'',
		menu:[
			{
				name:'首页',
				id:'1',
				routerName:'home',
				icon:'md-home'
			},
			{
				name:'调度表达式',
				id:'2',
				routerName:'cron',
				icon:'md-planet'
			},
			{
				name:'图表事例',
				id:'3',
				routerName:'echarts',
				icon:'md-analytics',
				children:[
					{
						name:'图表事例',
						id:'3',
						routerName:'echarts',
						icon:'md-analytics'
					}
				]
			},
    	]
	},
	mutations: {
		userName (state, payload){
			state.userName = payload.userName
		},
		userId (state, payload){
			state.userId = payload.userId
		},
		userPhoto (state, payload){
			state.userPhoto = payload.userPhoto
		}
	},
	actions: {
	},
	modules: {
	}
})
