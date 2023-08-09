Page({
  data: {
    inputText: '',  // 用户输入的文本
  },

  handleInput: function(e) {
    this.setData({
      inputText: e.detail.value,
    });
  },

  goToScrollPage: function () {
    wx.navigateTo({
      url: '/pages/sub/sub_scroll?text=' + this.data.inputText,
    });
  },
});
