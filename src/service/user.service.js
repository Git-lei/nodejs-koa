class UserService {
  async createUser (user_name,password){
    // todo: 写入数据库
    return 'success'
  }
}

module.exports = new UserService()