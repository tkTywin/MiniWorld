var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        app.isAu = wx.getStorageSync('isAu');
        if (app.isAu) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              app.g_status = '未授权';
              //用户已经授权过
              wx.switchTab({
                url: '/pages/component/found/found'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.g_status = '已授权';
      //插入登录的用户的相关信息到数据库
      /*wx.request({
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        }
      });*/

      wx.redirectTo({
        url: '/pages/component/mine/jwnet/jwnet'
      })
    } else {
      app.g_status = '未授权';
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    /*wx.request({
      url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })*/
  },

})