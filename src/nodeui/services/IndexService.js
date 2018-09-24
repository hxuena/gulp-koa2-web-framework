
/**
 * @fileOverview 实现Index数据模型
 * @author hxuena@163.com
 */
/**
 * IndexModle类 生成一段异步数据
 * @class
 */
export default class IndexService {
    /**
     * @constructor
     * @param {string} app koa2上下文
     */
    constructor(app) {}
    /**
     * 获取具体数据的API接口
     * @returns {Promise} 返回异步数据
     * @example 
     * return new Promise  跟java请求的接口
     * getData()
     */
    getData(){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                resolve("异步数据")
            },1000)
        })
    }
}