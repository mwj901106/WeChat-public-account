/*
* 该模块用于构建真正返回给微信服务器的xml数据
*
* */

function buildReplyData(replyObj) {
  let replyStr = `<xml> 
                    <ToUserName><![CDATA[${replyObj.FromUserName}]]></ToUserName> 
                    <FromUserName><![CDATA[${replyObj.ToUserName}]]></FromUserName> 
                    <CreateTime>${Date.now()}</CreateTime> 
                    <MsgType><![CDATA[${replyObj.MsgType}]]></MsgType> `

  //如果给用户回复的是一个文本消息
  if(replyObj.MsgType === 'text'){
    replyStr += `<Content><![CDATA[${replyObj.Content}]]></Content> `
  }
  //如果回复给用户的是一个图片消息
  else if(replyObj.MsgType === 'image'){
    replyStr += `<Image><MediaId><![CDATA[${replyObj.MediaId}]]></MediaId></Image>`
  }
  //如果回复给用户的是语音
  else if(replyObj.MsgType === 'voice'){
    replyStr += `<Voice><MediaId><![CDATA[${replyObj.MediaId}]]></MediaId></Voice>`
  }
  //如果回复给用户的是视频
  else if(replyObj.MsgType === 'video'){
    replyStr += `<Video>
                      <MediaId><![CDATA[${replyObj.MediaId}]]></MediaId>
                      <Title><![CDATA[${replyObj.Title}]]></Title>
                      <Description><![CDATA[${replyObj.Description}]]></Description>
                    </Video>`
  }
  //如果回复给用户的是音乐
  else if(replyObj.MsgType === 'music'){
    replyStr += `<Music>
                      <Title><![CDATA[${replyObj.Title}]]></Title>
                      <Description><![CDATA[${replyObj.Description}]]></Description>
                      <MusicUrl><![CDATA[${replyObj.MusicUrl}]]></MusicUrl>
                      <HQMusicUrl><![CDATA[${replyObj.HQMusicUrl}]]></HQMusicUrl>
                      <ThumbMediaId><![CDATA[${replyObj.ThumbMediaId}]]></ThumbMediaId>
                    </Music>`
  }
  //如果用户发过来的文本信息说“来个图文消息”，返回一个图文消息给用户
  else if(replyObj.MsgType === 'news'){
    console.log(replyObj.item,'@@');
    replyStr += `<ArticleCount>1</ArticleCount><Articles>`
    replyObj.item.forEach((item)=>{
      replyStr += `<item>
                          <Title><![CDATA[${item.Title}]]></Title>
                          <Description><![CDATA[${item.Description}]]></Description>
                          <PicUrl><![CDATA[${item.PicUrl}]]></PicUrl>
                          <Url><![CDATA[${item.Url}]]></Url>
                        </item>`
    })
    replyStr +=  `</Articles>`
  }
  replyStr += '</xml>'
  return replyStr
}

exports.buildReplyData = buildReplyData