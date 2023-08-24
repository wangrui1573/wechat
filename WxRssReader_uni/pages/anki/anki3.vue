<template>
    <view class="page">
        <view v-if="currentWord.url1" class="upper" @tap="showMeaningFun" :style="'background-image: url(' + upperBgImage + ') '">
            <text v-if="!hideWord" class="word">{{ currentWord.word }}</text>
            <text class="meaning" v-if="showMeaning">{{ currentWord.meaning }}</text>
        </view>
        <view v-else class="upper2" @tap="showMeaningFun" :style="'background-image: url(' + upperBgImage + ') '">
            <text v-if="!hideWord" class="word2">{{ currentWord.word }}</text>
            <text class="meaning2" v-if="showMeaning">{{ currentWord.meaning }}</text>
        </view>

        <view class="lower-buttons">
            <view class="button-red" @tap="onButtonClick" data-text="忘记">忘记</view>
            <view class="button-yellow" @tap="onButtonClick" data-text="困难">困难</view>
            <view class="button-blue" @tap="onButtonClick" data-text="熟悉">熟悉</view>
            <view class="button-green" @tap="onButtonClick" data-text="牢记">牢记</view>
        </view>
        <view class="lower-status">
            <view class="reset-button" @tap="resetStatus">⌛重置进度</view>
            <view class="read" @tap="read">🔈</view>
            <view class="word-count-container" @tap="showProgressModal">
                <progress class="progress" :percent="t3" strokeWidth="10" :show-info="true" activeColor="#007bff"></progress>
                <text class="word-count">🚩单词数：{{ t2 }}/{{ t1 }}</text>
            </view>
            <!-- 悬浮图标，点击跳转到anki_dri页面 -->

            <view class="floating-button" @tap="openImages" v-if="currentWord.url1">
                <text class="icon">🔍</text>
            </view>
            <navigator url="/pages/anki/anki_dri_real">
                <view class="floating-icon" @tap="navigateBack">
                    <text class="icon">↩️</text>
                </view>
            </navigator>
        </view>
    </view>
</template>

<script>
// pages/anki/anki3.js 图片问答主页
var app = getApp();
export default {
    data() {
        return {
            words_real: [],

            // 存储单词列表
            currentWord: null,

            // 当前展示的单词
            currentIndex: -1,

            // 当前单词在列表中的索引
            hideWord: false,

            showMeaning: false,

            // 是否显示单词的含义
            // 当前课程编号
            lesson: 0,

            upperBgImage: '',
            words: '',
            t2: '',
            t1: '',
            t3: ''
        };
    }, // 页面加载时执行的函数
    onLoad: function (options) {
        if (options.lesson) {
            const lesson = parseInt(options.lesson);
        } else {
        }
        this.setData({
            lesson: lesson
        });
        this.loadStoredData(); // 加载本地存储中的数据
        this.nextWord(); // 显示下一个单词
    },
    methods: {
        // 在methods中添加
        openImages: function () {
            const currentWord = this.currentWord;
            if (currentWord) {
                const url1 = currentWord.url1;
                const url2 = currentWord.url2;
                uni.previewImage({
                    urls: [url1, url2]
                });
            }
        },

        // 切换显示单词的含义
        showMeaningFun: function () {
            const currentWord = this.currentWord;
            if (currentWord) {
                const newShowMeaning = !this.showMeaning;
                const newhideWord = !this.hideWord;
                if (newShowMeaning) {
                    const bgImageUrl = currentWord.url2;
                } else {
                    const bgImageUrl = currentWord.url1;
                }
                this.setData({
                    showMeaning: newShowMeaning,
                    hideWord: newhideWord,
                    upperBgImage: bgImageUrl
                });
            }
        },

        // 加载本地存储中的数据
        loadStoredData: function () {
            const allWords = uni.getStorageSync('words_real') || [];
            const filteredWords = this.lesson > 0 ? allWords.filter((word) => word.lesson === this.lesson) : allWords;
            this.setData({
                words: filteredWords
            });
        },

        //返回上一页
        navigateBack: function () {
            uni.navigateBack({
                delta: 1,
                // 返回的页面数，1表示返回上一页
                success: function (res) {
                    // 通过options参数传递参数
                    uni.navigateTo({
                        url: '../anki/anki_dri_real?refresh=true'
                    });
                }
            });
        },

        // 保存更新后的单词数据到本地存储
        saveStoredData: function (updatedWord) {
            const words = this.words.map((word) => {
                if (word.word === updatedWord.word) {
                    return updatedWord;
                }
                return word;
            });
            uni.setStorageSync('words_real', words);
            this.setData({
                words: words
            });
        },

        // 显示学习进度对话框
        showProgressModal: function () {
            const learnedWords = this.words.filter((word) => word.status === 0).length;
            const totalWords = this.words.length;
            uni.showModal({
                title: '点击牢记将视为已学，不再出现',
                content: `已学单词：${learnedWords}\n未学单词：${totalWords - learnedWords}`,
                showCancel: false,
                confirmText: '关闭'
            });
        },

        //学完弹窗提示
        showAllWordsLearnedToast: function () {
            uni.showToast({
                title: '所有单词已学完！',
                icon: 'success',
                duration: 2000
            });
        },

        //朗读当前单词
        read: function () {
            const currentWord = this.currentWord;
            if (currentWord) {
                app.globalData.speakText(currentWord.word);
            }
        },

        // 重置所有单词的学习进度为“忘记”
        resetStatus: function () {
            const updatedWords = this.words.map((word) => {
                if (this.lesson === 0 || word.lesson === this.lesson) {
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
            const allWords = uni.getStorageSync('words_real') || [];
            const updatedWordsInStorage = allWords.map((word) => {
                const updatedWord = updatedWords.find((updated) => updated.word === word.word);
                if (updatedWord) {
                    return updatedWord;
                }
                return word;
            });
            uni.setStorageSync('words_real', updatedWordsInStorage); // 更新本地数据
            this.setData({
                words: updatedWords,
                currentWord: updatedWords[this.currentIndex],
                showMeaning: false
            });
            this.nextWord();
        },

        //切换单词逻辑
        nextWord: function () {
            // 过滤状态大于0的单词
            let wordArray = this.words.filter((word) => word.status > 0);
            if (wordArray.length <= 1) {
                // 仅剩一个或更少,不过滤
            } else {
                // 多个单词时过滤当前词
                wordArray = wordArray.filter((word) => word !== this.currentWord);
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
            const t2 = this.words.filter((word) => word.status === 0).length;
            const t1 = this.words.length;
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
            const updatedWord = {
                ...this.currentWord
            }; // 创建当前单词对象的副本

            if (buttonText === '忘记') {
                updatedWord.status = 3;
            } else if (buttonText === '困难') {
                updatedWord.status = 2;
            } else if (buttonText === '熟悉') {
                updatedWord.status = 1;
            } else if (buttonText === '牢记') {
                updatedWord.status = 0;
            }

            // 更新内存中的单词状态
            const updatedWords = this.words.map((word) => {
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
            const allWords = uni.getStorageSync('words_real') || [];
            const updatedWordsInStorage = allWords.map((word) => {
                if (word.word === updatedWord.word) {
                    return updatedWord;
                }
                return word;
            });
            uni.setStorageSync('words_real', updatedWordsInStorage);

            // 显示下一个单词
            this.nextWord();
        }
    }
};
</script>
<style>
@import './anki3.css';
</style>
