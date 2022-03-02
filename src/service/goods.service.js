const Goods = require('../model/goods.model')

class GoodsService {
  async createGoods(data) {
    const res = await Goods.create(data)
    return res.dataValues
  }
}

module.exports = new GoodsService()