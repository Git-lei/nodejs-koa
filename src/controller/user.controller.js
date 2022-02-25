const {createUser} = require('../service/user.service')

class userController {
  async register(ctx, next) {
    // 1. 获取数据
    // 2. 操作数据库
    // 3. 返回结果
    const {user_name, password} = ctx.request.body
    console.log(ctx.request.body)
    const res = await createUser(user_name, password)
    ctx.body = "用户注册" + res
  }

  async login(ctx, next) {
    ctx.body = "用户登录"
  }

}

module.exports = new userController()