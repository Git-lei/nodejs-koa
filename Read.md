# 一、项目初始化
## 1.npm初始化
```shell
npm init -y
```
生成packag.json文件，记录项目的依赖

## 2.git初始化
```shell
git init
```
生成 .git隐藏文件夹， 添加.gitignore(忽略提交文件/夹)
# 二、搭建项目
## 1.安装koa框架
```shell
npm i koa
```
## 2.搭建基本的app应用
```js
const Koa = require('koa')
const app = new(Koa)

app.use((ctx ,next)=>{
  ctx.body = 'hello world'
})

app.listen(3000,()=>{
  console.log('server is running on http://localhost:3000')
})
```

# 三、项目基本优化

## 1.自动重启项目

安装nodemon工具

```shell
npm i nodemon -D
```

编写package.json 脚本

```
"scripts": {
    "dev": "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

```shell
npm run dev  // 启动dev调试
```

## 2.读取配置文件

#### 1.安装dotenv，读取根目录的 ```.env``` ，将配置写到 ```process.env``` 中

```shell
npm i dotenv
```

#### 2.创建 .env

```
APP_PORT=8000
```

#### 3.创建src/config/config.default.js

```js
const dotenv = require("dotenv")

dotenv.config()

module.exports = process.env
```

#### 4.使用

```js
// main.js 导入使用
const {APP_PORT} = require('./config/config.default')

// ···

app.listen(APP_PORT,()=>{
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
```



# 四、添加路由

路由：根据的URL，调用对应的处理函数

#### 1.安装路由处理包 [koa-router](https://www.npmjs.com/package/koa-router)

```shell
npm i @koa/router
```

#### 2.导入包，实例化对象

```js
const Router = require('@koa/router');

const router = new Router();
```

#### 3.编写路由，注册中间件

```js
// ···

router.get('/',(ctx,next)=>{
  ctx.body = 'hello node router'
})

app.use(router.routes())
```

#### 4.路由模块独立

*user.route.js*

```js
// 创建router文件夹
// 新建user.route.js（***.route.js）
const Router = require('@koa/router');

const router = new Router({prefix: '/users'});
// 请求get '/users/*****' perfix 进行了处理 ==> 下面可以省略/users

router.get('/',(ctx,next)=>{
  ctx.body = 'user router'
})

module.exports = router
```

*main.js*

```js
// main.js 导入 user.route.js
const Koa = require('koa')

const {APP_PORT} = require('./config/config.default')
const userRouter = require('./router/user.route')

const app = new(Koa)

app.use(userRouter.routes())

app.listen(APP_PORT,()=>{
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

# 五、目录结构优化

#### 1.将 http服务 和 app业务 部分拆分

创建 src/app/index.js

```js
// src/app/index.js
const Koa = require('koa')

const userRouter = require('../router/user.route')

const app = new(Koa)

app.use(userRouter.routes())

module.exports = app
```

改写main.js

```js
// main.js 导入 app.js
const {APP_PORT} = require('./config/config.default')
const app = require('./app')

app.listen(APP_PORT,()=>{
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

#### 2.将路由 和 控制器 拆分

路由：解析url，分发给控制器 对应的 方法

控制器：处理不同的业务

```js
// 新建 src/controller/user.controller.js

class userController {
  async register(ctx, next) {
    ctx.body = "用户注册"
  }

  async login(ctx, next) {
    ctx.body = "用户登录"
  }
}

module.exports  = new userController()
```

```js
// 改写 user.route.js
const Router = require('@koa/router');
const {register,login} = require('../controller/user.controller')
const router = new Router({prefix: '/users'});
// 请求get '/users/*****' perfix 进行了处理 ==> 下面可以省略/users

// 用户注册
router.post('/register',register)

// 用户登录
router.post('/login',login)

module.exports = router
```

# 六、解析body

#### 1.安装

```shell
npm i koa-body
```

#### 2.注册中间件

```js
// 改写 app/index.js
const Koa = require('koa')
// 导入包
const koaBody = require('koa-body');

const userRouter = require('../router/user.route')

const app = new(Koa)

// 注册中间件
app.use(koaBody()); 
app.use(userRouter.routes())

module.exports = app
```

#### 3.解析请求数据

```js
//改写`user.controller.js`文件
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = ctx.request.body
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

#### 4. 拆分service 层

service 层主要是做数据库处理

```js
// 创建`src/service/user.service.js`
class UserService {
  async createUser(user_name, password) {
    // todo: 写入数据库
    return 'success'
  }
}

module.exports = new UserService()
```

# 七、数据库操作

sequelize ORM 数据库工具

ORM: 对象关系映射

- 数据表映射(对应)一个类
- 数据表中的数据行(记录)对应一个对象
- 数据表字段对应对象的属性
- 数据表的操作对应对象的方法

#### 1.安装 sequelize mysql2

```shell
npm i mysql2 sequelize
```

```js
// 新建 src/db/seq.js
const { Sequelize } = require('sequelize')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
})

// 测试数据库连接 node seq.js
// 可能遇到的问题（引入变量名后，连接失败）：原因：注意 node 执行的目录，当前目录 // 下不能获取到 .env 的配置量，应该是在根目录下运行 node src/db/seq.js
// seq
//  .authenticate()
//  .then(() => {
//	  console.log('数据库连接成功')
//  })
//  .catch((err) => {
//    console.log('数据库连接失败', err)
//  })

module.exports = seq
```

改写 .env

```
// .env
APP_PORT=8000

MYSQL_DB = zdsc
MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PWD = 123456
```

# 八、创建User模型

#### 1.拆分Model层

sequlize 主要是通过Model 对应数据表

创建 src/model/user.model.js

```js
const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型 model
const User = seq.define('zd_users', {
  // 在这里定义模型属性 , id 会被sequelize 自动创建
  user_name: {
    type: DataTypes.STRING,
    allowNull: false, // 是否允许为空
    unique: true, // 唯一
    comment: '用户名，唯一，不为空'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，1-是 0-不是'
  }
}, {
  // 这是其他模型参数
});

// 强制同步数据库
// User.sync({force: true})

module.exports = User
```

# 九. 添加用户入库

所有数据库的操作都在 Service 层完成, Service 调用 Model 完成数据库操作

改写`src/service/user.service.js`

```js
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }
}

module.exports = new UserService()
```

同时, 改写`user.controller.js`

```js
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

# 十. 错误处理

在控制器中, 对不同的错误进行处理, 返回不同的提示错误提示, 提高代码质量

```js
const { createUser, getUerInfo } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body

    // 合法性
    if (!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      }
      return
    }
    // 合理性
    if (getUerInfo({ user_name })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: '',
      }
      return
    }
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

在 service 中封装函数

```js
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }

  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
```

# 十一. 拆分中间件

为了使代码的逻辑更加清晰, 我们可以拆分一个中间件层, 封装多个中间件函数

![流程图](https://invest-self.top/image-20210524154353520.png)

## 1 拆分中间件

添加`src/middleware/user.middleware.js`

```js
const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  if (getUerInfo({ user_name })) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
}
```

## 2 统一错误处理

- 在出错的地方使用`ctx.app.emit`提交错误
- 在 app 中通过`app.on`监听

编写统一的错误定义文件

```js
module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
}
```

## 3 错误处理函数

```js
module.exports = (err, ctx) => {
  let status = 500
  switch (err.code) {
    case '10001':
      status = 400
      break
    case '10002':
      status = 409
      break
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
}
```

改写`app/index.js`

```js
const errHandler = require('./errHandler')
// 统一的错误处理
app.on('error', errHandler)
```

# 十二. 加密

在将密码保存到数据库之前, 要对密码进行加密处理

123123abc (加盐) 加盐加密

## 1 安装 bcryptjs

```
npm i bcryptjs
```

## 2 编写加密中间件

```js
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}
```

## 3 在 router 中使用

改写`user.router.js`

```js
const Router = require('koa-router')

const {
  userValidator,
  verifyUser,
  crpytPassword,
} = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post('/login', login)

module.exports = router
```

# 十三. 登录验证

流程:

- 验证格式
- 验证用户是否存在
- 验证密码是否匹配

改写`src/middleware/user.middleware.js`

```js
const bcrypt = require('bcryptjs')

const { getUerInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  // if (await getUerInfo({ user_name })) {
  //   ctx.app.emit('error', userAlreadyExited, ctx)
  //   return
  // }
  try {
    const res = await getUerInfo({ user_name })

    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  // 1. 判断用户是否存在(不存在:报错)
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUerInfo({ user_name })

    if (!res) {
      console.error('用户名不存在', { user_name })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }

    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}
```

定义错误类型 err.type.js

```js
module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    result: '',
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    result: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: '',
  },
  invalidPassword: {
    code: '10006',
    message: '密码不匹配',
    result: '',
  },
}
```

改写路由

```js
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
```

# 十四. 用户的认证

登录成功后, 给用户颁发一个令牌 token, 用户在以后的每一次请求中携带这个令牌.

jwt: jsonwebtoken

- header: 头部
- payload: 载荷
- signature: 签名

## 1 颁发 token

### 1) 安装 jsonwebtoken

```
npm i jsonwebtoken
```

### 2) 在控制器中改写 login 方法

```js
// ....
async login(ctx, next){
  const { user_name } = ctx.request.body
  // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
  try {
    // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
    const { password, ...res } = await getUerInfo({ user_name })
    ctx.body = {
      code: 0,
      message: '用户登录成功',
      result: {
        token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
      },
    }
  } catch (err) {
    console.error('用户登录失败', err)
  }
}
```

### 3) 定义私钥

在`.env`定义

```
JWT_SECRET = xzd
```

## 2 用户认证

### 1) 创建 auth 中间件

```js
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError, invalidToken } = require('../constant/err.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  console.log(token)

  try {
    // user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }

  await next()
}

module.exports = {
  auth,
}
```

### 2) 改写 router

```js
// 修改密码接口
router.patch('/', auth, (ctx, next) => {
  console.log(ctx.state.user)
  ctx.body = '修改密码成功'
})
```

新的内容
