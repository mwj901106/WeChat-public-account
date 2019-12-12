/*
* 该模块用于群发消息
* */

const Auth = require('./auth')
const rp = require('request-promise-native')
const api = require('../tools/api')

let accessToken = null;
(async()=>{
  let auth = new Auth()
  let data = await auth.fetchAccessToken()
  accessToken = data.access_token

  let res = await senMessageByTags(textObj)
  console.log(res);
})()

const textObj = {
  "filter":{
    "is_to_all":false,
    "tag_id":112
  },
  "text":{
    "content":"终于要下课了，好开心2！"
  },
  "msgtype":"text"
}


async function senMessageByTags(textObj) {
  const url = `${api.message.senMessageByTags}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:textObj
  })
  return result
}