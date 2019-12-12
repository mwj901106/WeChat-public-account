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
  },
  //用户管理相关接口
  user:{
    creatTags:`${baseUrl}tags/create?`,
    getAllTags:`${baseUrl}tags/get?`,
    editTagsById:`${baseUrl}tags/update?`,
    deleteTags:`${baseUrl}tags/delete?`,
    markTags2Users:`${baseUrl}tags/members/batchtagging?`,
    getUserByTags:`${baseUrl}user/tag/get?`,
    unmarkTags2Users:`${baseUrl}tags/members/batchuntagging?`,
    getTagsByOpenId:`${baseUrl}tags/getidlist?`,
    getUserInfoById:`${baseUrl}user/info?`
  }

}