//axios拦截器
import axios from 'axios';
import Cookies from 'js-cookie';
import util from './util';
import ViewUI from 'view-design';
axios.defaults.timeout = 2000000;

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = window.localStorage.lang || localLang || 'zh-CN';

 
axios.interceptors.request.use(config => {
    config.headers['Authorization'] = Cookies.get('token'); //传入token
    config.headers['language'] = Cookies.get('local') || lang || 'zh-CN'; //传入语言参数

    //增加接口时间戳
    config.params = {
        _t: Date.parse(new Date())/1000,
        ...config.params
    }

    return config;
}, error => {
    //发送请求错误操作
    ViewUI.Message.error('error：'+error.message);
    return Promise.reject(error);
})
axios.defaults.baseURL = util.rootPath || ''
axios.interceptors.response.use(response => {
    //对响应数据做操作
    if(response.headers['content-type'] && response.headers['content-type'].indexOf('application/json') > -1 ){
        if(parseInt(response.data.meta.status, 10) == 0) {
            return response
        }else {
            return response;
        }
    }else{
        return response
    }
    
    
    
}, error => {
    ViewUI.Message.error('error:'+error.message);
    return Promise.reject(error);
})

export default axios;
