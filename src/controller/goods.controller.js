const path = require('path')
const {fileUploadError, fileUnsurportError, createGoodsError, updateGoodsError} = require('../constants/err.type')

const {create, update} = require('../service/goods.service')

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
    // 调用service 的 create 方法
    try {
      const res = await create(ctx.request.body)
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

  // 更新商品信息
  async updateGoods(ctx, next) {
    console.log(ctx.request.body)
    try {
      const res = await update(ctx.params.id, ctx.request.body)
      // 返回结果
        ctx.body = {
          code: 0,
          message: '商品信息更新成功',
          result: ''
        }
    } catch (e) {
      ctx.app.emit('error', updateGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()