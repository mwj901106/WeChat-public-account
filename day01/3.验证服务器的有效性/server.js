const express = require('express')
const sha1 = require('sha1')
const app = express();
const PORT = 3000
app.use(express.urlencoded({extended:true}))


//定义开发者核心配置对象
const config = {
  appID:'wx368543bb7fd2f699',
  appsecret:'cc1b5ed97bc8cc780ed5363619effa6e',
  token:'atguigu'
}

app.use((req,res,next)=>{
  /*
    验证服务器的有效性：（微信服务器验证开发者服务器）
       1.微信服务器在验证开发者服务器是否有效时，发送的是GET请求，内容如下：
         { signature: '68b8c351ecf767290d44be3e14cfc413880c32ef',   //微信服务器经过特殊加密后的字符串
            echostr: '4791809595966652295',  //微信服务器返回的一个随机字符串
            timestamp: '1549959043', //时间戳
            nonce: '2065812434' }   //微信服务器返回的一个随机数字
       2.让微信服务器接受开发者服务器步骤：
            1.将微信服务器返回的timestamp、nonce还有事先约定好的（在网页中设置的）token拼成一个数组，进行字典排序。
            2.将字典排序后的数组，拼接成一个字符串，并且对该字符串进行sha1加密
            3.将加密后的字符串与signature进行对比
                -相等：该请求来自于微信服务器，且该请求是用来验证服务器的有效性,返回echostr给微信服务器。
                -不相等：该请求是非法请求，驳回请求。
   */
  //获取参数
  const {signature,echostr,timestamp,nonce} = req.query
  const {token} = config
  //经过字典排序后的数组
  let sortedArr = [timestamp,nonce,token].sort()
  //将数组拼成一个字符串
  let sha1Str = sha1(sortedArr.join('').toString())
  //校验sha1Str和signature是否相等
  console.log(sha1Str);
  console.log(signature);
  if(sha1Str === signature){
    //如果相等---请求来自于微信服务器
      res.end(echostr)
  }else{
      res.send('禁止发送非法请求！！！')
  }


})

app.listen(PORT,(err)=>{
  if(!err){
    console.log(`服务器启动了，端口号是${PORT}`)
  }else {
    console.log(err);
  }
})