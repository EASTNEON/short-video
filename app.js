//app.js
App({
  serverUrl:"http://172.20.92.85:8081",
  //serverUrl:"http://172.20.10.9:8081",
  userInfo:null,

  setGlobalUserInfo: function(user) {
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  }
})