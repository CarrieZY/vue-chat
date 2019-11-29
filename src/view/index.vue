<template>
    <div>
        <div class="content">
        <div class="asid">
            <div class="asid-header">在线成员</div>
            <div class="asid-content">
                <List></List>
            </div>
        </div>
        <div class="main">
            <div class="asid-header">聊天室   <span class="asid-left">欢迎你|{{name}}</span></div>
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
            ],
        }
    },
    mounted(){
        document.querySelector('body').setAttribute('style','background-color:#999')
    },
    sockets: {
        connect() {
            console.log('socket connected');
        },
        UserMsg(value) {
            console.log(value);
            this.newMsg.push({
                txt:value.txt,
                img:value.img,
                type:value.type
            })
        },
        login(value){
            this.name=value.input
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
            this.$socket.emit("message", {
                message: this.input,
                type:2,
                img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            });

            this.newMsg.push({
                img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                txt:this.input,
                type:2
            })
            this.input=''
        },
        switch(){

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