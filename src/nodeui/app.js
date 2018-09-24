import Koa from "koa"
import router from "koa-simple-router"
import config from "./config"
import controllerInit from "./controllers"
import render from "koa-swig"
import co from "co"
import serve from "koa-static"
import errorHandler from "./middlewares/errorHandler"
import log4js from 'log4js'

log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname +'/logs/error.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger('cheese')

const app = new Koa()
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', 
  ext: 'html'
}))

errorHandler.error(app, logger)
controllerInit(app, router) 

app.use(serve(config.staticDir))
app.listen(config.port, ()=>{
  console.log(`current port ${config.port}`)
})
