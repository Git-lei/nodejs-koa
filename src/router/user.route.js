const Router = require('@koa/router');

// 校验中间件
const {userValidator,verifyValidator}= require('../middleware/user.middleware')

// 控制器
const {register,login} = require('../controller/user.controller')

// 实例化对象
const router = new Router({prefix: '/users'});
// 请求get '/users/*****' perfix 进行了处理 ==> 下面可以省略/users

// 用户注册  中间件 一层一层的 处理
router.post('/register',userValidator,verifyValidator,register)

// 用户登录
router.post('/login',login)

module.exports = router