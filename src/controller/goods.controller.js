class GoodsController {
  async upload(ctx, next) {
    ctx.body='success'
  }
}

module.exports = new GoodsController()