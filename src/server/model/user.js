var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',

    // SQLite only
    storage: path.join(__dirname, '../dao/database.sqlite')
});


// sequelize
//     .authenticate()
//     .then(function(err) {
//         console.log('Connection has been established successfully.');
//     })
//    .catch(function (err) {
//       console.log('Unable to connect to the database:', err);
//    }); /!*测试数据库连接是否正常*!/




let User = sequelize.define('user',{
        username: Sequelize.STRING,//用户名
        password: Sequelize.STRING,//密码 字符串
        avatar:Sequelize.STRING,//头像
    },
    {
        tableName: 'user',
        freezeTableName: true,
        timestamps: false
});

let Blog = sequelize.define('blog',{
        username: Sequelize.STRING,//用户名
        avatar:Sequelize.STRING,//头像
        title: Sequelize.STRING,//
        content:Sequelize.STRING,//
        love: Sequelize.INTEGER,
    },
    {
        tableName: 'blog',
        freezeTableName: true,
        timestamps: true
});

let Remake = sequelize.define('remake',{
    username: Sequelize.STRING,//用户名
    avatar:Sequelize.STRING,//头像
    content:Sequelize.STRING,//
    blogId:Sequelize.INTEGER//那条博客的评论
},
{
    tableName: 'remake',
    freezeTableName: true,
    timestamps: true
});

//指定User和User_relation的关系为1：1的关系，设定目标为frendid，即查询中 userid = frendid
// User.belongsTo(Blog,{foreignKey:'userId'});
// User.sync({force:true}) 

//清除表 定义新表之前必须执行！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// Userlove.sync({force:true})

//模型创建
//timestamp字段表示数据库中是否会自动更新createdAt和updatedAt字段，
// false表示不会增加这个字段。freezeTableName为false表示该模型对应的表明就为userinfo表，
// 默认时为true，对应表名为userinfos


// User.create({username:"dhty", password:"123456",avatar:'ssss'})

// User.findAll({raw: true}).then(function(articles) {
//     console.log(articles)
// });

// Blog.sync({force:true}) 
// Blog.create({userId:1, title:"我是blog",content:'我是内容'})
// Blog.findAll({raw: true}).then(function(articles) {
//     console.log(articles)
// });

// Remake.sync({force:true})
// Remake.create({username:'asdasdas', avatar:"我是blog",content:'我是内容',blogId:1})
// Remake.findAll({raw: true}).then(function(articles) {
//     console.log(articles)
// });

module.exports.User = User;
module.exports.Blog = Blog;
// module.exports.Userlove = Userlove;