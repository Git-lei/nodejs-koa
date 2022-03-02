const path = require('path')
const {fileUploadError, fileUnsurportError, createGoodsError} = require('../constants/err.type')

const {createGoods} = require('../service/goods.service')

class GoodsController {
  // 上传图片
  async upload(ctx, next) {
    const {file} = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/png']
    if (!fileTypes.includes(file.type)) {
      return ctx.app.emit('error', fileUnsurportError, ctx)
    }
    if (file) {
      ctx.body = {
        code: '0',
        message: '上传成功！',
        result: {
          imgSrc: path.basename(file.path)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  // 创建商品
  async createGoods(ctx, next) {
    // 调用service 的 createGoods 方法
    try {
      const res = await createGoods(ctx.request.body)
      // 返回结果
      ctx.body = {
        code: 0,
        result: res,
        message: '商品添加成功'
      }
    } catch (e) {
      createGoodsError.result = e.errors
      ctx.app.emit('error', createGoodsError, ctx)
    }


  }
}

module.exports = new GoodsController()