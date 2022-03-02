const Router = require('@koa/router');
// 实例化对象
const router = new Router({prefix: '/goods'});

const {upload} = require('../controller/goods.controller')

router.post('/upload',upload)

module.exports = router