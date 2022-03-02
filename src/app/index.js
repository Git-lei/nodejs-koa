const path = require('path')

const Koa = require('koa')
const koaBody = require('koa-body');
const koaStatic= require('koa-static')
const parameter= require('koa-parameter')
// 错误处理 hadler
const errHandler = require('./errHandler')

// 路由
const router = require('../router/index')

const app = new (Koa)

app.use(koaBody({
  multipart:true,
  formidable:{
    uploadDir:path.join(__dirname,'../upload'),
    keepExtensions:true
  }
}));
app.use(koaStatic(path.join(__dirname,'../upload')))
app.use(parameter(app))
app.use(router.routes())
app.use(router.allowedMethods())

// 进行统一的错误处理
app.on('error', errHandler)

module.exports = app