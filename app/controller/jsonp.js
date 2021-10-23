'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 1、定义数据
    let res = '我是egg返回的内容'
    // 2、获取回调函数名称、这里的query返回的就是我们query传的参数、并且是一个对象 eg: {callbackName: myCallback}
    let callbackName = ctx.query.callbackName
    // 3、设置返回内容
    ctx.set("Content-Type", "text/javascript")
    // 4、拼接返回数据(这里如果直接穿一个变量res、则会抛res is not defined、需要转下字符串)
    // ctx.body = `${callbackName}(${res})`
    ctx.body = `${callbackName}(${JSON.stringify(res)})`
  }
}

module.exports = HomeController
