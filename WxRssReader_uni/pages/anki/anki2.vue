<template>
    <view class="page">
        <!-- <view class="upper" bindtap="showMeaning" style="background-image: url({{ upperBgImage }});  background-size: contain; background-repeat: no-repeat; background-position: center center; height: 100%; width: 100%;"> -->
        <view class="upper" @tap="showMeaningFun">
            <text class="word">{{ currentWord.word }}</text>
            <text class="meaning" v-if="showMeaning">{{ currentWord.meaning }}</text>
        </view>
        <!-- <view class="upper" bindtap="showMeaning">
  <view class="bg-image" style="background-image: url({{ upperBgImage }});"></view>
  <text class="word">{{ currentWord.word }}</text>
  <text class="meaning" wx:if="{{ showMeaning }}">{{ currentWord.meaning }}</text>
</view> -->

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
            <navigator url="/pages/anki/anki_dri">
                <view class="floating-icon" @tap="navigateBack">
                    <text class="icon">↩️</text>
                </view>
            </navigator>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            words: [],

            // 存储单词列表
            currentWord: null,

            // 当前展示的单词
            currentIndex: -1,

            // 当前单词在列表中的索引
            showMeaning: false,

            // 是否显示单词的含义
            // 当前课程编号
            lesson: 0,

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
        // 切换显示单词的含义
        showMeaningFun: function () {
            const currentWord = this.currentWord;
            if (currentWord) {
                const newShowMeaning = !this.showMeaning;
                if (newShowMeaning) {
                    const bgImageUrl = currentWord.url2;
                } else {
                    const bgImageUrl = currentWord.url1;
                }
                this.setData({
                    showMeaning: newShowMeaning
                    // upperBgImage: bgImageUrl
                });
            }
        },

        // 加载本地存储中的数据
        loadStoredData: function () {
            const allWords = uni.getStorageSync('words') || [];
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
                        url: '../anki/anki_dri?refresh=true'
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
            uni.setStorageSync('words', words);
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
                        word: word.word,
                        meaning: word.meaning,
                        lesson: word.lesson,
                        status: 3
                    };
                }
                return word;
            });

            // 重置所有单词的学习进度为“忘记”

            console.log('更新数据:', updatedWords);

            // 更新本地存储中的数据
            const allWords = uni.getStorageSync('words') || [];
            const updatedWordsInStorage = allWords.map((word) => {
                const updatedWord = updatedWords.find((updated) => updated.word === word.word);
                if (updatedWord) {
                    return updatedWord;
                }
                return word;
            });
            uni.setStorageSync('words', updatedWordsInStorage); // 更新本地数据

            this.setData({
                words: updatedWords,
                currentWord: updatedWords[this.currentIndex],
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
            const wordArray = this.words.filter((word) => word.status >= 1);
            if (wordArray.length === 0) {
                this.showAllWordsLearnedToast();
                return;
            }
            const nextIndex = Math.floor(Math.random() * wordArray.length);
            const currentWord = wordArray[nextIndex];
            this.setData({
                currentWord: currentWord,
                currentIndex: nextIndex,
                showMeaning: false
                // upperBgImage: url1 // 设置为 url1 的值
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
                showMeaning: true
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
            const allWords = uni.getStorageSync('words') || [];
            const updatedWordsInStorage = allWords.map((word) => {
                if (word.word === updatedWord.word) {
                    return updatedWord;
                }
                return word;
            });
            uni.setStorageSync('words', updatedWordsInStorage);

            // 显示下一个单词
            this.nextWord();
        }
    }
};
</script>
<style>
@import './anki2.css';
</style>
