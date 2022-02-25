const {getUserInfo} = require('../service/user.service')
const {userFormatError, userAlreadyExisted} = require('../constants/err.type')

const userValidator = async (ctx, next) => {
  const {user_name, password} = ctx.request.body
  if (user_name && user_name == "" || password && password == "") {
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
  if (await getUserInfo({user_name})) {
    ctx.app.emit('error', userAlreadyExisted, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidator, verifyValidator
}