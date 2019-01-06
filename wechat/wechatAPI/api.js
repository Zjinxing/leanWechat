const WechatAPI = require('co-wechat-api')
const appid = process.env.WX_APP_ID
const appsecret = process.env.WX_APP_SC

const api = new WechatAPI(appid, appsecret)

module.exports = api