/*
* 该模块用于请求ticket
* */
//引入发送请求的库（后台是没有办法使用ajax的）
const rp = require('request-promise-native')
//引入auth模块，用于请求一个可用的access_token
const Auth = require('./auth')
//引入fs模块用于操作文件
const {writeFile,readFile} = require('fs')
//引入接口管理模块
const api = require('../tools/api')

let accessToken = null;

(async()=>{
  //请求一个可用的access_token
  let auth = new Auth()
  let data = await auth.fetchAccessToken()
  accessToken = data.access_token

  let t = new Ticket()
  let res = await t.fetchTicket()
  console.log(res);

})()


class Ticket{

  //从微信服务器获取ticket
  async getTicket(){
    const url = `${api.getTicket}access_token=${accessToken}&type=jsapi`
    console.log(url);
    let result = await rp({
      method:'GET',
      url,
      json:true
    })
    if(result){
      console.log('从微 信服务器获取ticket成功！')
      result.expires_in = Date.now() + 7200000 - 300000
      return result
    }else{
      console.log('从微信服务器获取ticket出错！')
      return 'err'
    }
  }

  //保存ticket到本地
  saveTicket(ticket){
    return new Promise((resolve,reject)=>{
      writeFile('./ticket.txt',JSON.stringify(ticket),(err)=>{
        if(!err){
          console.log('保存ticket到本地成功')
          resolve()
        }else{
          console.log('保存ticket到本地失败')
          reject()
        }
      })
    })
  }

  //读取本地ticket
  readTicket(){
    return new Promise((resolve ,reject)=>{
      readFile('./ticket.txt',(err,data)=>{
        if(!err){
          console.log('读取本地ticket成功')
          resolve(JSON.parse(data.toString()))
        }else{
          console.log('读取本地ticket失败')
          // reject('err')
          resolve(null)
        }
      })
    })
  }

  //判断ticket是否过期
  isValidTicket(ticket){
    return ticket.expires_in > Date.now()
  }

  //最终整理好的，用于获取ticket的方法
  async fetchTicket(){
    let readResult = await this.readTicket()

    if(readResult){
      console.log('本地存在ticket')
      if(this.isValidTicket(readResult)){
        console.log('本地存在ticket，并且有效')
        return readResult
      }else{
        console.log('本地存在ticket，但过期，需要重新获取')
        let newTicket = await this.getTicket()
        await this.saveTicket(newTicket)
        return newTicket
      }
    }else{
      let firstData = await this.getTicket()
      await this.saveTicket(firstData)
      return firstData
    }
  }
}

module.exports = Ticket;



