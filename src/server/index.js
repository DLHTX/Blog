import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import auth from './router/auth'
// 引入history模块
import history from 'connect-history-api-fallback'

// 正式环境时，下面两个模块不需要引入
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import session from 'express-session';
import config from '../../build/webpack.dev.conf'
const app = express()
var http = require('http')


// 引入history模式让浏览器进行前端路由页面跳转
app.use(history())
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))



app.use(session({secret: 'sessionsecret'}));//开启seesion放在auth之前

// app.use('/blog',blog);
app.use('/auth',auth);//第三方认证接口


const compiler = webpack(config)
//webpack 中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', function (req, res) {
  res.sendFile('./views/index.html')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.log(err)
  res.send(err.message)
})


// 设置监听端口
const SERVER_PORT = 4041
const server = app.listen(SERVER_PORT, () => {
    console.info(`服务已经启动，监听端口${SERVER_PORT}`)
})

const io = require('socket.io')(server)

var onlineUsers = {} //在线用户
var onlineCount = 0  //在线用户人数
var lock = {}
var user = ''
io.on('connection',socket=>{
  var toUser = {}
  var fromUser = {}
  var msg = ''
  socket.emit('open')
  
  socket.on('addUser',username=>{
    if(!onlineUsers.hasOwnProperty(username)) {
      onlineUsers[username] = socket
      onlineCount = onlineCount + 1
    }
    user = username
    console.log(onlineUsers[username].id) //建立连接后 用户点击不同通讯录都是建立同样的socket对象
    console.log('在线人数：',onlineCount)

    socket.broadcast.emit('bordcast',username)

    socket.on('sendMsg', function(obj) {
      console.log(obj)
      toUser = obj.toUser
      fromUser = obj.fromUser
      msg = obj.msg
      socket.broadcast.emit('to',obj)
      console.log(  '发送出去' + socket.emit('to',obj))

      socket.on("disconnect", function (username) {
        console.log("客户端断开连接.")
        //遇到的坑 每次都要删除该socket连接 否则断开重连还是这个socket但是client端socket已经改变
        delete onlineUsers[username] 
      })
    
    })
  })
})


export default app
