var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var _ = require('underscore');  //用于实现单聊
// 服务端接收事件 socket检测数据的发送
io.on('connection',function(socket) {
    // 登录注册的信息
    // 得到客户端传过来的数据，将用户信息塞入到服务端的userList，服务器将新的userList发送给各个客户端。
    let userList=[]
    socket.on('login', function(user){
      user.id = socket.id;  //给登录用户存储一个id
      console.log(user)
      userList.push(user);
      io.emit('userList',userList); // 发送给所有的用户
      socket.emit('userInfo',user); // 发送给自己
      socket.broadcast.emit('loginInfo',user); //发送给除自己以外的用户  上线通知
    });
    // 发送消息给当前在线的所有用户  群发
    socket.on('toAll',function(msgObj){
      console.log(msgObj)
      socket.broadcast.emit('toAll',{
        txt: msgObj.message,
        type:1,
        img:msgObj.img
      });
    });

    // 接收单聊发送的消息
    socket.on('toOne',(msgObj)=>{
      console.log(msgObj)
        var toSocket = _.findWhere(io.sockets.sockets,{id:msgObj.id});
        toSocket.emit('toOne', msgObj);
    })

    // 当关闭连接后触发 disconnect 事件
    socket.on('disconnect', function () {
      console.log('断开一个连接。');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});