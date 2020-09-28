/*
 * @Author: your name
 * @Date: 2020-09-15 14:42:39
 * @LastEditTime: 2020-09-28 16:24:24
 * @LastEditors: yangying01
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/vue-demo/src/core/life-cycle.js
 */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import App from '@/App.vue'
import selfRoutes from '../router/index'
import store from '@/store'
import routeMatch from "@/router/routes-match";
// import appStore from "@/utils/app-store";

// Vue.config.productionTip = false;

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance = null;
let pager = null

/**
 * @name 导出生命周期函数
 */
const lifeCycle = () => {
    return {
      /**
       * @name 微应用初始化
       * @param {Object} props 主应用下发的props
       * @description  bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发
       * @description 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
       */
      async bootstrap(props) {
        // 获取主应用传来的数据
        // qiankun 对于 props 的应用类似于 react 框架的父子组件通信，传入 data 数据供自组件使用，传入 fn 函数给子组件触发向上回调。
        console.log('------props:', props)
        props && props.fuBack('back-aaa')
        /* props.emits.forEach(i => {
          Vue.prototype[`$${i.name}`] = i;
        }); */
        // 在子应用中注册呼机
        pager = props.pager
        pager.subscribe((v) => {
          // 在子应用注册呼机监听器，这里可以监听到其他应用的广播
          console.log(`监听到子应用${v.from}发来消息：`, v);
          // store.dispatch('app/setToken', v.token)   // 在子应用中监听到其他应用广播的消息后处理逻辑
        });
        // Vue.prototype.$pager = pager; // 将呼机挂载在vue实例
      },
      /**
       * @name 实例化微应用
       * @param {Object} props 主应用下发的props
       * @description 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
       */
      async mount(props) {
        // console.log('------props:', props)
        // 注册应用间通信
        // appStore(props);
        // 注册微应用实例化函数
        render(props);
      },
      /**
       * @name 微应用卸载/切出
       */
      async unmount() {
        instance.$destroy?.();
        instance = null;
        router = null;
      },
      /**
       * @name 手动加载微应用触发的生命周期
       * @param {Object} props 主应用下发的props
       * @description 可选生命周期钩子，仅使用 loadMicroApp 方式手动加载微应用时生效
       */
      async update(props) {
        console.log("update props", props);
      }
    };
  };


  /**
 * @name 子应用实例化函数
 * @param {Object} props param0 qiankun将用户添加信息和自带信息整合，通过props传给子应用
 * @description {Array} routes 主应用请求获取注册表后，从服务端拿到路由数据
 * @description {String} 子应用路由前缀 主应用请求获取注册表后，从服务端拿到路由数据
 */
const render = ({ routes, routerBase='/aaa/#', container } = {}) => {
  console.log('render vue-aaa -------------')
    // Vue.config.productionTip = false;
    router = createRouter({
      history: createWebHistory(__qiankun__ ? routerBase : "/"),
      routes: __qiankun__ ? routeMatch(routes, routerBase) : selfRoutes
    });
    instance = createApp(App, {pager: pager}).use(pager).use(router).use(store).mount(container ? container.querySelector("#app") : "#app");
};

console.log('render >>>>>>>>')
console.log(render)
export { lifeCycle, render };
