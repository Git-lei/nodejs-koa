const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型 model
const Goods = seq.define('zd_goods', {
  // 在这里定义模型属性 , id 会被sequelize 自动创建
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false, // 是否允许为空
    unique: true, // 唯一
    comment: '商品名，唯一，不为空'
  },
  goods_price: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '价格'
  },
  goods_sizeNUm: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    defaultValue: 0,
    comment: '库存'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片'
  }
}, {
  // 这是其他模型参数
});

// 强制同步数据库
// Goods.sync({force: true})

module.exports = Goods