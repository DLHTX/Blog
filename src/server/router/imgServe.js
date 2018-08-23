const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'JOrhoFGtDf-LE-8PtxefHByyfJGCeFpL6KOo3miw'
const secretKey = 'oCvvrhxLw346G2-sJDCc9YkPvR69sbdQiq1tav8W'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'blog-usericon',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}