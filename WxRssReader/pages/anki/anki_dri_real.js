Page({
  data: {
    lessonList: [],
  },

  onLoad: function () {
    this.setData({
      lessonList: this.calculateLessonInfo(),
    });
  },


  goToAnki: function (event) {
    const lesson = event.currentTarget.dataset.lesson;
    console.log("第", lesson, "课");
    const url = '/pages/anki/anki3?lesson=' + lesson; // 假设你的 anki2 页面路径为 pages/anki/anki2
    console.log("跳转地址：", url);
    wx.redirectTo({
      url: url,
    });
  },
    
  
  
  calculateLessonInfo: function () {
    const words = wx.getStorageSync('words_real'); // 假设words是从本地存储获取的数据
    const distinctLessons = [...new Set(words.map(word => word.lesson))];

    const lessonInfoList = distinctLessons.map(lesson => {
      const totalWordsInLesson = words.filter(word => word.lesson === lesson).length;
      // console.log("单词数量：", totalWordsInLesson);
      const learnedWordsInLesson = words.filter(word => word.lesson === lesson && word.status === 0).length;
      // console.log("已学单词：", learnedWordsInLesson);
      const progress = ((learnedWordsInLesson / totalWordsInLesson) * 100).toFixed(2);

      return {
        lesson: lesson,
        wordCount: totalWordsInLesson,
        progress: progress,
      };
    });

    return lessonInfoList;
  },

  // ...其他函数和逻辑

  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      currentTab: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
    wx.stopPullDownRefresh()
    
  },
 
  onload: function (options) {
    // 获取参数

    var refresh = options.refresh;
    // 判断是否需要刷新
    if(refresh === 'true') {
      // 执行刷新操作
      onPullDownRefresh
      // this.onLoad();
      // this.refreshPage();
      
    }
  },
  
});
