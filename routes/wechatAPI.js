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

// 群发声音消息
router.post('/massSendVoice', async ctx => {
  const { body } = ctx.request
  const { mediaId, receivers } = body
  try {
    ctx.body = await api.massSendVoice(mediaId, receivers)
  } catch (err) {
    ctx.body = err
  }
})

// 群发图片消息
router.post('/massSendImage', async ctx => {
  const { body } = ctx.request
  const { mediaId, receivers } = body
  try {
    ctx.body = await api.massSendImage(mediaId, receivers)
  } catch (err) {
    ctx.body = err
  }
})

// 群发视频消息
router.post('/massSendVideo', async ctx => {
  const { body } = ctx.request
  const { mediaId, receivers } = body
  try {
    ctx.body = await api.massSendVideo(mediaId, receivers)
  } catch (err) {
    ctx.body = err
  }    
})

// 删除群发消息
router.post('/deleteMass', async ctx => {
  const { body } = ctx.request
  const { message_id } = body
  try {
    ctx.body = await api.deleteMass(message_id)
  } catch (err) {
    ctx.body = err
  }    
})

// 预览图文消息
router.post('/previewNews', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId } = body
  try {
    ctx.body = await api.previewNews(openid, mediaId)
  } catch (err) {
    ctx.body = err
  }    
})

// 预览声音消息
router.post('/previewVoice', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId } = body
  try {
    ctx.body = await api.previewVoice(openid, mediaId)
  } catch (err) {
    ctx.body = err
  }    
})

// 预览图片消息
router.post('/previewImage', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId } = body
  try {
    ctx.body = await api.previewImage(openid, mediaId)
  } catch (err) {
    ctx.body = err
  }    
})

// 预览视频消息
router.post('/previewVideo', async ctx => {
  const { body } = ctx.request
  const { openid, mediaId } = body
  try {
    ctx.body = await api.previewVideo(openid, mediaId)
  } catch (err) {
    ctx.body = err
  }    
})

// 预览文本消息
router.post('/previewText', async ctx => {
  const { body } = ctx.request
  const { openid, content } = body
  try {
    ctx.body = await api.previewText(openid, content)
  } catch (err) {
    ctx.body = err
  }    
})

/*************** 模版消息 **************/

// 设置所属行业
router.post('/setIndustry', async ctx => {
  const { body } = ctx.request
  const { industry } = body
  try {
    ctx.body = await api.setIndustry(industry)
  } catch (err) {
    ctx.body = err
  }
})

// 获得模版id
router.post('/addTemplate', async ctx => {
  const { body } = ctx.request
  const { templateIdShort } = body
  try {
    ctx.body = await api.addtemplate(templateIdShort)
  } catch (err) {
    ctx.body = err
  }
})

// 发送模版消息
router.post('/sendTemplate', async ctx => {
  const { body } = ctx.request
  const { openid, templateId, url, topColor, data } = body
  try {
    ctx.body = await api.sendTemplate(openid, templateId, url, topColor, data)
  } catch (err) {
    ctx.body = err
  }
})


/*************** 素材管理 *************/

// 上传永久素材
router.post('/uploadMaterial', async ctx => {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  let filepath = path.resolve(file.name)
  const type = file.type
  const upStream = fs.createWriteStream(filepath);
  reader.pipe(upStream)
  // console.log('文件路径',filepath)
  try {
    ctx.body = await api.uploadMaterial(filepath, type)
  } catch (err) {
    ctx.body = err
  }
})

// 上传图片
router.post('/uploadImageMaterial', async ctx => {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  let filepath = path.resolve(file.name)
  const upStream = fs.createWriteStream(filepath);
  reader.pipe(upStream)
  // console.log('文件路径',filepath)
  try {
    ctx.body = await api.uploadThumbMaterial(filepath)
  } catch (err) {
    ctx.body = err
  }
})

// 上传声音素材
router.post('/uploadVoiceMaterial', async ctx => {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  let filepath = path.resolve(file.name)
  const upStream = fs.createWriteStream(filepath);
  reader.pipe(upStream)
  try {
    ctx.body = await api.uploadThumbMaterial(filepath)
  } catch (err) {
    ctx.body = err
  }
})

// 上传缩略图
router.post('/uploadThumbMaterial', async ctx => {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  let filepath = path.resolve(file.name)
  const upStream = fs.createWriteStream(filepath);
  reader.pipe(upStream)
  try {
    ctx.body = await api.uploadThumbMaterial(filepath)
  } catch (err) {
    ctx.body = err
  }
})

// 上传视频永久素材
router.post('/uploadVideoMaterial', async ctx => {
  const { body } = ctx.request
  const { description } = body
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  const filepath = path.resolve(file.name)
  const upStream = fs.createWriteStream(filepath)
  reader.pipe(upStream)
  try {
    ctx.body = await api.uploadVideoMaterial(filepath, description)
  } catch (err) {
    ctx.body = err
  }
})

// 上传图文永久素材
router.post('/uploadNewsMaterial', async ctx => {
  const { body } = ctx.request
  const { news } = body
  try {
    ctx.body = await api.uploadNewsMaterial(news)
  } catch (err) {
    ctx.body = err
  }
})

// 获取永久素材
router.post('/getMaterial', async ctx => {
  const { body } = ctx.request
  const { mediaId } = body
  try {
    ctx.body = await api.getMaterial(mediaId)
  } catch (err) {
    ctx.body = err
  }
})

// 删除永久素材
router.post('/removeMaterial', async ctx => {
  const { body } = ctx.request
  const { mediaId } = body
  try {
    ctx.body = await api.removeMaterial(mediaId)
  } catch (err) {
    ctx.body = err
  }
})

// 获取素材总数
router.get('/getMaterialCount', async ctx => { 
  try {
    ctx.body = await api.getMaterialCount()
  } catch (err) {
    ctx.body = err
  }
})

// 获取素材列表
router.post('/getMaterials', async ctx => {
  const { body } = ctx.request
  const { type, offset, count } = body
  try {
    ctx.body = await api.getMaterials(type, offset, count)
  } catch (err) {
    ctx.body = err
  }
})


module.exports = router