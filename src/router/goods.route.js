const Router = require('@koa/router');
// 实例化对象
const router = new Router({prefix: '/goods'});

const {auth, hadAdminPermission} = require('../middleware/auth.middleware')
const {goodsValidator} = require('../middleware/goods.middleware')
const {upload} = require('../controller/goods.controller')

// 图片上传
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品
router.post('/', auth, hadAdminPermission, goodsValidator,(ctx,next)=> {ctx.body='111'})

module.exports = router