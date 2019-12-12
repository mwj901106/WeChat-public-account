/*
* 该模块用于管理公众号的菜单，是可以单独运行的。
* */

const Auth = require('./auth')
const rp = require('request-promise-native')
const api = require('../tools/api')

//获取一个可用的accessToken
let accessToken = null;
(async()=>{
  let auth = new Auth()
  let data = await auth.fetchAccessToken()
  accessToken = data.access_token

  //测试--删除菜单
  let deletRes = await deleteMenu()
  console.log(deletRes);

  //测试---创建菜单
  let creatRes = await creatMenu(menuObj)
  console.log(creatRes);

})()


//创建菜单
async function creatMenu(body) {
  const url = `${api.menu.creatMenu}access_token=${accessToken}`
  let creatResult = await rp({
    method:'POST',
    url,
    json:true,
    body
  })
  return creatResult;
}

//删除菜单
async function deleteMenu() {
  const url = `${api.menu.deleteMenu}access_token=${accessToken}`
  let delteResult = await rp({
    method:'GET',
    url,
    json:true,
  })
  return delteResult;
}

//菜单对象（维护菜单的具体内容）
const menuObj = {
  "button":[
    {
      "type":"click",
      "name":"菜单一",
      "key":"001"
    },
    {
      "name":"二级菜单1",
      "sub_button":[
        {
          "name": "发送位置",
          "type": "location_select",
          "key": "location"
        },
        /*{
          "type": "media_id",
          "name": "获取图片-",
          "media_id": "-onYLTRPxJ28PkOlwQW5eUTj_MJIkvE4j3L4PYSaSYAovSQ0Utunthwk04-E-krI"
        }*/
        /*{
          "type": "view_limited",
          "name": "获取图文消息-",
          "media_id": "MEDIA_ID2"
        }*/
      ]
    },
    {
      "name":"二级菜单2",
      "sub_button":[
        {
          "type": "scancode_push",
          "name": "扫一扫1",
          "key": "saoyisao_1",
        },
        {
          "type": "scancode_waitmsg",
          "name": "扫一扫2",
          "key": "saoyisao_2",
        },
        {
          "type": "pic_sysphoto",
          "name": "系统拍照发图",
          "key": "pic_01",
        },
        {
          "type": "pic_photo_or_album",
          "name": "拍照或者相册发图",
          "key": "pic_02",
        },
        {
          "type": "pic_weixin",
          "name": "微信相册发图",
          "key": "pic_03",
          "sub_button": [ ]
        }
      ]
    }]
}

