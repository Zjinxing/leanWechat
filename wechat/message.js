const wechat = require('co-wechat')

const config = {
  appid: process.env.WX_APP_ID,
  token: process.env.TOKEN,
  encodingAESKey: process.env.EncodingAESKey,
}

const wechatConfig = wechat(config).middleware()

// 消息服务
const wechatMessageService = wechat(config).middleware(async (message, ctx) => {
  console.log('收到的消息:', message)
  const { MsgType, Event, EventKey, ScanCodeInfo } = message
  if (MsgType === 'event') {
    if (Event === 'subscribe') {
      return '终于等到你，还好没放弃'
    } else if (Event === 'CLICK') {
      if (EventKey === 'button1') {
        return '你点击了按钮一'
      }
    } else if (Event === 'scancode_waitmsg') {
      const { ScanType, ScanResult } = ScanCodeInfo
      return `
      扫描类型：${ScanType}
      扫码结果：${ScanResult}
      `
    } else {
      return '其他定义菜单事件'
    }
  } else if (MsgType === 'text') {
    return '普通文本消息'
  } else if (MsgType === 'image') {
    return {
      type: 'image',
      content: {
        mediaId: message.MediaId,
      },
    }
  } else if (MsgType === 'voice') {
    return {
      type: 'voice',
      content: {
        mediaId: message.MediaId,
      },
    }
  } else if (MsgType === 'location') {
    return `您的位置：${message.Label}`
  }
  return '蓦然回首，那人却在灯火阑珊处'
})


module.exports = {
  wechatConfig,
  wechatMessageService,
}
