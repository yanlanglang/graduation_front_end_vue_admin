import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.req = request


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.filter('timeFormat', function (data) {
  //根据形参data，得到特定的时间
  var dt = new Date(data);
  var year = dt.getFullYear();
  var month = (dt.getMonth() + 1).toString().padStart(2, "0");
  var day = dt.getDate().toString().padStart(2, "0");
  var hour = dt.getHours().toString().padStart(2, "0");
  var minute = dt.getMinutes().toString().padStart(2, "0");
  var second = dt.getSeconds().toString().padStart(2, "0");

  //返回模板
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
})

Vue.filter('stringSplit', function (data) {

  var length = data.length;
  
  if(length >= 20){
    //截取字符串，防止字符串过长
    var s = data.substring(0,20);
    return s+'...'; 
  }else {
    return data;
  }

})
