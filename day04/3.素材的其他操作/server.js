const express = require('express')
const requestHandler = require('./wechat/requestHandler')
const app = express();
const PORT = 3000
app.use(express.urlencoded({extended:true}))
//配置模板引擎
app.set("view engine" , "ejs");
//配置模板目录
app.set("views","./views");

app.get('/demo',(req,res)=>{
  data = '<h2>哈哈哈</h2>'
  res.render('demo',{data})
})

//使用自定义中间件，用于处理微信服务器过来的请求
app.use(requestHandler())

app.listen(PORT,(err)=>{
  if(!err){
    console.log(`服务器启动了，端口号是${PORT}`)
  }else {
    console.log(err);
  }
})