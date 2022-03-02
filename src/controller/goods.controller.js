const path = require('path')
const {fileUploadError,fileUnsurportError} = require('../constants/err.type')

class GoodsController {
  async upload(ctx, next) {
    const {file} = ctx.request.files
    const fileTypes = ['image/jpeg','image/png']
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
}

module.exports = new GoodsController()