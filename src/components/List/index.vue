<template>
    <div class="list">
        <div class="list-left">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=''/>
        </div>
        <div class="list-right">liyang</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style  scoped>
.list{
    width: 100%;
    border: 1px solid #f5f5f5;
    display: flex;
    flex-flow: row;
    align-items: center;
}
.list-left{
    width: 40px;
    height:40px;
    background-color: #fff;
    margin:10px;
    align-items: center;
    text-align: center;
    border: 1px solid #f5f5f5;
}
.list-left img{
    width: 90%;
    height: 90%;
}
.list-right{
    flex:1;
    font-size: 14px;
    color:#000;
}
</style>