<!--
 * @Author: your name
 * @Date: 2020-09-15 15:19:54
 * @LastEditTime: 2020-09-27 15:29:39
 * @LastEditors: yangying01
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/vue-bbb/src/App.vue
-->
<template>
  <div id="nav" class="vue-bbb">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div>
      项目 vue-bbb
    </div>
  </div>
  <router-view/>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
