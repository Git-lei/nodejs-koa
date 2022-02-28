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

