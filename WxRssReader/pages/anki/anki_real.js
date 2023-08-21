// anki_real.js real学习的目录文件，随机单词

var app = getApp()



Page({
  data: {
    words_real: [],
    currentWord: null,
    currentIndex: -1,
    learningPhase: 3,
    showMeaning: false,
    t1: 0,
    t2: 0,
  },
  



  updateRemoteData: function () {
    const thisPage = this;
  
    // 显示更新中提示
    // wx.showLoading({
    //   title: '单词数据更新中...',
    //   mask: true // 遮罩层，防止用户操作
    // });
  
    wx.request({
      url: 'https://db.real9.cn/product',
      success: function (res) {
        // 隐藏更新中提示
        wx.hideLoading();
  
        const remoteWords = res.data;
        console.log("远程单词数据：", remoteWords);
  
        // 获取本地数据
        const localWords = thisPage.loadStoredData();
  
        // 合并数据并更新本地
        const mergedWords = thisPage.mergeWords(localWords, remoteWords);
  
        thisPage.saveStoredData(mergedWords); // 保存更新后的数据到本地
        thisPage.initializeData(mergedWords); // 初始化数据
  
        // 弹窗提示更新完成
        wx.showToast({
          title: '数据更新完成',
          icon: 'success',
          duration: 1500 // 持续时间
        });
      },
      fail: function (err) {
        // 隐藏更新中提示
        wx.hideLoading();
  
        console.error("远程数据获取失败：", err);
        thisPage.initializeData([]);
  
        // 弹窗提示更新失败
        wx.showToast({
          title: '数据更新失败',
          icon: 'none',
          duration: 1500 // 持续时间
        });
      }
    });
  },
  
  


  onLoad: function () {
    this.initializeData(this.loadStoredData());
    this.nextWord();
    // 在后台更新远程数据
    this.updateRemoteData(); 
    
   // 检查本地存储，看是否已经显示过弹窗
   const hasShownModal = wx.getStorageSync('hasShownModal');

   if (!hasShownModal) {
     // 若没有显示过弹窗，则显示提示弹窗
     wx.showModal({
       title: '使用提示',
       content: '点击屏幕显示答案',
       showCancel: false,
       confirmText: '知道了'
     });

     // 将已显示弹窗的标志位存储在本地
     wx.setStorageSync('hasShownModal', true);
     
   }
 },
 //朗读单词
 read: function () {
  const currentWord = this.data.currentWord;
  if (currentWord) {
    app.speakText(currentWord.word);
  }
},
  
  mergeWords: function (localWords, remoteWords) {
    if (!localWords || localWords.length === 0) {
      return remoteWords;
    }

    const mergedWords = [];

    // 处理本地数据
    for (const localWord of localWords) {
      const remoteWord = remoteWords.find(r => r.word === localWord.word);
      if (remoteWord) {
        mergedWords.push({
          word: localWord.word,
          meaning: remoteWord.meaning,
          lesson: remoteWord.lesson,
          url1: remoteWord.url1,
          url2: remoteWord.url2,
          status: localWord.status // 保持状态不变
        });
      } else {
        mergedWords.push(localWord);
      }
    }

    // 处理远程数据
    for (const remoteWord of remoteWords) {
      const existingWord = localWords.find(l => l.word === remoteWord.word);
      if (!existingWord) {
        mergedWords.push(remoteWord);
      }
    }
    
    const t1 = mergedWords.length;
    console.log("单词数量：", t1);
    this.setData({ t1: t1 });

    const t2 = mergedWords.filter(word => word.status === 0).length;;
    console.log("学单词数量：", t2);
    this.setData({ t2: t2 });

    return mergedWords;
    
    
  },
   
  

  initializeData: function (initialWords) {
    wx.setStorageSync("words_real", initialWords);
    this.setData({
      words: initialWords
    });

    this.nextWord();
    
  },

  //---------------------------

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

  showMeaning: function () {
    this.setData({
      showMeaning: !this.data.showMeaning
    });
  },

  loadStoredData: function () {
    const localWords = wx.getStorageSync("words_real") || [];
    return localWords;
  },

  saveStoredData: function (updatedWords) {
    wx.setStorageSync("words_real", updatedWords);
    this.setData({
      words: updatedWords
    });
  },
  
  showAllWordsLearnedToast: function () {
    wx.showToast({
      title: '所有单词已学完！',
      icon: 'success',
      duration: 2000,
    });
  },

  nextWord: function () {
    const wordArray = this.data.words.filter(word => word.status >= 1);
    if (wordArray.length === 0) {
      this.showAllWordsLearnedToast();
      return;
    }
  
    const nextIndex = Math.floor(Math.random() * wordArray.length);
    this.setData({
      currentWord: wordArray[nextIndex],
      currentIndex: nextIndex,
      showMeaning: false
    });
  
  const t2 = this.data.words.filter(word => word.status === 0).length;
  const t1 = this.data.words.length;
  const t3 = (t2 / t1 * 100).toFixed(1); // 计算百分比，保留两位小数
  this.setData({
    t2: t2,
    t1: t1,
    t3: t3
    });
  },

  onWordBlockClick: function () {
    this.setData({ showMeaning: true });
  },

  resetStatus: function () {
    const updatedWords = this.data.words.map(word => {
      return {
        word: word.word,
        meaning: word.meaning,
        lesson: word.lesson, // 更新lesson栏位
        url1: word.url1,
        url2: word.url2,
        status: 3
      };
    });
    
    console.log("更新数据:", updatedWords); 
    wx.setStorageSync("words_real", updatedWords); // 将更新后的数据直接覆盖到本地存储

    this.setData({
        words: updatedWords,
        currentWord: updatedWords[this.data.currentIndex],
        showMeaning: false
    }
    )
    this.nextWord();
},

  
  onButtonClick: function (event) {
    const buttonText = event.currentTarget.dataset.text;
    const word = this.data.currentWord;

    if (buttonText === "忘记") {
      word.status = 3;
    } else if (buttonText === "困难") {
      word.status = 2;
    } else if (buttonText === "熟悉") {
      word.status = 1;
    } else if (buttonText === "牢记") {
      word.status = 0;
    }

    this.saveStoredData(this.data.words); // 保存更新后的数据到本地
    
    this.nextWord();
    
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
