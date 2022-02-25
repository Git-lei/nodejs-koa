const {Sequelize} = require('sequelize')

const {MYSQL_DB,MYSQL_HOST,MYSQL_USER,MYSQL_PWD} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

// seq.authenticate().then(()=>{
//   console.log('sql success')
// }).catch(err=>{
//   console.log('sql failed',err)
// })

module.exports = seq