// pages/index/index.js
/**使用封装的api接口的时候,如何调用
 * 一个函数只干一件事
 * 1. 引入
 */
const WXAPI = require('../../api/api')
console.log(WXAPI);

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 调用轮播图 
   * */
  bannerLists() {
    WXAPI.bannerList().then((res) => {
      console.log(res, 'bannerist的列表');
    })
  },

  /**
   * 调用店铺信息
   * 
   */
  shops() {
    WXAPI.shop().then(res => {
      console.log(res, '店铺信息');
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.bannerLists()
    this.shops()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})