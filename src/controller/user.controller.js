const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../config/config.default')
const {createUser, getUserInfo} = require('../service/user.service')
const {userRegistError} = require('../constants/err.type')

class userController {
  async register(ctx, next) {
    // 1. 获取数据 前面的中间件 已经处理了数据的合法性 合理性
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
      console.error(err)
      ctx.app.emit('error', userRegistError, ctx)
    }

  }

  async login(ctx, next) {
    const {user_name, password} = ctx.request.body
    // 1.获取用户信息 (在token的playload中 记录id,user_name,is_admin)
    try {
      const {password, ...resUser} = await getUserInfo({user_name}) // es6 解构语法，剔除某个属性，其他的放到一个对象中
      ctx.body = {
        code: '0',
        message: '登录成功！',
        result: {
          token: jwt.sign(resUser, JWT_SECRET,{expiresIn: '1d'})
        }
      }
    } catch (e) {
      console.error('用户登录失败！',e)
    }


  }

}

module.exports = new userController()