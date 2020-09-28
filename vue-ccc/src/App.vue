<!--
 * @Author: yangying01
 * @Date: 2020-09-28 16:31:13
 * @LastEditors: yangying01
 * @LastEditTime: 2020-09-28 16:50:10
 * @Description: 
-->
<template>
  <div id="app">
    <div id="nav">
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
          from: "vue-ccc"
        });
        return;
      }
      console.log('>>> this', this)
    
      this.$pager.next({
        from: "vue-ccc",
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
