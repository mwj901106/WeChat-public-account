const puppeteer = require('puppeteer');

(async () => {
  //打开浏览器
  const browser = await puppeteer.launch({
    headless:false //无头，是否显示浏览器界面
  });

  //新建标签页
  const page = await browser.newPage();

  //访问指定网址
  await page.goto('https://movie.douban.com/cinema/nowplaying/beijing/',{
    waitUntil:['load']
  });

  //开始爬取数据
  const finalData = await page.evaluate(()=>{
    //在这里对当前打开的页面进行操作
    const $lis = $('#nowplaying .lists>li');

    let result = []

    for (var i=0; i<$lis.length; i++ ){
      //获取单个li元素
      let $li = $($lis[i])
      //海报图
      const image = $li.find('.poster img').attr('src')
      //标题
      const title = $li.find('.stitle a').attr('title');
      //评分
      const rating = $li.find('.subject-rate').text();

      result.push({image,title,rating})
    }


    return result
    // $($('#nowplaying .lists>li')[0]).find('.poster img').attr('src')
  });

  console.log(finalData);

  //关闭浏览器
  await browser.close();

})();