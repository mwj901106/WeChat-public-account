/*
* 该模块用于维护一个对象，该对象就是要返回给用户的信息
*   备注：属于业务逻辑模块
* */

function buildReplyObj(userData) {
  //预先构建一个返回消息的对象
  let obj = {
    ToUserName:userData.ToUserName,
    FromUserName:userData.FromUserName,
    CreateTime:Date.now()
  }
  //如果用户输入的是文字，就返回特定的文字信息
  if(userData.Content === '我饿了'){
    obj.MsgType = 'text'
    obj.Content = '饿了你就吃点吧！'
    return obj
  }
  //如果用户发送的是图片，返回这个图片
  else if(userData.MsgType === 'image'){
    obj.MsgType = 'image'
    obj.MediaId = userData.MediaId
    return obj
  }
  //如果用户发送的是语音，则返回语音识别的结果
  else if(userData.MsgType === 'voice'){
    obj.MsgType = 'text'
    obj.Content = userData.Recognition
    return obj
  }
  //如果用户发送的是视频，返回一个视频（暂时不能用）
  else if(userData.MsgType === 'video'){
    obj.MsgType = 'video'
    obj.MediaId = ''
    obj.Title = ''
    obj.Description = ''
    return obj
  }
  //如果用户发过来的文本信息说“来首音乐”，返回一个音乐给用户build
  else if(userData.Content === '来首音乐'){
    obj.MsgType = 'music'
    obj.Title = '远走高飞'
    obj.Description = '很好听的一首歌'
    obj.MusicUrl = 'http://sc1.111ttt.cn/2017/1/05/09/298092036393.mp3'
    obj.HQMusicUrl = 'http://sc1.111ttt.cn/2017/1/05/09/298092036393.mp3'
    obj.ThumbMediaId = 'vQD0ctdww1u-9HPp7mAmsVwB6vGkG3bUCkYW6jxIdZokorvJ5kEtvUsmmnlYpV9X'
    return obj
  }
  //如果用户发过来的文本信息说“来个图文消息”，返回一个图文消息给用户
  else if(userData.Content === '来个图文消息'){
    obj.MsgType = 'news'
    obj.ArticleCount = 1
    obj.item = []
    obj.item[0] = {}
    obj.item[0].Title = '1025是非常帅气美丽的一群人'
    obj.item[0].Description = '相亲相爱一家人'
    obj.item[0].PicUrl = 'http://img.pconline.com.cn/images/photoblog/6/1/1/6/6116332/20096/24/1245846498917.jpg'
    obj.item[0].Url = 'http://www.atguigu.com'
    return obj
  }
  //如果用户发送的是一个地理位置
  else if(userData.MsgType === 'location'){
    obj.MsgType = 'text'
    obj.Content = `您正在${userData.Label}附近，经度：${userData.Location_X},纬度：${userData.Location_Y},地图的缩放级别为：${userData.Scale}`
    return obj
  }
  else{
    obj.MsgType = 'text'
    obj.Content = '你在说什么？我听不懂！'
    return obj
  }
}

exports.buildReplyObj = buildReplyObj