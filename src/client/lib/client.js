import io from 'socket.io-client'
const CHAT={
  msgObj:document.getElementsByClassName("body-wrapper")[0],
  username:null,
  socket:null,
  msgArr:[],
  submit:function(obj){
    this.socket.emit('sendMsg', obj);
  },
  message: function(username) {
    console.log('message')
      this.socket.on('to' + username, function(obj) {
        CHAT.msgArr.push(obj)
        console.log('CHAT.msgArr', obj)
      })
  },
  init:function(username){
    //连接websocket后端服务器
    this.socket = io.connect('http://47.91.156.35:4041/',{'force new connection': true})
    this.socket.on('open', function() {
      console.log('已连接')
    })
    this.socket.emit('addUser', username)
  }
}

export default CHAT
