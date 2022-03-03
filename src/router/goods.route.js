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
  removeGoods,
  offGoods,
  restoreGoods,
  getGoodsList
} = require('../controller/goods.controller')

// 图片上传
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品
router.post('/', auth, hadAdminPermission, goodsValidator, createGoods)

// 修改商品信息
router.put('/update/:id', auth, hadAdminPermission, goodsIdValidator, updateGoods)

// 删除商品 （model 模型中 添加了paranoid 配置，删除商品的形式 变为了软删除，即下架商品）
// router.delete('/delete/:id', auth, hadAdminPermission, goodsIdValidator, removeGoods)

// 下架商品
router.post("/:id/off", auth, hadAdminPermission, offGoods)

//上架商品
router.post("/:id/on", auth, hadAdminPermission, restoreGoods)

// 商品列表
router.get('/',getGoodsList)

module.exports = router