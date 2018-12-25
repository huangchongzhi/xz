//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");//跨域
const session=require("express-session");//session 连接

/*引入路由模块*/
const index=require("./routes/index");
const details=require("./routes/details");
const users=require("./routes/users");
const products=require("./routes/products");

//创建web服务器
var app = express();
var server = app.listen(3000,function(){
    console.log("web服务器创建成功");
});
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));

//托管静态资源到public目录下
app.use(express.static('public'));
//跨源头资源共享 //npm i -save cors
app.use(cors({
    origin:"http://localhost:8080"//来源地址:端口号，不能用*
}));
//用户session //npm i -save express-session
app.use(session({
    secret:"128位随机字符",
    resave:false,
    saveUninitialized:true
}))

/*使用路由器来管理路由*/
app.use("/index",index);//http://localhost:3000/index
app.use("/details",details);//http://localhost:3000/details
app.use("/users",users);//http://localhost:3000/users
app.use("/products",products);//http://localhost:3000/products