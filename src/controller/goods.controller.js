const path = require('path')
const {
  fileUploadError,
  fileUnsurportError,
  createGoodsError,
  invalidGoodsID,
  updateGoodsError,
  removeGoodsError,
  offGoodsError,
  restoreGoodsError,
  getGoodsListError
} = require('../constants/err.type')

const {
  create,
  update,
  remove,
  offGoods,
  restoreGoods,
  getGoodsList
} = require('../service/goods.service')

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

  async getGoodsList(ctx){
    try {
      // 1. 解析pageNum和pageSize
      const { pageNum = 1, pageSize = 10 } = ctx.request.query
      // 2. 调用数据处理的相关方法
      const res = await getGoodsList(pageNum, pageSize)      // 返回结果
      ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res
      }
    } catch (e) {
      ctx.app.emit('error', getGoodsListError, ctx)
    }
  }

  // 删除商品
  async removeGoods(ctx) {
    try {
      const res = await remove(ctx.params.id)
      // 返回结果
      ctx.body = {
        code: 0,
        message: '商品删除成功',
        result: ''
      }
    } catch (e) {
      ctx.app.emit('error', removeGoodsError, ctx)
    }
  }

  //下架商品
  async offGoods(ctx) {
    try {
      // 返回结果
      const res = await offGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '商品下架成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx)
      }
    } catch (e) {
      ctx.app.emit('error', offGoodsError, ctx)
    }
  }

  // 上架商品
  async restoreGoods(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    } catch (e) {
      return ctx.app.emit('error', restoreGoodsError, ctx)
    }

  }
}

module.exports = new GoodsController()