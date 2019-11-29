<template>
    <div>
        <div v-for="item in newMsg" :class="[item.type==1?'message-list':'message-list-my']">
            <div class="message-avatar">
                <img :src='item.img' alt="">
            </div>
            <div :class="[item.type==1?'message-text':'message-text-my']">
                <span>{{item.txt}}</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props:{
        // 根据type的类型判断是1接收的消息还是2发送的消息
        newMsg:{},
    },
    methods: {
        
    }
}
</script>

<style scoped>
.message-list{
    width: 80%;
    display: flex;
    flex-flow: row;
    align-items: center;
}
.message-list-my{
    width: 80%;
    float: right;
    display: flex;
    flex-flow: row;
    flex-direction:row-reverse;
    align-items: center;
}
.message-text-my span{
    background-color: #409EFF;
    color: #fff;
    border-radius: 10px;
    padding: 10px;
}
.message-avatar{
    width: 40px;
    height:40px;
    margin:10px;
}
.message-avatar img{
   width: 100%;
   height:100%;
}
.message-text{
    flex:1;
}
.message-text span{
    background-color: #f5f5f5;
    color: #000;
    border-radius: 10px;
    padding: 10px;
}
</style>