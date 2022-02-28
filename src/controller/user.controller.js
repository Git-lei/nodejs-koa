const {createUser, getUserInfo} = require('../service/user.service')
const {userRegistError} =require('../constants/err.type')

class userController {
  async register(ctx, next) {
    // 1. 获取数据 并判断数据合法性 合理性
    const {user_name, password} = ctx.request.body
    // console.log(ctx.request.body)

    try {
    // 2. 操作数据库
      const res = await createUser(user_name, password)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        result: {
          id: res.id,
          user_name: res.user_name
        },
        message: '用户注册成功'
      }
    } catch (err) {
      ctx.app.emit('error', userRegistError, ctx)
    }

  }

  async login(ctx, next) {
    ctx.body = "用户登录"
  }

}

module.exports = new userController()