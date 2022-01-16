const db = require('./db')

module.exports = async ctx => {
  console.log(ctx.state.user.uid)
  const id = ctx.state.user.uid
  const sql = 'select * from `user_db`.photos where uid=?'
  const [photos] = await db.getDB().execute(sql, [id])

  console.log(photos)
  ctx.body = {
    status: 1,
    data: photos
  }
}
