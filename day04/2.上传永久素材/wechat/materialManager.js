/*
* 该模块用于管理素材（临时素材、永久素材）,可以单独运行
* */

//引入request-promise-native模块
const rp =  require('request-promise-native');
//引入api模块
const api = require('../tools/api')
//引入权限模块
const Auth = require('./auth')
//引入fs模块
const {createReadStream} = require('fs')

let accessToken = null;
(async()=>{
  let auth = new Auth()
  let data = await auth.fetchAccessToken()
  accessToken = data.access_token

  //上传临时素材
/*  let res = await uploadTmp('video','../materila/demo.mp4')
  console.log(res);*/

  //上传图文消息中，图片（永久）返回一个url
/*  let res = await uploadPerImageOfNews('../materila/01.jpg')
  console.log(res);*/

  //上传一个永久素材(图片)
  let res  = await uploadPer('image','../materila/02.PNG')
  console.log(res);

})()

//临时上传的一个视频的mediaid：FNrOhYo0lfehXZVkCk0AWzw-GYY94wntwUEVnxHvzHoZBAUELSo7BraWz_qIthOB
//永久图片的地址:OubHbpvv7niVJzWorH0ZtQ6fjSmdLcezj-2uA-8JAOY

//上传临时素材
async function uploadTmp(type,path) {
  const url = `${api.material.tmp.uploadTmp}access_token=${accessToken}&type=${type}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    formData:{media:createReadStream(path)}
  })
  return result
}

//上传图文消息中，图片（永久）返回一个url
async function uploadPerImageOfNews(path) {
  const url = `${api.material.perpetual.uploadPerImageOfNews}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    formData:{media:createReadStream(path)}
  })
  return result
}

//上传永久素材（图片）
async function uploadPer(type,path) {
  const url = `${api.material.perpetual.uploadPer}access_token=${accessToken}&type=${type}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    formData:{media:createReadStream(path)}
  })
  return result
}