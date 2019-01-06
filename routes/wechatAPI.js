const Router = require('koa-router')

const api = require('../wechat/wechatAPI/api.js')

const router = new Router({prefix: '/wechatAPI'})

/********** 菜单管理 **********/

// 删除菜单
router.get('/removeMenu', async ctx => {
  try {
    console.log('removeMenu')
    const result = await api.removeMenu()
    ctx.body = result
  } catch (err) {
    ctx.body = err
  }
})