const bcrypt = require('bcryptjs')

const {getUserInfo} = require('../service/user.service')
const {
  userFormatError,
  userAlreadyExisted,
  userRegistError,
  userUnExist,
  userLoginError,
  userPasswordInvalided
} = require('../constants/err.type')

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
    return
  }
  await next()
}

const verifyValidator = async (ctx, next) => {
  const {user_name} = ctx.request.body
  // 如果用户存在
  try {
    const res = await getUserInfo({user_name})
    if (res) {
      // 用户名已存在
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (e) {
    // 注册失败
    ctx.app.emit('error', userRegistError, ctx)
    return
  }
  await next()
}

const verifyLogin = async (ctx, next) => {
  const {user_name, password} = ctx.request.body
  // 1. 根据用户名 判断是否存在
  try {
    const res = await getUserInfo({user_name})

    if (!res) {
      console.error('用户名不存在', {user_name})
      // 用户名不存在
      ctx.app.emit('error', userUnExist, ctx)
      return
    }
    // 判断密码
    if (!bcrypt.compareSync(password ? password : '', res.password)) {
      // 密码无效
      ctx.app.emit('error', userPasswordInvalided, ctx)
      return
    }
  } catch (e) {
    console.error(e)
    // 登录失败
    ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}

module.exports = {
  userValidator, verifyValidator, bcryptPassword, verifyLogin
}