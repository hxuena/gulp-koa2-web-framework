import { route, GET } from 'awilix-koa'
export default
@route("/") //装饰器
@route("/index.html")

class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService
  }

  /**
   * 子路由
   */

  @GET() //指定请求方法
  async indexAction(ctx) {
    //ctx.query  取前端传来的值 
    const result = await this.indexService.getData()
    ctx.body = await ctx.render('index', {
      data: result
    })
  }
}
