<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  sockets: {
        connect() {
            //查看socket是否渲染成功 
        },
        servermessage(data) {
            //监听message事件，方法是后台定义和提供的
            console.log(data)
        },
    },
}
</script>

<style>
</style>
