<!--
 * @Author: your name
 * @Date: 2020-09-15 14:00:21
 * @LastEditTime: 2020-09-15 14:16:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-demo/master/src/App.vue
-->
<template>
    <div id="root" class="main-container">
        <div class="main-container-menu">
            
        </div>
    <!-- 子应用盒子 -->
    <div id="root-view" class="app-view-box" v-html="content"></div>
</div>
</template>

<script>
export default {
    name: "root-view",
    props: {
        loading: Boolean,
        content: String 
    }
};
</script>
