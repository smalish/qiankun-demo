/*
 * @Author: yy
 * @Date: 2020-09-15 14:07:17
 * @LastEditTime: 2020-09-15 14:30:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/master/vue.config.js
 */

const port = 7770; // dev port

module.exports = {
  // publicPath: './',  
  lintOnSave: false,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
}