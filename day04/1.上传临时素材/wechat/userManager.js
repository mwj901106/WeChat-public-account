/*
* 该模块用于管理公众号的用户（粉丝），可单独运行的文件
* */

const Auth = require('./auth')
const rp = require('request-promise-native')
const api = require('../tools/api')

let accessToken = '';
(async()=>{
  let auth = new Auth()
  let data = await auth.fetchAccessToken()
  accessToken = data.access_token

  //调用创建标签的方法
/*  let res = await creatTags('vvip')
  console.log(res);*/

  //获取所有标签
/*  let res = await getAllTags()
  console.log(res);*/

  //编辑标签
/*  let res = await editTagsById(107,'vip6')
  console.log(res);*/

  //删除标签
/*  let res = await deleteTags(108)
  console.log(res);*/

  //为用户打上一个标签
/*  let res = await markTags2Users(112,['o1KCX0_v9SZYkIlfb1NITuA2lL-U'])
  console.log(res);*/

  //获取某个标签下的所有用户
  let res= await getUserByTags(112)
  console.log(res);

  //批量为用户取消标签
/*  let res = await unmarkTags2Users(112,['o1KCX08EIKwklxKA9XbSF8Os-W8g','o1KCX0_lO_Eqa_YSam-8F-v0cBiY','o1KCX038wqpPXgf3CYX5y4bsW70k'])
  console.log(res);*/

  //获取某个用户的标签
/*  let res= await getTagsByOpenId('o1KCX08EIKwklxKA9XbSF8Os-W8g')
  console.log(res);*/

  //获取用户信息
/*  let res = await getUserInfoById('o1KCX08EIKwklxKA9XbSF8Os-W8g')
  console.log(res);*/

})()

//创建标签
async function creatTags(name) {
  const url = `${api.user.creatTags}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{"tag":{"name":name}}
  })
  return result
}

//获取所有标签
async function getAllTags() {
  const url = `${api.user.getAllTags}access_token=${accessToken}`
  let result = await rp({
    method:'GET',
    url,
    json:true
  })
  return result
}

//编辑标签
async function editTagsById(id,name) {
  const url = `${api.user.editTagsById}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{"tag":{"id":id,"name":name}}
  })
  return result
}

//删除标签
async function deleteTags(id) {
  const url = `${api.user.deleteTags}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{"tag":{"id":id}}
  })
  return result
}

//为用户打标签
async function markTags2Users(id,userOpenidList) {
  const url = `${api.user.markTags2Users}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{
      "openid_list":userOpenidList,
      "tagid" : id }
  })
  return result
}

//获取某个标签下的所有用户
async function getUserByTags(id) {
  const url = `${api.user.getUserByTags}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{"tagid":id,"next_openid":"" }
  })
  return result
}

//批量为用户取消标签
async function unmarkTags2Users (id,userOpenidList) {
  const url = `${api.user.unmarkTags2Users}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{
      "openid_list" : userOpenidList,
      "tagid" : id }
  })
  return result
}

//获取某个用户身上的标签
async function getTagsByOpenId (openId) {
  const url = `${api.user.getTagsByOpenId}access_token=${accessToken}`
  let result = await rp({
    method:'POST',
    url,
    json:true,
    body:{"openid":openId}
  })
  return result
}

//获取用户信息
async function getUserInfoById(openId) {
  const url = `${api.user.getUserInfoById}access_token=${accessToken}&openid=${openId}&lang=zh_CN`
  let result = await rp({
    method:'GET',
    url,
    json:true
  })
  return result
}