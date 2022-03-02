const Koa = require('koa')
const koaBody = require('koa-body');

// 错误处理 hadler
const errHandler = require('./errHandler')

// 路由
const router = require('../router/index')

const app = new (Koa)

app.use(koaBody());
app.use(router.routes())
app.use(router.allowedMethods())

// 进行统一的错误处理
app.on('error', errHandler)

module.exports = app