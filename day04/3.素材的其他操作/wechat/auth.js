/*
*  该模块用于请求access_token，并且是可以单独运行。
* 关于access_token：
*   1.是什么？ 全局接口调用唯一凭据（不同用户是不同的）
*   2.怎么用？ 每次在调用微信接口的时候，要携带着
*   3.特点：
*       1.有效时间为2小时，要求开发人员最好每隔一段时间更新这个access_token，最好提前5分钟更新。
*       2.获取access_token是有次数限制的，一般认证账号通常次数为2000次/天，最好把获取到的access_token保存起来。
*       3.包含有过期时间，说明该access_token有效期是多久。
*       4.2小时之内（还没有过期）再次请求，会导致上一次的access_token失效。
*       获取地址：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
*       成功的返回值：{"access_token":"ACCESS_TOKEN","expires_in":7200}
*   4.设计思路：
*     --第一次请求：直接找微信服务器要一个access_token，随后保存。
*     --第二次请求：读取本地存放的access_token。
*         --若过期：重新获取一个access_token，随后保存。
*         --未过期：直接使用。
*   5.整理思路：
*       --一上来就读取本地的access_token
*            --有值：
*               --若过期：重新获取access_token，随后保存
*               --未过期：直接使用
*            --无值：
*               重新获取access_token，随后保存
* */

//引入请求必要的参数
const {appID,appsecret} = require('../config')
//引入发送请求的库（后台是没有办法使用ajax的）
const rp = require('request-promise-native')
//引入fs模块用于操作文件
const {writeFile,readFile} = require('fs')
//引入接口管理模块
const api = require('../tools/api')

class WeChat{

  //从微信服务器获取access_token
  async getAccessToken(){
    const url = `${api.requestAccessToken}appid=${appID}&secret=${appsecret}`
    console.log(url);
    let result = await rp({
      method:'GET',
      url,
      json:true
    })
    if(result){
      console.log('从微信服务器获取access_token成功！')
      result.expires_in = Date.now() + 7200000 - 300000
      return result
    }else{
      console.log('从微信服务器获取access_token出错！')
      return 'err'
    }
  }

  //保存access_token到本地
  saveAccessToken(accessToken){
    return new Promise((resolve,reject)=>{
      writeFile('./access_token.txt',JSON.stringify(accessToken),(err)=>{
        if(!err){
          console.log('保存access_token到本地成功')
          resolve()
        }else{
          console.log('保存access_token到本地失败')
          reject()
        }
      })
    })
  }

  //读取本地access_token
  readAccessToken(){
    return new Promise((resolve ,reject)=>{
      readFile('./access_token.txt',(err,data)=>{
        if(!err){
          console.log('读取本地access_token成功')
          resolve(JSON.parse(data.toString()))
        }else{
          console.log('读取本地access_token失败')
          // reject('err')
          resolve(null)
        }
      })
    })
  }

  //判断access_token是否过期
  isValidAccessToken(accessToken){
    return accessToken.expires_in > Date.now()
  }

  //最终整理好的，用于获取accessToken的方法
  async fetchAccessToken(){
    let readResult = await this.readAccessToken()

    if(readResult){
      console.log('本地存在access_token')
      if(this.isValidAccessToken(readResult)){
        console.log('本地存在access_token，并且有效')
        return readResult
      }else{
        console.log('本地存在access_token，但过期，需要重新获取')
        let newAccessToken = await this.getAccessToken()
        await this.saveAccessToken(newAccessToken)
        return newAccessToken
      }
    }else{
      let firstData = await this.getAccessToken()
      await this.saveAccessToken(firstData)
      return firstData
    }
  }
}

module.exports = WeChat;

//测试代码
/*(async ()=>{
  let w = new WeChat()
  let accessToken = await w.fetchAccessToken()
  console.log(accessToken);
})()*/

