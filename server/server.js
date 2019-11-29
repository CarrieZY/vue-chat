var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// 引入html模块
// const fs= require('fs')

// app.get('/', function(req, res){
//   // const  html=fs.readFileSync('./index.html')
//   res.end(html)
// });

// 服务端接收事件 socket检测数据的发送
io.on('connection',function(socket) {
    socket.on('message', function (data) {
      console.log(data.message)                //接收数据
      //发送数据
      socket.emit('UserMsg', {
        txt:'您好，请问有什么需要帮助你的？',
        type:1,
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
       });
    });

    socket.on('login',(data)=>{
      console.log(data)
      const date=data
      socket.emit('login',{
        input:date.name,
      })
    })

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});