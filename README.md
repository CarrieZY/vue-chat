####   技术栈
vue+elment+node+socket.io实现通讯
#####  已达到的需求
能查看在线用户列表<br>
能发送和接受消息<br>
发送给除自己以外的用户  上线通知<br>

##### 需要实现的功能:
当用户连接和断开连接时广播消息<br>
添加昵称<br>
不要将消息发送给服务器后再返回给发送者，应该在用户按下回车后立即将消息显示到消息列表。<br>
添加 “{用户} 正在输入” 功能<br>
显示在线用户<br>
添加私密消息<br>
分享你的改进！<br>
##### 项目结构
Login.vue：用户注册组件<br>
home.vue：主界面容器组件<br>
Message/MsgList.vue：聊天消息组件 根据type判断是接收消息还是发送的消息<br>
list.vue 在线成员组件<br>

群聊，比较简单，我们可以通过socket广播socket.broadcast.emit()，发送给除自己以外的用户。<br>
```
socket.on('toAll',function(msgObj){
    socket.broadcast.emit('toAll',msgObj); 
});
```

单聊:，每一个socket有自己的id，我们只需要将socket的id变成我们要发送的那个用户的id，
```
socket.on('toOne',function(msgObj){
    var toSocket = _.findWhere(io.sockets.sockets,{id:msgObj.to});
    toSocket.emit('toOne', msgObj);
})
````

// nodejs的underscore扩展中的findWhere方法，可以在对象集合中，通过对象的属性值找到该对象并返回。
//     var toSocket = _.findWhere(io.sockets.sockets, {id: toId});
 
//     // socket.emit() ：向建立该连接的客户端广播
//     // socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
//     // io.sockets.emit() ：向所有客户端广播，等同于上面两个的和
 
//     // 通过该连接对象（toSocket）与链接到这个对象的客户端进行单独通信
//     toSocket.emit('message', data.msg);