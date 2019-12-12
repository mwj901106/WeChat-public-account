const express = require('express')
const requestHandler = require('./wechat/requestHandler')
const app = express();
const PORT = 3000
app.use(express.urlencoded({extended:true}))

//使用自定义中间件，用于处理微信服务器过来的请求
app.use(requestHandler())

app.listen(PORT,(err)=>{
  if(!err){
    console.log(`服务器启动了，端口号是${PORT}`)
  }else {
    console.log(err);
  }
})