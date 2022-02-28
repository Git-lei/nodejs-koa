const bcrypt = require('bcryptjs')

const {getUserInfo} = require('../service/user.service')
const {userFormatError, userAlreadyExisted, userRegistError} = require('../constants/err.type')

// bcryptjs密码 加密
const bcryptPassword = async (ctx, next) => {
  const {password} = ctx.request.body

  const salt = bcrypt.genSaltSync(10);
  // hash 保存的是 密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next()
}

const userValidator = async (ctx, next) => {
  const {user_name, password} = ctx.request.body
  if (user_name && user_name == "" || password && password == "") {
    // 用户名 或者密码为空
    ctx.app.emit('error', userFormatError, ctx)
    // ctx.status = 400;
    // ctx.body = {
    //   code: "10001",
    //   message: "用户名或者密码为空！",
    //   result: ""
    // }
    return
  }
  await next()
}

const verifyValidator = async (ctx, next) => {
  const {user_name} = ctx.request.body
  // 如果用户存在
  // if (await getUserInfo({user_name})) {
  //   ctx.app.emit('error', userAlreadyExisted, ctx)
  //   return
  // }
  // await next()

  try {
    const res = await getUserInfo({user_name})
    if (res) {
      // 用户名已存在
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (e) {
    // 获取用户信息错误
    ctx.app.emit('error', userRegistError, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidator, verifyValidator, bcryptPassword
}