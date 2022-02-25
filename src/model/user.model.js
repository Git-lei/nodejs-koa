const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型 model
const User = seq.define('zd_users', {
  // 在这里定义模型属性 , id 会被sequelize 自动创建
  user_name: {
    type: DataTypes.STRING,
    allowNull: false, // 是否允许为空
    unique: true, // 唯一
    comment: '用户名，唯一，不为空'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，1-是 0-不是'
  }
}, {
  // 这是其他模型参数
});

// 强制同步数据库
// User.sync({force: true})

module.exports = User