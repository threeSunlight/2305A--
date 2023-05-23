const WXAPI = require('../wxapi/main')

/**
 * type: order 支付订单 recharge 充值 paybill 优惠买单
 * data: 扩展数据对象，用于保存参数
 */
function wxpay(type, money, orderId, redirectUrl, data) {
  let remark = "在线充值";
  let nextAction = {};
  if (type === 'order') {
    remark = "支付订单 ：" + orderId;
    nextAction = {
      type: 0,
      id: orderId
    };
  }
  if (type === 'paybill') {
    remark = "优惠买单 ：" + data.money;
    nextAction = {
      type: 4,
      uid: wx.getStorageSync('uid'),
      money: data.money
    };
  }
  /**
   * 第一步: 调用我们自己后台的接口,传递token,金额,以及其他购物信息,请求成功后,接口给我们返回支付时间戳,随机字符串,prepay_id,支付签名
   * 第二步: 当我们自己的后台接口返回成功的时候,调用wx.requestPayment方法(wx.requestPayment是微信内部自带的api),传后台接口给我们返回的时间戳,随机字符串,prepay_id,还有加密方式,以及支付签名
   * 第三步: 根据支付的成功和失败,弹出支付结果
   */
  WXAPI.wxpay({
    token: wx.getStorageSync('token'),
    money: money,
    remark: remark,
    payName: remark,
    nextAction: JSON.stringify(nextAction)
  }).then(function (res) {
    if (res.code == 0) {
      // 发起支付
      /**后台返回的支付时间戳,支付随机数,返回perpay_id,确定加密方式,微信支付签名*/
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: 'prepay_id=' + res.data.prepayId,
        signType: 'MD5',
        paySign: res.data.sign,
        fail: function (aaa) {
          wx.showToast({
            title: '支付失败:' + aaa
          })
        },
        success: function () {
          // 保存 formid
          WXAPI.addTempleMsgFormid({
            token: wx.getStorageSync('token'),
            type: 'pay',
            formId: res.data.prepayId
          })
          // 提示支付成功
          wx.showToast({
            title: '支付成功'
          })
          wx.redirectTo({
            url: redirectUrl
          });
        }
      })
    } else {
      wx.showModal({
        title: '出错了',
        content: res.code + ':' + res.msg + ':' + res.data,
        showCancel: false,
        success: function (res) {

        }
      })
    }
  })
}

module.exports = {
  wxpay: wxpay
}