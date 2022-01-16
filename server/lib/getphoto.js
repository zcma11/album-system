const db = require('./db')

module.exports = async ctx => {
  const uid = ctx.state.user.uid
  const { id } = ctx.query

  const sql = 'select * from `user_db`.photos where id=? and uid=?'

  const [[row]] = await db.getDB().execute(sql, [id, uid])

  ctx.body = {
    status: 1,
    data: row
  }
}
