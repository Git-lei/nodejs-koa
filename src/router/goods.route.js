const Router = require('@koa/router');
// 实例化对象
const router = new Router({prefix: '/goods'});

const {
  auth,
  hadAdminPermission
} = require('../middleware/auth.middleware')
const {
  goodsValidator,
  goodsIdValidator
} = require('../middleware/goods.middleware')
const {
  upload,
  createGoods,
  updateGoods,
  removeGoods
} = require('../controller/goods.controller')

// 图片上传
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品
router.post('/', auth, hadAdminPermission, goodsValidator, createGoods)

// 修改商品信息
router.put('/update/:id', auth, hadAdminPermission, goodsIdValidator, updateGoods)

// 删除商品
router.delete('/delete/:id', auth, hadAdminPermission, goodsIdValidator, removeGoods)

module.exports = router