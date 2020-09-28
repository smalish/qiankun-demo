/*
 * @Author: your name
 * @Date: 2020-09-15 14:00:21
 * @LastEditTime: 2020-09-28 16:28:59
 * @LastEditors: yangying01
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/master/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入qiankun内置函数
import {
    registerMicroApps, // 注册子应用
    runAfterFirstMounted, // 第一个子应用装载完毕
    setDefaultMountApp, // 设置默认装载子应用
    start // 启动
} from "qiankun";

// 引入呼机, 主子应用间动态通信
import pager from './util/pager'

pager.subscribe((v) => {
    // 在主应用注册呼机监听器，这里可以监听到其他应用的广播
    console.log(`监听到子应用${v.from}发来消息：`, v);
    store.dispatch('app/setToken', v.token); // 这里处理主应用监听到改变后的逻辑
});

/**
 * @name 微前端基座主应用vue实例化
 * @deprecated 本示例只针对 qiankun2.0 因此只留下注释后的代码在此提醒各位读者如何兼容qiankun1.0
 * @description 2.0版本正常实例化vue即可，不需要此render函数
 * @description 兼容 qiankun1.0 的render 在core/renderForQiankun1.0.js
 * @description qiankun registerMicroApps方法 render用到，如果使用container装载子应用，无需此render函数
 */
// import './core/render'


  
  let app = null;
  /**
   * 渲染函数
   * appContent 子应用html
   * loading 如果主应用设置loading效果，可不要
   */
    function render({ appContent, loading } = {}) {
        if (!app) {
            app = new Vue({
                el: "#container",
                router,
                store,
                data() {
                    return {
                        content: appContent,
                        loading
                    };
                },
                render(h) {
                    return h(App, {
                        props: {
                        content: this.content,
                        loading: this.loading
                        }
                    });
                }
            });
        } else {
            app.content = appContent;
            app.loading = loading;
        }
    } 
  
    /**
     * 路由监听
     * @param {*} routerPrefix 前缀
     */
    function genActiveRule(routerPrefix) {
        return location => location.pathname.startsWith(routerPrefix);
    }
    
    // 调用渲染主应用
    render();
    
    // 注册子应用
    /**
     * @Author: yangying01
     * @description: registerMicroApps(apps, lifeCycles?)
     * @param {
            apps: apps - Array<RegistrableApp> - 必选，微应用的一些注册信息,
            lifeCycles - LifeCycles - 可选，全局的微应用生命周期钩子    
        } 
     * @return {null} 
     * 具体接口api参考： https://qiankun.umijs.org/zh/api#registermicroappsapps-lifecycles
     */
    registerMicroApps(
        [
            {
                name: "vue-aaa",
                entry: "//localhost:2851",
                // render,
                container: '#root-view',
                activeRule: genActiveRule("/aaa"),
                // 传递给子应用
                props: {
                    param: 'msg-aaa',
                    fuBack: function(param){
                        console.log('主应用传入函数执行， param = ', param)
                    },
                    pager, // 从主应用下发应用间通信呼机
                },
                
            },
            {
                name: "vue-bbb",
                entry: "//localhost:2852",
                render,
                activeRule: genActiveRule("/bbb"),
                //   props: 'msg-bbb' // 传递给子应用
            },
            {
                name: "vue-ccc",
                entry: "//localhost:2853",
                render,
                activeRule: genActiveRule("/ccc"),
                // 传递给子应用
                props: {
                    param: 'msg-ccc',
                    fuBack: function(param){
                        console.log('主应用传入函数执行， param = ', param)
                    },
                    pager, // 从主应用下发应用间通信呼机
                },
            },
        ],
        {
            beforeLoad: [ 
                app => {
                    console.log("before load", app);
                }
            ], // 挂载前回调
            beforeMount: [
                app => {
                    console.log("before mount", app);
                }
            ], // 挂载后回调
            afterUnmount: [
                app => {
                    console.log("after unload", app);
                }
            ] // 卸载后回调
        }
    )
    
    // 设置默认子应用,参数与注册子应用时genActiveRule("/aaa")函数内的参数一致
    setDefaultMountApp("/aaa");
  
    // 第一个子应用加载完毕回调
    runAfterFirstMounted(()=>{});

    // 启动微服务
    start();
  

