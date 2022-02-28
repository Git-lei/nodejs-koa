const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../config/config.default')
const {TokenExpiredError,invalidTokenError} = require('../constants/err.type')

const auth = async (ctx, next) => {
  const {authorization} = ctx.request.header;
  const token = authorization.replace('Bearer ', '')
  // invalid token - synchronous
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // user 包含playload 中的 user_name、 is_admin、 id

    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        return ctx.app.emit('error', TokenExpiredError, ctx) // token过期
      case 'JsonWebTokenError':
        return ctx.app.emit('error', invalidTokenError, ctx) // 无效的token
    }

  }
  await next()
}

module.exports = {
  auth
}