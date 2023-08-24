<template>
    <!-- anki_dri.wxml -->
    <view class="container">
        <view class="doc-title zan-hairline--bottom">课程列表</view>

        <block v-for="(item, index) in lessonList" :key="index">
            <view class="zan-panel">
                <view class="zan-card" @tap="goToAnki" :data-lesson="item.lesson">
                    <view class="zan-card__thumb">
                        <image class="zan-card__img" src="https://gist.githubusercontent.com/wangrui1573/70c9954014e1ebdf57727e20a66918f8/raw/sub.svg" mode="aspectFit"></image>
                    </view>
                    <view class="zan-card__detail">
                        <view class="zan-card__detail-row">
                            <view class="zan-card__left-col zan-font-20">
                                {{ item.lessonname }}
                            </view>
                        </view>

                        <view class="zan-card__detail-row zan-c-gray-darker">
                            <view class="zan-card__right-col">单词数量：{{ item.wordCount }}</view>
                            <view class="zan-card__left-col">学习进度：{{ item.progress }}%</view>
                        </view>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
export default {
    data() {
        return {
            lessonList: [],
            currentTab: 0
        };
    },
    onLoad: function () {
        this.onLoadClone3389();
    },
    // ...其他函数和逻辑

    onPullDownRefresh: function () {
        var that = this;
        that.setData({
            currentTab: 0 //当前页的一些初始数据，视业务需求而定
        });

        this.onLoadClone3389({}); //重新加载onLoad()
        uni.stopPullDownRefresh();
    },
    methods: {
        onLoadClone3389: function () {
            this.setData({
                lessonList: this.calculateLessonInfo()
            });
        },

        goToAnki: function (event) {
            const lesson = event.currentTarget.dataset.lesson;
            console.log('第', lesson, '课');
            const url = '/pages/anki/anki3?lesson=' + lesson; // 假设你的 anki2 页面路径为 pages/anki/anki2
            console.log('跳转地址：', url);
            uni.redirectTo({
                url: url
            });
        },

        calculateLessonInfo: function () {
            const words = uni.getStorageSync('words_real'); // 假设words是从本地存储获取的数据
            const distinctLessons = [...new Set(words.map((word) => word.lesson))];
            const distinctLessonname = [...new Set(words.map((word) => word.lessonname))];
            const lessonInfoList = distinctLessons.map((lesson, index) => {
                const totalWordsInLesson = words.filter((word) => word.lesson === lesson).length;
                // console.log("单词数量：", totalWordsInLesson);
                const learnedWordsInLesson = words.filter((word) => word.lesson === lesson && word.status === 0).length;
                // console.log("已学单词：", learnedWordsInLesson);
                const progress = ((learnedWordsInLesson / totalWordsInLesson) * 100).toFixed(2);
                return {
                    lesson: lesson,
                    lessonname: distinctLessonname[index],
                    // 使用对应索引处的lessonname
                    wordCount: totalWordsInLesson,
                    progress: progress
                };
            });
            return lessonInfoList;
        },

        onload: function (options) {
            // 获取参数

            var refresh = options.refresh;
            // 判断是否需要刷新
            if (refresh === 'true') {
                // 执行刷新操作
                onPullDownRefresh;
                // this.onLoad();
                // this.refreshPage();
            }
        }
    }
};
</script>
<style>
@import './anki_dri_real.css';
</style>
