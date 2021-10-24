'use strict';

const Controller = require('egg').Controller;

class CorsController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('####')
    // 允许跨域
    // ctx.set('Access-Control-Allow-Origin', '*')
    // ctx.set('Access-Control-Allow-Method', 'POST')
    ctx.body = '我是egg服务返回的数据'
  }
}

module.exports = CorsController
