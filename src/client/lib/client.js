import io from 'socket.io-client'
const CHAT={
  msgObj:document.getElementsByClassName("body-wrapper")[0],
  username:null,
  socket:null,
  msgArr:[],
  newUser:null,
  isSend : false,
  isRecive:false,
  submit:function(obj){
    if( this.isSend) return
    this.isSend = true 
    this.socket.emit('sendMsg', obj);
    this.isSend = false 
  },


  message: function(username) {
    if( this.isRecive) return
    this.isRecive = true 
    console.log('刷新消息...')
      this.socket.on('to', function(obj) {
        CHAT.msgArr.push(obj)
        // console.log('CHAT.msgArr',  CHAT.msgArr)
      })
      this.isRecive = false 
      
      this.socket.on('bordcast',(username)=>{
        console.log(username)
        this.newUser = username
      })
  },
  init:function(username){
    //连接websocket后端服务器
    this.socket = io.connect('http://192.168.100.106:4041/',{'force new connection': true})
    this.socket.on('open', function() {
      console.log('已连接')
    })
    this.socket.emit('addUser', username)
  }
}

export default CHAT
