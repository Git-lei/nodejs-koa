const Goods = require('../model/goods.model')

class GoodsService {
  async create(data) {
    const res = await Goods.create(data)
    return res.dataValues
  }

  async update(id, data) {
    const res = await Goods.update(data, {where: {id}})
    return res[0] > 0 ? true : false
  }
}

module.exports = new GoodsService()