const Koa = require('koa')
const koaBody = require('koa-body');

// 错误处理 hadler
const errHandler = require('./errHandler')

// 路由
const userRouter = require('../router/user.route')

const app = new (Koa)

app.use(koaBody());
app.use(userRouter.routes())

// 进行统一的错误处理
app.on('error', errHandler)

module.exports = app