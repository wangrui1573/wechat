Page({
  data: {
    musicData: [
      {
        name: '无人之岛',
        link: 'https://music.real9.cn/static/media/Mojito.96d7f2f6.flac',
        cover: 'http://p2.music.126.net/DGMOvGYBjOfBKNkMBnC7ug==/19196373509643886.jpg'
      },
      {
        name: '红色高跟鞋',
        link: 'https://music.real9.cn/static/media/%E7%BA%A2%E8%89%B2%E9%AB%98%E8%B7%9F%E9%9E%8B.5412f8de.mp3',
        cover: 'http://p1.music.126.net/jJOaqlez9x5VofjgB7B_Bw==/109951166195459631.jpg'
      }
      // 可以继续添加更多歌曲数据
    ],
    currentMusicIndex: 0, // 当前播放歌曲的索引
    isPlaying: false, // 是否正在播放
    rotateDeg: 0 // 旋转角度
  },

  onLoad: function () {
    // 检查本地存储是否有音乐数据，没有则创建
    const musicData = wx.getStorageSync('musicData');
    if (!musicData) {
      wx.setStorageSync('musicData', this.data.musicData);
    }
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
