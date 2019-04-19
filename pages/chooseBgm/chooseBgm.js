// pages/chooseBgm/chooseBgm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgmList:[],
    serverUrl:"",
    videoParams:{}
  },

  onLoad: function (params) {
    var me = this;
    console.log(params);
    me.setData({
      videoParams: params
    });

    wx.showLoading({
      title: '请等待...',
    });
    var serverUrl = app.serverUrl;
    //调用后端
    wx.request({
      url: serverUrl + '/bgm/list',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status == 200) {
         var bgmList = res.data.data;
         me.setData({
           bgmList: bgmList,
           serverUrl: serverUrl
         });
        }
      }
    })
  },

  upload: function(e){
    var me = this;

    var bgmId = e.detail.value.bgmId;
    var desc = e.detail.value.desc;

    console.log("bgmId:"+bgmId);
    console.log("desc:" + desc);

    var duration = me.data.videoParams.duration;
    var TemHeight = me.data.videoParams.TemHeight;
    var TmpWidth = me.data.videoParams.TmpWidth;
    var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;


    // 上传短视频
    wx.showLoading({
      title: '上传中...',
      mask: true
    })

    var serverUrl = app.serverUrl;
    
    wx.uploadFile({
      url: serverUrl + '/video/upload',
      formData:{
        userId: app.userInfo.id,
        bgmId: bgmId,
        desc: desc,
        videoSeconds: duration,
        videoHeigth: TemHeight,
        videoWidth: TmpWidth

      },
      filePath: tmpVideoUrl,
      name: 'file',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        var data = JSON.parse(res.data);
        wx.hideLoading();
        if (data.status == 200) {
          wx.showLoading({
            title: '上传中...',
          })
          wx.showToast({
            title: '上传成功!',
            icon: "success",
          });
          wx.navigateBack({
            delta: 1,
          })

          // var videoId=data.data;

          // wx.uploadFile({
          //   url: serverUrl + '/video/uploadCover',
          //   formData: {
          //     userId: app.userInfo.id,
          //     videoId: videoId,
          //   },
          //   filePath: tmpCoverUrl,
          //   name: 'file',
          //   header: {
          //     'content-type': 'application/json',
          //   },
          //   success: function (res) {
          //     var data = JSON.parse(res.data);
          //     wx.hideLoading();
          //     if (data.status == 200) {
          //       wx.showToast({
          //         title: '上传成功!',
          //         icon: "success",
          //       });
          //       wx.navigateBack({
          //         delta: 1,
          //       })
          //     } else {
          //       wx.showToast({
          //         title: '上传失败！',
          //         icon: none,
          //       })
          //     }
          //   }
          // })
         
        } else {
          wx.showToast({
            title: '上传失败！',
            icon: none,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})