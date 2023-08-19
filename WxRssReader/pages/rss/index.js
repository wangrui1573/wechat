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
  
    // 从本地存储中获取远程站点配置
    var remoteURL = wx.getStorageSync('remoterss_config');
  
    // 如果本地存储中有远程站点配置，则使用该配置作为 URL
    var requestURL = remoteURL ? remoteURL : 'https://gist.githubusercontent.com/wangrui1573/72a5562a0499dd972dcdba1bb04888ce/raw/wx_rss.json';
  
    wx.request({
      url: requestURL, // 使用动态的 URL
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
  
        if (remoteURL) {
          wx.setStorageSync('Sites', localSites); // 仅在远程站点配置存在时更新本地存储
          thisData.updateList(localSites);
        } else {
          wx.setStorageSync('Sites', localSites); // 在没有远程站点配置时，更新本地存储
          thisData.updateList(localSites);
        }
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
      // return { name: val.name, path: "/pages/rss/list?url=" + encodeURIComponent(val.url) + "&tid=" + key };
      return { name: val.name, path: "/pages/rss/list?url=" + (val.url) + "&tid=" + key };
    });

    this.setData({ list: newData });
    this.hideToast();
  },

  hideToast: function () {
    wx.hideToast();
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
