const db = require('./db')
const fs = require('fs')
const path = require('path')

module.exports = async ctx => {
  const { img } = ctx.request.files
  const pathName = generatePathName(img.name)
  console.log(pathName, img.name, ctx.state)
  writeImgToUpload(img, pathName)

  const [row] = await insertDB({
    imgUrl: `http://localhost:3000${pathName}`,
    name: img.name,
    uid: ctx.state.user.uid
  })

  if (row.affectedRows === 1) {
    ctx.body = '上传成功'
  } else {
    ctx.body = '上传失败'
  }
}

async function insertDB({ imgUrl, name, uid }) {
  const sql = 'insert into photos (imgUrl, name, uid) values (?,?,?)'
  return await db.getDB().execute(sql, [imgUrl, name, uid])
}

function generatePathName(imgName) {
  // koa-static 路径不能带 static
  return `/upload/${Date.now()}_${imgName}`
}

function writeImgToUpload(img, url) {
  const readStream = fs.createReadStream(img.path)
  const writeStream = fs.createWriteStream(
    path.join(__dirname, '../static', url)
  )
  readStream.pipe(writeStream)
}
