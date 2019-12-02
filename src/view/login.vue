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
        pwd:'',
        imgList:[
            require('../assets/1.jpg'), require('../assets/2.jpg'), require('../assets/3.jpg'), require('../assets/4.jpg')]
        }
    },
  methods:{
      login(){
            //生成随机头像
            //随机头像
            var randomNum = Math.floor(Math.random()*4);
            var img = this.imgList[randomNum];
            this.$socket.emit('login',{
                name:this.input,
                pwd:this.pwd,
                img:img
            })

          this.$router.push({name:'home'})
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