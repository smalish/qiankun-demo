/*
 * @Author: your name
 * @Date: 2020-09-15 14:00:21
 * @LastEditTime: 2020-09-27 15:23:25
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
    registerMicroApps(
        [
            {
                name: "vue-aaa",
                entry: "//localhost:2851",
                render,
                activeRule: genActiveRule("/aaa"),
                // props: {param: 'msg-aaa'}// 传递给子应用
            },
            {
                name: "vue-bbb",
                entry: "//localhost:2852",
                render,
                activeRule: genActiveRule("/bbb"),
                //   props: 'msg-bbb' // 传递给子应用
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
  

