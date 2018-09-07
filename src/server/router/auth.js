var express = require('express');
var router = express.Router();
var User = require('../model/user.js').User;
let Blog = require('../model/user.js').Blog;
let Remake = require('../model/user.js').Remake;
// var Userlove = require('../models/user.js').Userlove;
var session = require('express-session');
// var passport = require('passport');//passport模块专门处理登录
// var superagent = require('superagent');
// var cheerio = require('cheerio');
const qnconfig = require('./imgServe')//引入七牛云配置

router.get('/token',(req,res,next) =>{
    res.status(200).send(qnconfig.uploadToken)
})
// router.get('/log', function(req, res, next) {
//     res.render('log', { title: 'Login' });
// });


router.post('/register', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  let avatar = req.body.avatar

    User.findAll({raw:true, where:{username:username}}).then(function(e){
            if(e[0] === undefined ){
                User.create({username:username,password:password,avatar:avatar}).then(function(){
                    res.send({status:0 ,msg: "注册成功"})
                }).catch(function () {
                    res.send({status:1 , errorMsg:'数据库出错(添加)'})
                })
            }else{
                res.send({status:2})
            }
        })
});

router.post('/login', function(req, res, next){
    var username = req.body.username
    var password = req.body.password

    User.findAll({
        raw : true,
        where : {
            $and : [
                {username : username},
                {password : password}
            ]
        }
    })
    .then(function(userinfo){
        // console.log(userinfo)
        if(userinfo[0] !== undefined && userinfo[0].username === username){
            if(userinfo[0].password === password){
                console.log('success')
                req.session.user = {
                    username : username,
                    userId: userinfo[0].id,
                    avatar:userinfo[0].avatar
                }
                //先设置session 再进行页面跳
                res.send({status : 0, msg : "登陆成功",userInfo:req.session.user})
                /* res.redirect('/');*/
            }
        } else if(userinfo[0] === undefined){
            console.log('没有用户')
            res.send({status : 2, msg : "没有用户"})
        }

    });
})

router.post('/checkLogin',(req,res,next)=>{
    if(req.session.user){
        res.send({status:0,isLogin:true,userInfo:req.session.user })
    }else{
        res.send({status:1,isLogin:false})
    }
})

router.post('/logout', function(req, res) {
    req.session.destroy();
    // res.redirect('/');
    res.send({status:0})
});



router.post('/creatBlog',(req,res,next)=>{
    let Bloginfo = req.body.BlogInfo
    Blog.create(Bloginfo).then(function(){
        res.send({status:0 ,msg: "添加成功"})
    }).catch(function () {
        res.send({status:1 , errorMsg:'数据库出错(添加)'})
    })
})

router.post('/findMyBlog',(req,res,next)=>{
    // let Bloginfo = {
    //     userId:res.body.userId,
    // }
    Blog.findAll({raw :true,where:{userId:1}})
    .then(function(Bloginfo){
            res.send({status:0,msg:'查询成功！',Bloginfo})
    })
})

router.post('/findBlogByid',(req,res,next)=>{
    let id = req.body.id
    console.log(id)
    Blog.findAll({raw :true,where:{id:id}})
    .then(function(blog){
        // console.log(blog)
        res.send({status:0,msg:'查询成功！',blog})
    })
})


router.post('/findAllBlog',(req,res,next)=>{
    let page = req.body.page
    let pageSize = req.body.pageSize
    Blog.findAndCountAll({
        offset:(page - 1) * pageSize,
        //开始的数据索引，比如当page=2 时offset=10 ，
        //而pagesize我们定义为10，则现在为索引为10，
        //也就是从第11条开始返回数据条目
        limit:pageSize,//每页限制返回的数据条数
        order:[
            ['updatedAt','DESC']
        ]
    })
        .then(blog =>{
            // console.log(blog)
            if(blog.length!=0){
                // console.log('blogs:'+blog.rows)
                res.send({status:0,total:blog.count,rows:blog.rows})
        }
        })
})

router.post('/findAllBlogByLove',(req,res,next)=>{
    let page = req.body.page
    let pageSize = req.body.pageSize
    Blog.findAndCountAll({
        offset:(page - 1) * pageSize,
        limit:pageSize,
        order:[
            ['love','DESC']
        ]
    })
        .then(blog =>{
            // console.log(blog)
            if(blog.length!=0){
                // console.log('blogs:'+blog.rows)
                res.send({status:0,total:blog.count,rows:blog.rows})
        }
        })
})

// 我需要对某个list的id进行排序，官方文档如下：
// User.findAll({
//     'order': "id DESC"//倒叙
//      'order':'id ASC'//正序
// });




let love = 1
router.post('/loveBlog',(req,res,next)=>{
    let id = req.body.id
    Blog.findById(id).then(blog=>{
        //让其自增
        blog.increment('love').then(()=>{
            res.send({status:0 ,msg:'点赞成功'})
        })
    })
})

router.post('/noloveBlog',(req,res,next)=>{
    let id = req.body.id
    Blog.findById(id).then(blog=>{
        //让其自减
        blog.decrement('love').then(()=>{
            res.send({status:0 ,msg:'点赞成功'})
        })
    })
})


router.post('/sendRemake',(req,res,next)=>{
    let form = req.body.form
    Remake.create({username:form.username, avatar:form.avatar,content:form.remarkContent,blogId:form.id}).then(()=>{
        res.send({status:0 ,msg:'评论成功'})
    })  
})

router.post('/findRemake',(req,res,next)=>{
    let id = req.body.id
    Remake.findAll({
        where:{blogId:id},
        order:[
            ['createdAt','DESC']
        ]
    })
        .then(function(remake){
            res.send({status:0,msg:'查询成功！',remake})
        })
})



module.exports = router;