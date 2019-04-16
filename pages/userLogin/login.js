// pages/userLogin/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  doLogin:function(e){
    var me = this;
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;

    //简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名密码不能为空',
        icon: 'none',
        duration: 3000
      })
    }else{
        var serverUrl = app.serverUrl;
        wx.showLoading({
          title: '请等待...',
        })
        //调用后端
        wx.request({
          url: serverUrl + '/login',
          method: 'POST',
          data:{
            username:username,
            password:password
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:function(res){
            console.log(res.data);
            wx.hideLoading();
            if(res.data.status == 200){
              //登录成功跳转
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              });
              app.userInfo = res.data.data;
              //页面跳转
              wx.navigateTo({
                url: '../mine/mine',
              })
            } else if (res.data.status == 500) {
              //失败弹出框
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
    }
  },
  goRegistPage:function(){
    wx.navigateTo({
      url: '../userRegist/regist',
    })
  }
})