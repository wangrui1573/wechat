// pages/rss/index.js

Page({
  data: {
    list: [
      {
        title: 'RSS站点',
        content: []
      },{
        title: '常用工具',
        content: [
          {
            name: 'IP计算器',
            path: '/pages/ip/ip'
          },
          // {
          //   name: '导入/导出',
          //   path: '/pages/rssManage/export'
          // },
          // {
          //   name: '关于',
          //   path: '/pages/about/index'
          // }
        ]
      },
      {
        title: '设置',
        content: [
          {
            name: '管理订阅列表',
            path: '/pages/rssManage/index'
          },
          {
            name: '导入/导出',
            path: '/pages/rssManage/export'
          },
          {
            name: '关于',
            path: '/pages/about/index'
          }
        ]
      }
    ]
  },

  onLoad: function () {
    this.showFetchingDataToast();
    this.fetchRemoteData();
  },

  showFetchingDataToast: function () {
    wx.showToast({
      title: '正在获取数据...',
      icon: 'loading',
      duration: 1500,
    });
  },

  fetchRemoteData: function () {
    var thisData = this;
    wx.request({
      url: 'https://gist.githubusercontent.com/wangrui1573/72a5562a0499dd972dcdba1bb04888ce/raw/wx_rss.json',
      success: function (res) {
        var remoteSites = res.data;
        var localSites = wx.getStorageSync("Sites") || [];

        remoteSites.forEach(function (remoteSite) {
          if (!localSites.some(function (localSite) {
            return localSite.url === remoteSite.url;
          })) {
            localSites.push(remoteSite);
          }
        });

        wx.setStorageSync('Sites', localSites);
        thisData.updateList(localSites);
      },
      fail: function () {
        thisData.hideToast();
        wx.showToast({
          title: '数据获取失败',
          icon: 'none',
          duration: 1500,
        });
      }
    });
  },

  updateList: function (sites) {
    var newData = this.data.list.slice();
    newData[0].content = sites.map(function (val, key) {
      return { name: val.name, path: "/pages/rss/list?url=" + encodeURIComponent(val.url) + "&tid=" + key };
    });

    this.setData({ list: newData });
    this.hideToast();
  },

  hideToast: function () {
    wx.hideToast();
  }
});
