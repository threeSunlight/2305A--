/***
 * 封装接口调用,把每个接口封装成单个函数,主要是为了方便后续修改接口和维护接口
 * 1. 引入request请求
 * 2. 封装成单个函数
 * CommonJS规范: 只能使用modules.exports导出和require引入
 */


 /**引入request请求函数 */
 const rquest = require('../utils/request')

 /**封装轮播图接口 */
 const bannerList = () => {
   return rquest('/banner/list','get')
 }

 /**店铺信息 */
const shop = () => {
  return rquest('/shop/subshop/list', 'POST')
}






 module.exports = {
  bannerList,
  shop
 }

