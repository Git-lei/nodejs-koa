module.exports = {
  // 用户报错
  userFormatError: {
    code: "10001",
    message: "用户名或者密码为空！",
    result: ""
  },
  userAlreadyExisted: {
    code: '10002',
    message: '用户存在！',
    result: ''
  },
  userRegistError: {
    code: '10003',
    message: '用户注册出现错误！',
    result: ''
  },
  userUnExist: {
    code: '10004',
    message: '用户不存在！',
    result: ''
  },
  userLoginError: {
    code: '10005',
    message: '用户登录出现错误！',
    result: ''
  },
  userPasswordInvalided: {
    code: '10006',
    message: '密码无效！',
    result: ''
  },
  TokenExpiredError: {
    code: '10101',
    message: 'token已过期！',
    result: ''
  },
  invalidTokenError: {
    code: '10102',
    message: '无效的token！',
    result: ''
  },
  hadAdminPermissionError:{
    code: '10103',
    message: '权限不足！',
    result: ''
  },
  // 操作报错
  fileUploadError:{
    code: '10201',
    message: '图片上传失败！',
    result: ''
  },
  fileUnsurportError:{
    code: '10202',
    message: '文件类型不支持！',
    result: ''
  },
  // 商品相关报错
  goodsFormateError:{
    code: '10301',
    message: '商品数据格式错误！',
    result: ''
  },
  createGoodsError:{
    code: '10302',
    message: '商品创建失败！',
    result: ''
  },
  updateGoodsError:{
    code: '10303',
    message: '商品信息更新失败！',
    result: ''
  },
  getGoodsListError:{
    code: '10315',
    message: '获取商品列表失败！',
    result: ''
  },
  goodsUnExistError:{
    code: '10304',
    message: '商品不存在！',
    result: ''
  },
  goodsQueryError:{
    code: '10305',
    message: '查询商品失败！',
    result: ''
  },
  removeGoodsError:{
    code: '10306',
    message: '删除商品失败！',
    result: ''
  },
  offGoodsError:{
    code: '10307',
    message: '下架商品失败！',
    result: ''
  },
  restoreGoodsError:{
    code: '10308',
    message: '上架商品失败！',
    result: ''
  },
  invalidGoodsID: {
    code: '10309',
    message: '无效的商品id',
    result: '',
  },
}