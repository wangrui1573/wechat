Page({
  data: {
    words: [],
    currentWord: null,
    currentIndex: -1,
    learningPhase: 3,
    showMeaning: false
  },

  updateRemoteData: function () {
    const thisPage = this;

    wx.request({
      url: 'https://gist.githubusercontent.com/wangrui1573/59cedefd8c8aa008f22961f3b33d59c6/raw/wx_anki1.json',
      success: function (res) {
        const remoteWords = res.data;
        console.log("远程单词数据：", remoteWords);

        // 获取本地数据
        const localWords = thisPage.loadStoredData();

        // 合并数据并更新本地
        const mergedWords = thisPage.mergeWords(localWords, remoteWords);

        thisPage.saveStoredData(mergedWords); // 保存更新后的数据到本地
        thisPage.initializeData(mergedWords); // 初始化数据
      },
      fail: function (err) {
        console.error("远程数据获取失败：", err);
        thisPage.initializeData([]);
      }
    });
  },
  
  onLoad: function () {
    this.updateRemoteData(); // 在页面显示时更新远程数据
    this.loadStoredData();   // 加载本地数据
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

    return mergedWords;
  },

  initializeData: function (initialWords) {
    wx.setStorageSync("words", initialWords);
    this.setData({
      words: initialWords
    });

    this.nextWord();
  },

  //---------------------------

  showMeaning: function () {
    this.setData({
      showMeaning: !this.data.showMeaning
    });
  },

  loadStoredData: function () {
    const localWords = wx.getStorageSync("words") || [];
    return localWords;
  },

  saveStoredData: function (updatedWords) {
    wx.setStorageSync("words", updatedWords);
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
  },

  onWordBlockClick: function () {
    this.setData({ showMeaning: true });
  },

  resetStatus: function () {
    const updatedWords = this.data.words.map(word => {
      return {
        word: word.word,
        meaning: word.meaning,
        status: 3
      };
    });
    
    console.log("更新数据:", updatedWords); 
    wx.setStorageSync("words", updatedWords); // 将更新后的数据直接覆盖到本地存储

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
  }
});
