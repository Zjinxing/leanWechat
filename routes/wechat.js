const Router = require('koa-router')
const { wechatConfig, wechatMessageService } = require('../wechat/message.js')

const router = new Router({ prefix: '/wechat' })

router.get('/', wechatConfig) // 用于服务器配置校验
router.post('/', wechatMessageService) // 微信公众平台消息接口服务

module.exports = router