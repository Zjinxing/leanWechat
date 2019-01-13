const appid = process.env.WX_APP_ID
const appsecret = process.env.WX_APP_SC
const Router = require('koa-router')
const router = new Router({ prefix: '/wechatAPI' })
const koa2Req = require('koa2-request')
const request = require('request')
const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`

function getToken() {
  return new Promise(async (resolve, reject) => {
    let res = await koa2Req(url)
    console.log(res.body)
    const data = JSON.parse(res.body)
    resolve(data.access_token)
  })
}

function addMaterail(accessToken, ctx) {
  var url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=image`
  var opts = {
    url: url,
    method: "post"
  }
  return new Promise(function (resolve, reject) {
    //使用ctx.req管道将ctx.req流导入到request 请求中
    ctx.req.pipe(request(opts, function (error, response, body) {
      if (error) {
        return reject(error);
      }
      resolve(body)
    }))
  })
}
router.post("/addMaterial", async (ctx, next) => {
  var accessToken = await getToken()
  try {
    var materailRes = await addMaterail(accessToken, ctx);
    ctx.body = materailRes;
  } catch (err) {
    ctx.body = err
  }
});

module.exports = router