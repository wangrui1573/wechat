// pages/music/music.js
Page({
  data: {
    musicData: [], // 歌曲数据
    currentMusicIndex: 0, // 当前播放歌曲的索引
    isPlaying: false, // 是否正在播放
    rotateDeg: 0, // 旋转角度
    playMode: 'sequence' // 播放模式：'sequence'为顺序播放，'random'为随机播放，'loop'为循环播放
  },

  onLoad: function () {
    this.updateMusicData();
  },

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

  togglePlayMode: function () {
    let newMode;
    if (this.data.playMode === 'sequence') {
      newMode = 'random';
    } else if (this.data.playMode === 'random') {
      newMode = 'loop';
    } else {
      newMode = 'sequence';
    }

    this.setData({
      playMode: newMode
    });
  },

  getNextIndex: function () {
    const currentIndex = this.data.currentMusicIndex;
    const musicDataLength = this.data.musicData.length;

    if (this.data.playMode === 'sequence') {
      return currentIndex < musicDataLength - 1 ? currentIndex + 1 : 0;
    } else if (this.data.playMode === 'random') {
      return Math.floor(Math.random() * musicDataLength);
    } else {
      return currentIndex;
    }
  },

  onMusicEnd: function () {
    const nextIndex = this.getNextIndex();
    this.setData({
      currentMusicIndex: nextIndex
    });

    if (this.data.isPlaying) {
      this.play();
    }
  },

  play: function () {
    const music = this.data.musicData[this.data.currentMusicIndex];

    wx.playBackgroundAudio({
      dataUrl: music.link,
      title: music.name
    });

    this.setData({
      isPlaying: true
    });
    this.rotateCover();

    wx.onBackgroundAudioStop(this.onMusicEnd);
  },

  pause: function () {
    wx.pauseBackgroundAudio();

    this.setData({
      isPlaying: false
    });
    clearInterval(this.rotateInterval);
  },

  rotateCover: function () {
    this.rotateInterval = setInterval(() => {
      this.setData({
        rotateDeg: this.data.rotateDeg + 1
      });
    }, 30);
  },

  prev: function () {
    const prevIndex = this.data.currentMusicIndex - 1;
    let newIndex;

    if (prevIndex >= 0) {
      newIndex = prevIndex;
    } else {
      newIndex = this.data.musicData.length - 1;
    }

    this.setData({
      currentMusicIndex: newIndex
    });

    if (this.data.isPlaying) {
      this.play();
    }
  },

  next: function () {
    const nextIndex = this.getNextIndex();
    this.setData({
      currentMusicIndex: nextIndex
    });

    if (this.data.isPlaying) {
      this.play();
    }
  }
});
