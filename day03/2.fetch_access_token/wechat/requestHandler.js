/*
* 该模块专门用于处理微信服务器过来的请求：
*   1.验证服务器的有效性
*   2.获取用户输入的内容
* */
const config = require('../config')
const sha1 = require('sha1')
const {getXmlData,parseXmlData,formatJsData} = require('../tools/parseData')
const {buildReplyObj}  = require('../reply/replyObj')
const {buildReplyData}  = require('../reply/replyTemplate')


module.exports = ()=>{
  return async(req,res,next)=>{
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
    //用于验证服务器侧有效性
    const {signature,echostr,timestamp,nonce} = req.query
    const {token} = config
    //开发者最终加密后的字符串
    let sha1Str = sha1([timestamp,nonce,token].sort().join('').toString())

    //如果是验证服务器有效性的请求
    if(req.method === 'GET' && sha1Str === signature) {
      console.log('微信服务器发来验证有效性请求')
      res.end(echostr) //如果相等---请求来自于微信服务器
      return;
    }

    //如果是普通消息请求
    else if(req.method === 'POST' && sha1Str === signature){
      //第一步：获取微信服务器发来的xml数据
      const xmlData = await getXmlData(req)
      //第二步：解析xml格式数据为js格式数据
      const jsData = parseXmlData(xmlData)
      //第三步：进一步格式化js数据
      const userInputObj = formatJsData(jsData)
      console.log(userInputObj);
      const replyObj = buildReplyObj(userInputObj)
      const finalData = buildReplyData(replyObj)
      console.log(finalData);
      res.end(finalData)
    }
    else res.send('禁止发送非法请求！！！')
  }
}



