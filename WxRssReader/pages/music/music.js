Page({
  data: {
    musicData: [], // 歌曲数据
    currentMusicIndex: 0, // 当前播放歌曲的索引
    isPlaying: false, // 是否正在播放
    rotateDeg: 0 // 旋转角度
  },

  onLoad: function () {
    // 获取远程歌曲数据并更新到本地
    this.updateMusicData();
  },

  // 获取远程歌曲数据并更新到本地
  updateMusicData: function () {
    wx.request({
      url: 'https://db.real9.cn/real/lesson/2',
      success: (res) => {
        const remoteMusicData = res.data;
        wx.setStorageSync('musicData', remoteMusicData);
        wx.showToast({
          title: '数据更新完成',
          icon: 'success',
          duration: 2000
        });
        this.setData({
          musicData: remoteMusicData
        });
      },
      fail: (err) => {
        console.error('获取远程歌曲数据失败', err);
      }
    });
  },

  

  // 播放按钮点击事件
  play: function () {
    const music = this.data.musicData[this.data.currentMusicIndex];

    // 播放音乐
    wx.playBackgroundAudio({
      dataUrl: music.link,
      title: music.name
    });

    // 设置播放状态和旋转效果
    this.setData({
      isPlaying: true
    });
    this.rotateCover();
  },

  // 暂停按钮点击事件
  pause: function () {
    // 暂停音乐
    wx.pauseBackgroundAudio();

    // 设置播放状态和停止旋转
    this.setData({
      isPlaying: false
    });
    clearInterval(this.rotateInterval);
  },

  // 旋转封面图效果
  rotateCover: function () {
    this.rotateInterval = setInterval(() => {
      this.setData({
        rotateDeg: this.data.rotateDeg + 1
      });
    }, 30);
  },

  // 上一首按钮点击事件
  prev: function () {
    const prevIndex = this.data.currentMusicIndex - 1;
    if (prevIndex >= 0) {
      this.setData({
        currentMusicIndex: prevIndex
      });
      if (this.data.isPlaying) {
        this.play();
      }
    }
  },

  // 下一首按钮点击事件
  next: function () {
    const nextIndex = this.data.currentMusicIndex + 1;
    if (nextIndex < this.data.musicData.length) {
      this.setData({
        currentMusicIndex: nextIndex
      });
      if (this.data.isPlaying) {
        this.play();
      }
    }
  }
});
