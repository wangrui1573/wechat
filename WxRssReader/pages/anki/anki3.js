// pages/anki/anki3.js 图片问答主页
var app = getApp()

Page({
  data: {
    words_real: [],          // 存储单词列表
    currentWord: null,  // 当前展示的单词
    currentIndex: -1,   // 当前单词在列表中的索引
    hideWord: false,
    showMeaning: false, // 是否显示单词的含义
    lesson: 0           // 当前课程编号
  },

  // 页面加载时执行的函数
  onLoad: function (options) {
    const lesson = options.lesson ? parseInt(options.lesson) : 0;
    this.setData({ lesson: lesson });
    this.loadStoredData(); // 加载本地存储中的数据
    this.nextWord();        // 显示下一个单词
  },

  // 在methods中添加
  openImages: function () {
    const currentWord = this.data.currentWord;
    if (currentWord) {
      const url1 = currentWord.url1;
      const url2 = currentWord.url2;
      wx.previewImage({
        urls: [url1, url2]
      });
    }
  },

  // 切换显示单词的含义
  showMeaning: function () {
    const currentWord = this.data.currentWord;
    if (currentWord) {
      const newShowMeaning = !this.data.showMeaning;
      const newhideWord = !this.data.hideWord;
      const bgImageUrl = newShowMeaning ? currentWord.url2 : currentWord.url1;
      this.setData({
        showMeaning: newShowMeaning,
        hideWord: newhideWord,
        upperBgImage: bgImageUrl
      });
    }
  },

  // 加载本地存储中的数据
  loadStoredData: function () {
    const allWords = wx.getStorageSync("words_real") || [];
    const filteredWords = this.data.lesson > 0 ? allWords.filter(word => word.lesson === this.data.lesson) : allWords;
    this.setData({
      words: filteredWords
    });
  },
  //返回上一页
  navigateBack: function () {
    wx.navigateBack({
      delta: 1, // 返回的页面数，1表示返回上一页
      success: function (res) {
        // 通过options参数传递参数
        wx.navigateTo({
          url: '../anki/anki_dri_real?refresh=true'
        })
      }
    });
  },

  // 保存更新后的单词数据到本地存储
  saveStoredData: function (updatedWord) {
    const words = this.data.words.map(word => {
      if (word.word === updatedWord.word) {
        return updatedWord;
      }
      return word;
    });
    wx.setStorageSync("words_real", words);
    this.setData({
      words: words
    });
  },

  // 显示学习进度对话框
  showProgressModal: function () {
    const learnedWords = this.data.words.filter(word => word.status === 0).length;
    const totalWords = this.data.words.length;
    wx.showModal({
      title: '点击牢记将视为已学，不再出现',
      content: `已学单词：${learnedWords}\n未学单词：${totalWords - learnedWords}`,
      showCancel: false,
      confirmText: '关闭'
    });
  },

  //学完弹窗提示  
  showAllWordsLearnedToast: function () {
    wx.showToast({
      title: '所有单词已学完！',
      icon: 'success',
      duration: 2000,
    });
  },

  //朗读当前单词
  read: function () {
    const currentWord = this.data.currentWord;
    if (currentWord) {
      app.speakText(currentWord.word);
    }
  },

  // 重置所有单词的学习进度为“忘记”
  resetStatus: function () {
    const updatedWords = this.data.words.map(word => {
      if (this.data.lesson === 0 || word.lesson === this.data.lesson) {
        return {
          _id: word._id,
          word: word.word,
          meaning: word.meaning,
          lesson: word.lesson,
          url1: word.url1,
          url2: word.url2,
          status: 3
        };
      }
      return word;
    });
    // 重置所有单词的学习进度为“忘记”
    // console.log("更新数据:", updatedWords);
    // 更新本地存储中的数据
    const allWords = wx.getStorageSync("words_real") || [];
    const updatedWordsInStorage = allWords.map(word => {
      const updatedWord = updatedWords.find(updated => updated.word === word.word);
      if (updatedWord) {
        return updatedWord;
      }
      return word;
    });
    wx.setStorageSync("words_real", updatedWordsInStorage); // 更新本地数据
    this.setData({
      words: updatedWords,
      currentWord: updatedWords[this.data.currentIndex],
      showMeaning: false
    });
    this.nextWord();
  },

  //切换单词逻辑
  nextWord: function () {
    // 过滤状态大于0的单词
    let wordArray = this.data.words.filter(word => word.status > 0);
    if (wordArray.length <= 1) {
      // 仅剩一个或更少,不过滤
    } else {
      // 多个单词时过滤当前词
      wordArray = wordArray.filter(word => word !== this.data.currentWord);
    }
    // 如果过滤完为空,则返回
    if (wordArray.length == 0) {
      this.showAllWordsLearnedToast();
      return;
    }
    // 随机索引
    const nextIndex = Math.floor(Math.random() * wordArray.length);
    // 选择下一单词
    const nextWord = wordArray[nextIndex];
    // 设置下一单词
    this.setData({
      currentWord: nextWord,
      currentIndex: nextIndex,
      upperBgImage: nextWord.url1
    });
    const t2 = this.data.words.filter(word => word.status === 0).length;
    const t1 = this.data.words.length;
    const t3 = ((t2 / t1) * 100).toFixed(1);
    this.setData({
      t2: t2,
      t1: t1,
      t3: t3
    });
  },
  
  // 点击单词区域，显示单词含义
  onWordBlockClick: function () {
    this.setData({
      showMeaning: true,
      hideWord: true
    });
  },

  // 点击按钮，更新单词的学习进度
  onButtonClick: function (event) {
    const buttonText = event.currentTarget.dataset.text;
    const updatedWord = { ...this.data.currentWord }; // 创建当前单词对象的副本

    if (buttonText === "忘记") {
      updatedWord.status = 3;
    } else if (buttonText === "困难") {
      updatedWord.status = 2;
    } else if (buttonText === "熟悉") {
      updatedWord.status = 1;
    } else if (buttonText === "牢记") {
      updatedWord.status = 0;
    }

    // 更新内存中的单词状态
    const updatedWords = this.data.words.map(word => {
      if (word.word === updatedWord.word) {
        return updatedWord;
      }
      return word;
    });

    // 更新内存中的数据
    this.setData({
      words: updatedWords,
      currentWord: updatedWord
    });

    // 更新本地存储中的数据
    const allWords = wx.getStorageSync("words_real") || [];
    const updatedWordsInStorage = allWords.map(word => {
      if (word.word === updatedWord.word) {
        return updatedWord;
      }
      return word;
    });
    wx.setStorageSync("words_real", updatedWordsInStorage);

    // 显示下一个单词
    this.nextWord();
  }
});
