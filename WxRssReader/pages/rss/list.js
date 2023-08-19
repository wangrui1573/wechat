// pages/rss/list.js
Page({
  data: {
    // url: 'https://bak.yantuz.cn:8000/view.php?v=' + Math.random() + "&url=",
    url: 'https://pxy2.real9.cn/s/',

    title: '岩兔站',
    items: []
  },
  onLoad: function (options) {
    this.showFetchingRssDataToast();
    const thisdata = this;
    const sites = wx.getStorageSync("Sites");
    const appInstance = getApp();
    let url = this.data.url;

    if (options.tid >= 0){
      thisdata.setData({ title: sites[options.tid].name });
    }

    if (options.url && options.url != ""){
      url += options.url;
    } else {
      url += "https://yantuz.cn/atom.xml";
    }

    appInstance.getRss(url, function (json) {
      wx.setStorage({
        key: 'SiteData',
        data: json,
      });
      thisdata.setData({ items: json });
    });
  },
  showFetchingRssDataToast: function () {
    wx.showToast({
      title: '正在获取RSS数据...',
      icon: 'loading',
      duration: 1500,
    });
  }
});
