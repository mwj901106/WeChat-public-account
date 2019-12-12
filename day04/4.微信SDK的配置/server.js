const express = require('express')
const requestHandler = require('./wechat/requestHandler')
const {url,appID} = require('./config')
const Ticket = require('./wechat/ticket')
const sha1 = require('sha1')
const app = express();
const PORT = 3000
app.use(express.urlencoded({extended:true}))
//配置模板引擎
app.set("view engine" , "ejs");
//配置模板目录
app.set("views","./views");

/*
* 1.配置JS接口安全域名
* 2.在需要使用JS—SDK的页面中引入微信提供的JS文件
* 3.页面中定义一个配置文件（包含一个签名）
* */
app.get('/search',async(req,res)=>{
  //准备一个可用的ticket
  let ticket = null
  let t = new Ticket()
  let data = await t.fetchTicket()
  ticket = data.ticket
  /*
  * 1.参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）
  * 2.对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
  * 3.这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
  * */

  //准备参与算法的必要参数
  const noncestr = Math.random().toString().substring(2);
  const jsapi_ticket = ticket;
  const timestamp = Math.round(Date.now() / 1000);
  const url2 = `${url}/search`

  //按照特定要求，准备一个key=value形式的数组
  const arr = [
    `noncestr=${noncestr}`,
    `jsapi_ticket=${jsapi_ticket}`,
    `timestamp=${timestamp}`,
    `url=${url2}`,
  ]

  //进行字典排序和加密
  let signature = sha1(arr.sort().join('&'))
  console.log(signature);

  res.render('search',{appID,noncestr,timestamp,signature})
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