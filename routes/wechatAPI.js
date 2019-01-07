const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

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

// 设置用户备注名
router.post('/updateRemark', async ctx => {
  const body = ctx.request
  const { openid, remark } = body
  try {
    ctx.body = await api.updateRemark(openid, remark)
  } catch (err) {
    ctx.body = err
  }
})

// 获取用户基本信息
router.get('/getUser', async ctx => {
  const options = ctx.query
  // console.log(options)  
  try {
    ctx.body = await api.getUser(options)
  } catch (err) {
    ctx.body = err
  }
})

// 批量获取用户信息
router.post('/batchGetUsers', async ctx => {
  const { body } = ctx.request
  const { openids } = body
  try {
    // console.log(body)
    ctx.body = await api.batchGetUsers(openids)
  } catch (err) {
    ctx.body = err
  }
})

/*********** 消息管理 ***********/

// 客服消息，发送文字消息
router.post('/sendText', async ctx => {
  const { body } = ctx.request
  const { openid, text } = body
  try {
    ctx.body = await api.sendText(openid, text)
  } catch (err) {
    ctx.body = err
  }
})

// 客服消息，发送图片
router.post('/sendImage', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId } = body
  try {
    ctx.body = await api.sendImage(openid, mediaId)
  } catch (err) {
    ctx.body = err
  }
})

// 客服消息，发送卡券
router.post('/sendCard', async ctx => {
  const { body } = ctx.request
  const { openid, card_id } = body
  try {
    ctx.body = await api.sendCard(openid, card_id)
  } catch (err) {
    ctx.body = err
  }
})

// 客服消息，发送语音消息
router.post('/sendVoice', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId } = body
  try {
    ctx.body = await api.sendVoice(openid, mediaId)
  } catch (err) {
    ctx.body = err
  }
})

// 客服消息，发送音乐消息
router.post('/sendVoice', async ctx => {
  const { body } = ctx.request
  const { openid, music } = body
  try {
    ctx.body = await api.sendVoice(openid, music)
  } catch (err) {
    ctx.body = err
  }
})

// 客服消息，发送视频消息
router.post('/sendVoice', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId, thumbMediaId } = body
  try {
    ctx.body = await api.sendVoice(openid, mediaId, thumbMediaId)
  } catch (err) {
    ctx.body = err
  }
})

// 客服消息，发送图文消息
router.post('/sendVoice', async ctx => {
  const { body } = ctx.request
  const { openid, articles } = body
  try {
    ctx.body = await api.sendVoice(openid, articles)
  } catch (err) {
    ctx.body = err
  }
})

// 获取公众号自动回复规则
router.get('/getAutoreply', async ctx => {
  try {    
    ctx.body = await api.getAutoreply()
  } catch (err) {
    ctx.body = err
  }
})

/************* 群发消息 *************/

// 上传图文
router.post('/uploadNews', async ctx => {
  const { body } = ctx.request
  const { news } = body
  try {
    ctx.body = await api.uploadNews(news)
  } catch (err) {
    ctx.body = err
  }
})

// 群发图文消息
router.post('/massSendNews', async ctx => {
  const { body } = ctx.request
  const { mediaId, receivers } = body 
  try {
    ctx.body = await api.massSendText(mediaId, receivers)
  } catch (err) {
    ctx.body = err
  }
})

// 群发文本消息
router.post('/massSendText', async ctx => {
  const { body } = ctx.request
  const { content, receivers } = body
  try {
    ctx.body = await api.massSendText(content, receivers)
  } catch (err) {
    ctx.body = err
  }
})

/*************** 素材管理 *************/

// 上传图片

router.post('/uploadImageMaterial', async ctx => {
  const file = ctx.request.files.file
  console.log(file)
  const mypath = path.resolve(`${file.name}`)
  console.log(mypath)
  try {
    ctx.body = await api.uploadImageMaterial(mypath)
  } catch (err) {
    ctx.body = err
  }
})

// upload Test
router.post('/upload', ctx => {
  const file = ctx.request.files.file
  console.log(file)
})

module.exports = router