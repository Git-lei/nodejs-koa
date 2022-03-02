const {goodsFormateError, goodsUnExistError, goodsQueryError} = require('../constants/err.type')
const {getGoodsInfo} = require('../service/goods.service')

// 商品信息 校验
const goodsValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {type: 'string', required: true},
      goods_price: {type: 'number', required: true},
      goods_sizeNUm: {type: 'number', required: true},
      goods_img: {type: 'string', required: true},
    })
  } catch (err) {
    goodsFormateError.result = err.errors
    return ctx.app.emit('error', goodsFormateError, ctx)
  }
  await next()
}

// 商品id 是否存在 校验
const goodsIdValidator = async (ctx, next) => {
  try {
    const res = await getGoodsInfo(ctx.params.id)
    if (!res) {
      console.error('商品不存在', ctx.params.id)
      // 商品不存在
      ctx.app.emit('error', goodsUnExistError, ctx)
      return
    }
  } catch (e) {
    ctx.app.emit('error', goodsQueryError, ctx)
  }
  await next()
}

module.exports = {
  goodsValidator, goodsIdValidator
}