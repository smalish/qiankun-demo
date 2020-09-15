/*
 * @Author: your name
 * @Date: 2020-09-15 14:36:19
 * @LastEditTime: 2020-09-15 15:13:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/vue-demo/src/router/index.js
 */
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export default routes
