import io from 'socket.io-client'
const CHAT={
  msgObj:document.getElementsByClassName("body-wrapper")[0],
  username:null,
  socket:null,
  msgArr:[],
  isSend : false,
  isRecive:false,
  UserCount:null,
  submit(obj){
    if( this.isSend) return
    this.isSend = true 
    this.socket.emit('sendMsg', obj);
    this.isSend = false 
  },

  message(username) {
    if( this.isRecive) return
    this.isRecive = true 
    console.log('刷新消息...')
    let isOnto = false
    this.socket.on('to', function(obj) {
      if(isOnto) return 
      isOnto = true
      CHAT.msgArr.push(obj)
      isOnto = false
        // console.log( JSON.stringify(CHAT.msgArr) +'来自client')
    })//监听后端的消息

    let isOnbordcast = false
    this.socket.on('bordcast',(onlineCount)=>{
      // if(isOnbordcast) return
      // isOnbordcast = true 
      this.UserCount = onlineCount
      console.log('用户数人数'+onlineCount+   this.UserCount)
      // isOnbordcast =false 
    })//监听上线人数的消息
    this.isRecive = false 

  },
  init(username){
    //连接websocket后端服务器
    this.socket = io.connect('http://localhost:4041/',{'force new connection': true})
    this.socket.on('open', function() {
      console.log('已连接')
    })
    this.socket.on('bordcast',(onlineCount)=>{
      // if(isOnbordcast) return
      // isOnbordcast = true 
      this.UserCount = onlineCount
      console.log('用户数人数'+onlineCount+   this.UserCount)
      // isOnbordcast =false 
    })//监听上线人数的消息


    this.socket.emit('addUser', username)
    
  }
}

export default CHAT
