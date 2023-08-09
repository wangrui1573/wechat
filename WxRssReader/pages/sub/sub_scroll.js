Page({
  data: {
    text: '',
  },

  onLoad: function (options) {
    const text = options.text || ''; // 获取传递的文本内容
    this.setData({
      text: text,
    });
  },
});
