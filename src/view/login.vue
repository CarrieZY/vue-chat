<template>
    <div class="content">
        <el-input v-model="input" placeholder="请输入用户名"></el-input>
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-button type="primary" @click="login()">登录</el-button>
    </div>
</template>

<script>
export default {
    data() {
    return {
      input: '',
      pwd:''
    }
  },
  methods:{
      login(){
          this.$socket.emit('login',{
              name:this.input,
              pwd:this.pwd,
              id:'001',
          })

          this.$router.push({name:'home',query:{id:'001'}})
      }
  }
}
</script>


<style scoped>
.content{
    width:40%;
    margin:30px auto;
    background-color: #ffffff;
}
.el-input{
    margin: 10px;
}
.el-button{
    margin: 10px;
    width: 100%;
}
</style>