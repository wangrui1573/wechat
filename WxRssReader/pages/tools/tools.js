Page({
  data: {
    tools: [
      { name: 'IP计算器', icon: 'wx-duoIP', url: '/pages/ip/ip' },
      { name: '手持弹幕', icon: 'wx-danmu', url: '/pages/sub/sub' },
      // 添加更多工具...
    ],
    tools2: [
      { name: '音乐', icon: 'wx-music', url: '/pages/music/music' },
      { name: '教育', icon: 'wx-jiaoyu', url: '/pages/anki/anki_real' },
      { name: '工具5', icon: 'wx-danmu', url: '/pages/anki/anki3?lesson=20' },
      // 添加更多工具...
    ],
    tools3: [
      { name: 'QB下载', icon: 'wx-qbittorrent', appid: 'wxb22773ad9e55876e', path: 'pages/server/server', extraData: { foo: 'bar' }, envVersion: 'release' },
      { name: '数独', icon: 'wx-wode-shududaochu', appid: 'wx9b87be8614be1b5e', path: 'index', extraData: { foo: 'bar' }, envVersion: 'release' },

    ]
  },

  openMiniProgram: function (event) {
    const index = event.currentTarget.dataset.index;
    const tool = this.data.tools3[index];
    // console.log(tool)
    
    // 检查 tool 是否存在
    if (tool) {
      wx.navigateToMiniProgram({
        appId: tool.appid,
        path: tool.path,
        extraData: tool.extraData,
        envVersion: tool.envVersion,
        success(res) {
          console.log('成功打开其他小程序', res);
        },
        fail(err) {
          console.error('打开其他小程序失败', err);
        }
      });
    } else {
      console.error('未找到对应的工具');
    }
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
});
