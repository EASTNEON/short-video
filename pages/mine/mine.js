// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceUrl: "../resource/images/noneface.png"
  },

  changeFace:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);

        wx.showLoading({
          title: '上传中...',
        })
        var serverUrl = app.serverUrl; 
        wx.uploadFile({
          url: serverUrl + '/user/uploadFace?userId=' + app.userInfo.id,
          filePath: tempFilePaths[0],
          name: 'file',
          header:{
            'content-type': 'application/json',
          },
          success: function (res) {
            var data = res.data;
            console.log(data);
            wx.hideLoading();
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功!~~',
                icon: "success",
              })
          }
          }
        })
      }
    })
  },

  logout:function(){
    var user = app.userInfo;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待...',
    })
    wx.request({
      url: serverUrl + '/logout?userId=' + user.id,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        var status = res.data.status;
        if (status == 200) {
          wx.showToast({
            title: '注销成功!',
            icon: 'success',
            duration: 2000
          }),
          app.userInfo = null;
          //页面跳转
          wx.navigateTo({
            url: '../userLogin/login',
          })
        } 
      }

    })
  }

  
})