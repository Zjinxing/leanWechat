const Router = require('koa-router')

const api = require('../wechat/wechatAPI/api.js')

const router = new Router({prefix: '/wechatAPI'})

/********** 菜单管理 **********/

// 创建菜单
router.post('/createMenu', async ctx => {
  try {
    const { body } = ctx.request
    const { menus } = body
    const result = await api.createMenu(menus)
    ctx.body = result
  } catch (err) {
    ctx.body = err
  }
})

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

// 获取菜单
router.get('/getMenu', async ctx => {
  console.log('getMenu')
  try {
    const result = await api.getMenu()
    ctx.body = result
  } catch (err) {
    ctx.body = err
  }
})

/********** 标签管理 ***********/

// 获取标签
router.get('/getTags', async ctx => {
  try {
    ctx.body = await api.getTags()
  } catch (err) {
    ctx.body = err
  }
})

// 创建标签
router.post('/createTag', async ctx => {
  const body = ctx.request.body
  const name = body.name
  try {
    ctx.body = await api.createTags(name)
  } catch (err) {
    ctx.body = err
  }
})

// 编辑标签
router.post('/updateTag', async ctx => {
  const { body } = ctx.request
  const { id, name } = body
  try{
    ctx.body = api.updateTag(id, name) 
  } catch (err) {
    ctx.body = err
  }
})

// 删除标签
router.post('/deleteTag', async ctx => {
  const { body } = ctx.request
  const { id } = body
  try {
    console.log(`删除id为${id}的标签`)
    ctx.body = api.deleteTag(id)
  } catch (err) {
    ctx.body = err
  }
})

// 获取某个标签下的粉丝列表
router.get('/getUsersFromTag', async ctx => {
  const { tagId, nextOpenId } = ctx.query
  console.log(ctx.query)
  try {
    // console.log(`获取标签${tagId}下的用户`)
    ctx.body = await api.getUsersFromTag(tagId, nextOpenId)
  } catch (err) {
    ctx.body = err
  }
})

// 批量为用户打标签
// Content-Type: "application/json"
router.post('/batchTagging', async ctx => {
  const { body } = ctx.request
  const { openIdList, tagId } = body
  console.log(openIdList)
  try {
    ctx.body = await api.batchTagging(openIdList, tagId)
  } catch (err) {
    ctx.body = err
  }
})

// 批量为用户取消标签
router.post('/batchUnTagging', async ctx => {
  const { body } = ctx.request
  const { openIdList, tagId } = body
  try {
    ctx.body = await api.batchUnTagging(openIdList, tagId)
  } catch (err) {
    ctx.body = err
  }
})

// 获取用户身上的标签
router.post('/getIdList', async ctx => {
  const { body } = ctx.request
  const { openId } = body
  try {
    ctx.body = await api.getIdList(openId)
  } catch (err) {
    ctx.body = err
  }
})

/*********** 用户管理 ************/

// 获取所有用户列表
router.get('/getFollowers', async ctx => {
  const { nextOpenId } = ctx.query
  try {
    ctx.body = await api.getFollowers(nextOpenId)
  } catch (err) {
    ctx.body = err
  }
})

module.exports = router