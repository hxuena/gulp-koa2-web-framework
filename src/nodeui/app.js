import Koa from "koa"
import router from "koa-simple-router"
import config from "./config"
import render from "koa-swig"
import co from "co"
import serve from "koa-static"
import errorHandler from "./middlewares/errorHandler"
import log4js from 'log4js'
import { asClass, asValue, createContainer, Lifetime} from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'


log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname +'/logs/error.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger('cheese')

const app = new Koa()
//创建IOC容器
const container = createContainer()
//每次请求都重新new一个实例
app.use(scopePerRequest(container))
//装载 service
container.loadModules([__dirname + '/services/*.js'], {
  formatName: "camelCase",  //格式化为驼峰命名
  resolverOptions: {
    lifetime: Lifetime.SCOPED //创建作用域
  }
})

app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', 
  ext: 'html'
}))

errorHandler.error(app, logger)

//自动注册所有的路由
app.use(loadControllers("controllers/*.js", {cwd: __dirname}))

app.use(serve(config.staticDir))
app.listen(config.port, ()=>{
  console.log(`current port ${config.port}`)
})
