const {createUser, getUserInfo} = require('../service/user.service')

class userController {
  async register(ctx, next) {
    // 1. 获取数据 并判断数据合法性 合理性
    const {user_name, password} = ctx.request.body
    // console.log(ctx.request.body)

    // 2. 操作数据库
    // 3. 返回结果
    const res = await createUser(user_name, password)
    ctx.body = {
      code: 0,
      result: {
        id: res.id,
        user_name: res.user_name
      },
      message: '用户注册成功'
    }
  }

  async login(ctx, next) {
    ctx.body = "用户登录"
  }

}

module.exports = new userController()