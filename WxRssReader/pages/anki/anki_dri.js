// anki_dri.js
Page({
  data: {
    lessonList: [], // 存放 lesson 数据
  },
  
  onLoad: function () {
    // 获取 lesson 数据并计算学习进度
    // 示例数据 lessonList = [{ lesson: 1, wordCount: 20, progress: 0.25 }, ...]
  },
  
  startLearning: function (event) {
    const lesson = event.currentTarget.dataset.lesson;
    // 跳转到 anki 页面，并传递 lesson 数据
    wx.navigateTo({
      url: `/pages/anki/anki?lesson=${lesson}`,
    });
  }
});
