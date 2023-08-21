var app = getApp()


Page({
  data: {
    words: [],          // 存储单词列表
    currentWord: null,  // 当前展示的单词
    currentIndex: -1,   // 当前单词在列表中的索引
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

  // 切换显示单词的含义
  showMeaning: function () {
    const currentWord = this.data.currentWord;
    if (currentWord) {
      const newShowMeaning = !this.data.showMeaning;
      const bgImageUrl = newShowMeaning ? currentWord.url2 : currentWord.url1;
      
      this.setData({
        showMeaning: newShowMeaning,
        // upperBgImage: bgImageUrl
      });
    }
  },
  
  
  
  // 加载本地存储中的数据
  loadStoredData: function () {
    const allWords = wx.getStorageSync("words") || [];
    const filteredWords = this.data.lesson > 0 ? allWords.filter(word => word.lesson === this.data.lesson) : allWords;
    this.setData({
      words: filteredWords
    });
  },
  //返回上一页
  navigateBack: function () {
    wx.navigateBack({
      delta: 1, // 返回的页面数，1表示返回上一页
      success: function(res){
        // 通过options参数传递参数
        wx.navigateTo({
          url: '../anki/anki_dri?refresh=true'
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

    wx.setStorageSync("words", words);
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
          word: word.word,
          meaning: word.meaning,
          lesson: word.lesson,
          status: 3
        };
      }
      return word;
    });

    // 重置所有单词的学习进度为“忘记”
  
  
    console.log("更新数据:", updatedWords);
    
    // 更新本地存储中的数据
    const allWords = wx.getStorageSync("words") || [];
    const updatedWordsInStorage = allWords.map(word => {
      const updatedWord = updatedWords.find(updated => updated.word === word.word);
      if (updatedWord) {
        return updatedWord;
      }
      return word;
    });
    
    wx.setStorageSync("words", updatedWordsInStorage); // 更新本地数据
    
    this.setData({
      words: updatedWords,
      currentWord: updatedWords[this.data.currentIndex],
      showMeaning: false
    });
    this.nextWord();
  },
  
  

  // 显示下一个单词
  // nextWord: function () {
  //   const wordArray = this.data.words.filter(word => word.status >= 1);
  //   if (wordArray.length === 0) {
  //     this.showAllWordsLearnedToast();
  //     return;
  //   }
  
  //   const nextIndex = Math.floor(Math.random() * wordArray.length);
  //   const currentWord = wordArray[nextIndex];
  
  //   // 根据当前单词的情况定义 url1
  //   const url1 = currentWord.url1;

  //   this.setData({
  //     currentWord: currentWord,
  //     currentIndex: nextIndex,
  //     showMeaning: false,
  //     upperBgImage: url1 // 设置为 url1 的值
  //   });
  
  //   const t2 = this.data.words.filter(word => word.status === 0).length;
  //   const t1 = this.data.words.length;
  //   const t3 = ((t2 / t1) * 100).toFixed(1);
  //   this.setData({
  //     t2: t2,
  //     t1: t1,
  //     t3: t3
  //   });
  // },
  
  nextWord: function () {
    const wordArray = this.data.words.filter(word => word.status >= 1);
    if (wordArray.length === 0) {
      this.showAllWordsLearnedToast();
      return;
    }
  
    const nextIndex = Math.floor(Math.random() * wordArray.length);
    const currentWord = wordArray[nextIndex];
  
    // 根据当前单词的情况定义 url1
    const url1 = currentWord.url1;
  
    // 调用朗读方法
    // this.speakText(currentWord.word);
  
    this.setData({
      currentWord: currentWord,
      currentIndex: nextIndex,
      showMeaning: false,
      // upperBgImage: url1 // 设置为 url1 的值
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
    this.setData({ showMeaning: true });
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
    const allWords = wx.getStorageSync("words") || [];
    const updatedWordsInStorage = allWords.map(word => {
      if (word.word === updatedWord.word) {
        return updatedWord;
      }
      return word;
    });
    wx.setStorageSync("words", updatedWordsInStorage);

    // 显示下一个单词
    this.nextWord();
  }
});
