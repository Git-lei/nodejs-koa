const Router = require('@koa/router');

const router = new Router({prefix: '/users'});
// get '/users/*****'  perfix 进行了处理

router.get('/',(ctx,next)=>{
  ctx.body = 'sss'
})

module.exports = router