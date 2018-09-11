import io from 'socket.io-client'
const CHAT={
  msgObj:document.getElementsByClassName("body-wrapper")[0],
  username:null,
  socket:null,
  msgArr:[],
  UserCount:0,
  messageOne:true,
  initOne:true,
  logUser:[],
  submit(obj){
    if( this.isSend) return
    this.isSend = true 
    this.socket.emit('sendMsg', obj);
    this.isSend = false 
  },
  message(username) {
    if(!this.messageOne) return 
    this.messageOne = false

    this.socket.on('to', function(obj) {
      CHAT.msgArr.push(obj)
        // console.log( JSON.stringify(CHAT.msgArr) +'来自client')
    })//监听后端的消息

    //监听上线人数的消息
  },
  init(username){
    if(!this.initOne) return 
    this.initOne = false
    //连接websocket后端服务器
    this.socket = io.connect('http://localhost:4042/',{'force new connection': true})
    this.socket.on('open', function() {
      console.log('已连接')
    })
    this.socket.on('bordcast',(onlineCount)=>{
      CHAT.UserCount = onlineCount
      console.log('用户数人数'+onlineCount)
    })//监听上线人数的消息
        
    this.socket.on('bordcastUser',(user)=>{
      CHAT.logUser.unshift(user)
      console.log( this.logUser[0] +'上线了')
    })//监听谁上线
    this.socket.emit('addUser', username)
  },
  close(user){
    this.socket.disconnect(user)
    CHAT.logUser.splice(CHAT.logUser.indexOf(user),1)
    console.log(user,'断开连接',CHAT.logUser)
  }
}

export default CHAT
