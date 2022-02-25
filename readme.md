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
npm i nodemon
```

编写package.json 脚本

```json
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

···

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
···
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

