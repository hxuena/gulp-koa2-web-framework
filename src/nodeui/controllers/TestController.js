import {GET, route} from 'awilix-koa'

export default 
  @route("/test")  //controller
  class TestController{
    /**
     * constructor({})
     * @param {serviceName} service名 
     */
    
    @GET()
    async indexAction(ctx){  //action
      ctx.body = 'multiController, test'
    }
  }