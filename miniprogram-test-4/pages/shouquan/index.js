//index.js
//获取应用实例
// const app = getApp()

// Page({
//   bindGetUserInfo(res) {
//     let info = res;
//     console.log(info);
//     if (info.detail.userInfo) {
//       console.log("点击了同意授权");
//       wx.login({
//         success: function (res) {
//           if (res.code) {
//             wx.request({
//               url: 'http://www.test.com/test',
//               data: {
//                 code: res.code,
               
//               },
//               header: {
//                 'content-type': 'application/json' // 默认值
//               },
//               success: function (res) {
           
//               }
//             })
//           } else {
//             console.log("授权失败");
//           }
//         },
//       })

//     } else {
//       console.log("点击了拒绝授权");
//     }
//   }  
// })



const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // var that = this;
    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           //从数据库获取用户信息
    //           that.queryUsreInfo();
    //           //用户已经授权过
    //           wx.navigateTo({
               
    //             url: '/pages/logs/logs'
    //           })
    //         }
    //       });
    //     }
    //   }
    // })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'http://hg.airyee.com/tools/small_program.ashx?action=get_user_openid',
              
              method: 'POST',
              data: {
                code: res.code,

              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {

              }
            })
          } else {
            console.log("授权失败");
          }
        },
      });
      //授权成功后，跳转进入小程序首页
      wx.navigateTo({
      
        url: '/pages/logs/logs'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法体验小程序大部分功能，请授权之后进行账号绑定!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    
  },

})
