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

```
npm run dev  // 启动dev调试
```

