import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';


import 'view-design/dist/styles/iview.css';
import './assets/iconfont/iconfont.css';
import echarts from 'echarts';
import util from './common/util';

Vue.prototype.$echarts = echarts;
import axios from './common/axios';
Vue.prototype.util = util;
Vue.prototype.axios = axios;


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import captcha from 'vue-social-captcha'
Vue.use(captcha)


import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('clickoutside', {
  bind: function(el, binding, vode) {
    function documentHandler (e) {
      
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutSide__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind: function(el, binding) {
    document.removeEventListener('click', el.__vueClickOutSide__)
    delete el.__vueClickOutSide__
  }
})