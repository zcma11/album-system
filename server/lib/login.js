const db = require('./db')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

module.exports = async ctx => {
  const { username, password } = ctx.request.body
  const sql = 'select * from `user_db`.user where `username`=? and `password`=?'

  const [[user]] = await db.getDB().query(sql, [username, password])
  console.log(user)
  if (user) {
    const token = jwt.sign({ uid: user.id }, SECRET, { expiresIn: '2h' })

    ctx.body = {
      data: { token },
      status: 1,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      status: 0,
      msg: '登录失败'
    }
  }
}
