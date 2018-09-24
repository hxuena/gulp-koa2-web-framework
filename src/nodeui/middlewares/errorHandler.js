const errorHandler = {
  error(app, logger){
    app.use(async(ctx, next) => {
      try{
        await next()
      }catch(error){
        logger.error(error) //打印错误日志
        ctx.status=error.status || 200  //写200 而非500，为了防止百度seo降权，导致搜索不到网页
        ctx.body = "哎吆，出错了"
      }
    })
    app.use(async(ctx, next) => {
      await next()
      if(404 != ctx.status) return
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"></script>'
    })
  }
}
export default errorHandler