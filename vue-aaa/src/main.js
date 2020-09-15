/*
 * @Author: your name
 * @Date: 2020-09-15 14:36:19
 * @LastEditTime: 2020-09-15 15:00:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/vue-demo/src/main.js
 */
import { lifeCycle, render } from "./core/life-cycle";

/**
 * @name 导出微应用生命周期
 */
const { bootstrap, mount, unmount } = lifeCycle();
export { bootstrap, mount, unmount };

/**
 * @name 单独环境直接实例化vue
 */
const __qiankun__ = window.__POWERED_BY_QIANKUN__;
__qiankun__ || render();