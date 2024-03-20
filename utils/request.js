/***
 * 1. wx.request是异步接口,容易造成异步回调地域
 * 2. 为了解决异步回调地狱问题,我们用es6新增的promise函数来解决他
 * 3. 因为小程序没有finaly方法,所以在原型添加finaly方法
 * 4. 我们在封装wx.request的时候,封装
 *    data,
 *    url,
 *    methods,
 *    timeout(超时时间,前端封装,后端也可以进行校验,),毫秒
 *    header封装返回数据类型和请求数据类型
 *    封装请求成功和失败的回调,complete回调函数(无论成功和失败都会触发的回调函数,准备一条后路)
 *    finaly我们自己封装到原型上,
 *    url: htttp:123.1234.222:8080/login 登录
 *    url: htttp:123.1234.222:8080/sys/user  角色
 * 
 * 少一个专属域名
 */
//baseUrl根目录
/**专属域名 
 * 上线以后不需要这个专属域名
 * 传true需要配置专属域名,false就不需要配置专属域名
*/
 const SubDomain = require('../config')
 // 在公司中,只需要修改needSubDomain,是否添加,其他的都不用动
 const request = (url, methods,data="", needSubDomain=true) => {
   let result = needSubDomain ? SubDomain.subDomain : ''
   let _url = SubDomain.baseUrl  + result  + url;
    return new Promise((resolve,reject) => {
        wx.request({
            url:_url,
            data: data,
            methods:methods,
            timeout: 60 * 1000,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(request){
              resolve(request)
            },
            fail(error) {
              reject(error)
            },
            complete(aaa) {

            }

        })
    })
 }
 //封装finaly方法
 /**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

// 导出
module.exports = request

/***
 * 总结: 封装request
 * 1. 使用new Promise函数封装wx.request方法,封装了url,methods,data,timeout超时时间,以及请求头请求参数的封装,我们又封装了成功回调和失败回调,定制专属域名
 * 2. 我们又在promise的原型上扩展了一个finally函数,无论成功还是失败就进行回调
 */