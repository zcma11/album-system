const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const db = require('./lib/db')
const login = require('./lib/login')
const jwt = require('koa-jwt')
const { SECRET } = require('./lib/config')
db.initDB()

const app = new Koa()
app.use(async (ctx, next) => {
  await next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = '账号异常'
    } else {
      throw err
    }
    console.log(err)
  })
})
app.use(jwt({ secret: SECRET }).unless({ path: [/^\/login/] }))

const router = new Router()
router.post('/login', koaBody(), login)

app.use(router.routes())
app.listen(3000, () => {
  console.log('连接成功')
})
