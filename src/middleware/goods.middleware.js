const {goodsFormateError} = require('../constants/err.type')
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

module.exports = {
  goodsValidator
}