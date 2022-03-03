const Goods = require('../model/goods.model')

class GoodsService {
  // 创建商品
  async create(data) {
    const res = await Goods.create(data)
    return res.dataValues
  }

  // 更新商品信息
  async update(id, data) {
    const res = await Goods.update(data, {where: {id}})
    return res[0] > 0 ? true : false
  }

  // 删除商品
  async remove(id) {
    const res = await Goods.destroy({where: {id}})
    return res[0] > 0 ? true : false
  }

  // 下架商品
  async offGoods(id) {
    const res = await Goods.destroy({where: {id}})
    return res > 0 ? true : false;
  }

  // 上架商品
  async restoreGoods(id){
    const res = await Goods.restore({where: {id}})
    return res > 0 ? true : false;
  }

  // 获取商品信息
  async getGoodsInfo(id) {
    // 连接数据库
    const whereOpt = {id}
    const res = await Goods.findOne({
      attributes: ['id', 'goods_name', 'goods_price', 'goods_img', 'goods_sizeNUm'],
      where: whereOpt
    })
    return res ? res.dataValues : null
  }

  // 获取商品列表
  async getGoodsList(pageNum, pageSize) {
    // 连接数据库
    // const res = await Goods.findAll(pageNum, pageSize)

    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }
}

module.exports = new GoodsService()