/*
* 该模块用于解析数据
* */
const {parseString} = require('xml2js')
module.exports = {

/**
 * 获取微信服务器发给开发者的xml格式数据
 * @param req
 * @returns {Promise}
 */
getXmlData(req) {
return new Promise((resolve,reject)=>{
  let xmlData = ''
  req.on('data',(data)=>{
    xmlData += data.toString()
  })
  req.on('end',()=>{
    resolve(xmlData)
  })
})
},

/**
 * 解析xml数据为js数据
 * @param xmlData
 * @returns {string}
 */
parseXmlData(xmlData) {
  let resData = ''
  parseString(xmlData,{trim:true},(err,data)=>{
    if(!err){
      resData = data
    }else{
      console.log('解析xml数据为js数据的过程除了问题',err)
      resData = 'err'
    }
  })
  return resData
},

/**
 * 进一步格式化Js数据
 * @param xml
 * @returns {{}}
 */
formatJsData({xml}) {
  let data = {}
  for (let key in xml){
    const value = xml[key]
    data[key] = value[0]
  }
  return data
}
}