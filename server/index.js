const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const db = require('./lib/db')
const login = require('./lib/login')
const upload = require('./lib/upload')
const getphotos = require('./lib/getphotos')
const getphoto = require('./lib/getphoto')
const jwt = require('koa-jwt')
const { SECRET } = require('./lib/config')
const path = require('path')
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

app.use(koaStatic(path.join(__dirname, '/static')))
app.use(koaBody({ multipart: true, formidable: { keepExtensions: true } }))
app.use(jwt({ secret: SECRET }).unless({ path: [/^\/login/] }))

const router = new Router()
router.post('/login', login)
router.post('/upload', upload)
router.get('/getphotos', getphotos)
router.get('/getphoto', getphoto)

app.use(router.routes())
app.listen(3000, () => {
  console.log('连接成功')
})
