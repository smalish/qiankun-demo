<!--
 * @Author: your name
 * @Date: 2020-09-15 14:36:19
 * @LastEditTime: 2020-09-28 16:22:38
 * @LastEditors: yangying01
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/vue-demo/src/App.vue
-->
<template>
  <div>
    <div id="nav" class="vue-aaa">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>

    <div @click="callParentChange">点击，发送通知给父应用</div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){

  },
  methods: {
    callParentChange(type) {
      if (type === "default") {
        this.myMessage = "子应用subapp-ui收到";
        this.$actions.setGlobalState({
          message: this.myMessage,
          from: "subapp-ui"
        });
        return;
      }
      console.log('>>> this', this)
    
      this.$pager.next({
        from: "subapp-ui",
        token: "但若不见你，阳光也无趣"
      });
    }
  }
  

}
</script>

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
