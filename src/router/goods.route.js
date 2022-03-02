const Router = require('@koa/router');
// 实例化对象
const router = new Router({prefix: '/goods'});

const {auth, hadAdminPermission} = require('../middleware/auth.middleware')

const {upload} = require('../controller/goods.controller')

router.post('/upload', auth, hadAdminPermission, upload)

module.exports = router