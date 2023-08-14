// pages/rssManage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remoterss_config: '', // 初始的远程站点配置为空
    items:wx.getStorageSync("Sites")
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ items: wx.getStorageSync("Sites")})
    const remoteConfig = wx.getStorageSync('remoterss_config');
    if (remoteConfig) {
      this.setData({
        remoterss_config: remoteConfig
      });
    }
  
  },

  addSite:function(){
    wx.redirectTo({
      url: '/pages/rssManage/edit',
    })
  },

  handleRemoteInput: function (event) {
    this.setData({
      remoterss_config: event.detail.value
    });
  },

  saveRemoteConfig: function () {
    const remoteURL = this.data.remoterss_config;
    // 将远程站点配置保存到本地存储
    wx.setStorageSync('remoterss_config', remoteURL);
    console.log('保存远程站点配置:', remoteURL);
  },
  
})