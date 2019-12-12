/*
* 该模块用于统一管理项目中的所有api接口
* */

const baseUrl = 'https://api.weixin.qq.com/cgi-bin/'

module.exports = {
  //用于获取access_token的接口地址
  requestAccessToken:`${baseUrl}token?grant_type=client_credential&`,
  //菜单相关接口
  menu:{
    // //创建菜单接口
    creatMenu:`${baseUrl}menu/create?`,
    deleteMenu:`${baseUrl}menu/delete?`
  }

}