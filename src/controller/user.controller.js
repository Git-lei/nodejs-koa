class userController {
  async register(ctx, next) {
    ctx.body = "用户注册"
  }

  async login(ctx, next) {
    ctx.body = "用户登录"
  }

}

module.exports  = new userController()