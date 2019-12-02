<template>
    <div>
        <div class="content">
        <div class="asid">
            <div class="asid-header">在线成员</div>
            <div class="asid-content">
                <List :list="userlist"></List>
            </div>
        </div>
        <div class="main">
            <div class="asid-header">云深不知处|群聊<span class="asid-left">欢迎你|{{name}}</span></div>
            <div class="asid-content">
                <Message :newMsg="newMsg"/>
            </div>
            <div class="main-footer">
                <el-input suffix-icon='"el-icon-search"' v-model.trim="input" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="sendMsg()">发送</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Message from '@/components/Message/index'
import List from '@/components/List/index'
export default {
    data(){
        return {
            name:'',//用户登录名
            input:'',//输入的内容
            newMsg:[
                {type:1,img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',txt:'您好',}
            ],//聊天数据
            userlist:[],//在线用户列表
            userImg:'',//当前登录用户的头像
        }
    },
    mounted(){
        document.querySelector('body').setAttribute('style','background-color:#999')
        // // 用户上线信息发送给除自己以外的人
        this.$socket.on('userInfo',function(userObj){
            console.log(userObj)
            // 真实的登录应该把用户信息存在session里。
            // userSelf = userObj; // 真实的登录应该把用户信息存在session里。
            localStorage.setItem('user',userObj)
            this.Online(userObj.name)
            this.userImg=userObj.img
            this.name=userObj.name
        })
    },
    sockets: {
        connect() {
            console.log('链接成功');
        },
        userList(value){
            this.userlist=value
            console.log(this.userlist)
        },
        loginInfo(user){
            this.Online(user.name)
            localStorage.setItem('userid',user.id)
            console.log(user.img)
            this.userImg=user.img
            this.name=user.name
        },
        toAll(msgObj){
            console.log(msgObj)
            this.newMsg.push(msgObj)
        }
    },
    components:{
        Message,
        List
    },
    methods:{
        sendMsg(){
            if(this.input==''){
                return false
            }
            this.$socket.emit("toAll", {
                message: this.input,
                type:2,
                img:this.userImg
            });
            this.newMsg.push({
                txt: this.input,
                type:2,
                img:this.userImg
            })
            this.input=''
        },
        switch(){

        },
        // 用户下线通知
        offline(){
             this.$notify({
                title: '下线通知',
                message: this.name+'上线了',
                position: 'bottom-right'
            });
        },
        // 用户上线通知
        Online(name){
            this.$notify({
            title: '上线通知',
            message: name+'上线了',
            position: 'bottom-right'
            });
        }
    }
}
</script>

<style scoped>
.content{
    width: 90%;
    height:800px;
    margin:50px auto;
    display: flex;
    flex-flow: row;
    background-color: #999;
}
.asid{
    width: 300px;
    background-color: #ffffff;
    height:100%;
    margin-right:20px;
    border-radius:10px;
    overflow: hidden;
}
.asid-header{
    width: 100%;
    font-size:16px;
    padding: 10px;
    background-color:#409EFF;
    color: #ffffff;
}
.asid-left{
    float: right;
    margin-right: 20px;
}
.asid-content{
    width: 100%;
}
.main{
    overflow: hidden;
    flex:1;
    height:100%;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
}
.main-footer{
    position: absolute;
    left:0;
    right:0;
    bottom: 0;
    background-color: #f5f5f5;
    display: flex;
    flex-flow: row;
    padding: 10px;
}
</style>