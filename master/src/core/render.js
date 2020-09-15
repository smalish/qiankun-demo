/*
 * @Author: your name
 * @Date: 2020-09-15 14:03:34
 * @LastEditTime: 2020-09-15 14:06:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/master/src/core/render.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
