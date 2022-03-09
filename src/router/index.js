const {staticDir} = require('../config/config.default')

const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')
const router = new Router()

router.get('/', (ctx, next) => {
  // const files = fs.readdirSync('./src/www')
  // let fileArr = []
  // files.forEach((item,index)=>{
  //   fileArr.push(item.slice(0,item.indexOf('.')));
  // })

  const filePath = path.join(staticDir, "index.html");
  const htmlContent = fs.readFileSync(filePath);
  ctx.type = "html";
  ctx.body = htmlContent;

})

fs.readdirSync(__dirname).forEach(item => {
  if (item !== 'index.js') {
    let r = require('./' + item)
    router.use(r.routes())
  }
})

module.exports = router
