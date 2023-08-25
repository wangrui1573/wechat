Page({
  data: {
    tools: [],
    tools2: [],
    tools3: []
  },

  onLoad: function () {
    this.fetchData();
  },

  fetchData: function () {
    wx.request({
      url: 'https://gist.githubusercontent.com/wangrui1573/e430a00a0d259a8b3ed91c306a9985ff/raw/tool.json',
      success: (res) => {
        const remoteData = res.data;
        console.log('Remote Data:', remoteData); // Debug output
        this.setData({
          tools: remoteData.tools,
          tools2: remoteData.tools2,
          tools3: remoteData.tools3
        });
      },
      fail: (err) => {
        console.error('获取远程数据失败', err);
      }
    });
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
