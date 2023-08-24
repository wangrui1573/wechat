<template>
    <view class="page">
        <view class="upper" @tap="showMeaningFun">
            <text class="word">{{ currentWord.word }}</text>
            <text class="meaning" v-if="showMeaning">{{ currentWord.meaning }}</text>
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
            <navigator url="/pages/anki/anki_dri" open-type="redirect">
                <view class="floating-icon">
                    <text class="icon">📚</text>
                    <text class="course">课程</text>
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
            currentWord: null,
            currentIndex: -1,
            learningPhase: 3,
            showMeaning: false,
            t1: 0,
            t2: 0,
            t3: ''
        };
    },
    onLoad: function () {
        this.initializeData(this.loadStoredData());
        this.nextWord();
        // 在后台更新远程数据
        this.updateRemoteData();

        // 检查本地存储，看是否已经显示过弹窗
        const hasShownModal = uni.getStorageSync('hasShownModal');
        if (!hasShownModal) {
            // 若没有显示过弹窗，则显示提示弹窗
            uni.showModal({
                title: '使用提示',
                content: '点击屏幕显示答案',
                showCancel: false,
                confirmText: '知道了'
            });

            // 将已显示弹窗的标志位存储在本地
            uni.setStorageSync('hasShownModal', true);
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        updateRemoteData: function () {
            const that = this;

            // 显示更新中提示
            // wx.showLoading({
            //   title: '单词数据更新中...',
            //   mask: true // 遮罩层，防止用户操作
            // });

            uni.request({
                url: 'https://db.real9.cn/word/',
                success: function (res) {
                    // 隐藏更新中提示
                    uni.hideLoading();
                    const remoteWords = res.data;
                    console.log('远程单词数据：', remoteWords);

                    // 获取本地数据
                    const localWords = that.loadStoredData();

                    // 合并数据并更新本地
                    const mergedWords = that.mergeWords(localWords, remoteWords);
                    that.saveStoredData(mergedWords); // 保存更新后的数据到本地
                    that.initializeData(mergedWords); // 初始化数据

                    // 弹窗提示更新完成
                    uni.showToast({
                        title: '数据更新完成',
                        icon: 'success',
                        duration: 1500 // 持续时间
                    });
                },

                fail: function (err) {
                    // 隐藏更新中提示
                    uni.hideLoading();
                    console.error('远程数据获取失败：', err);
                    that.initializeData([]);

                    // 弹窗提示更新失败
                    uni.showToast({
                        title: '数据更新失败',
                        icon: 'none',
                        duration: 1500 // 持续时间
                    });
                }
            });
        },

        //朗读单词
        read: function () {
            const currentWord = this.currentWord;
            if (currentWord) {
                app.globalData.speakText(currentWord.word);
            }
        },

        mergeWords: function (localWords, remoteWords) {
            if (!localWords || localWords.length === 0) {
                return remoteWords;
            }
            const mergedWords = [];

            // 处理本地数据
            for (const localWord of localWords) {
                const remoteWord = remoteWords.find((r) => r.word === localWord.word);
                if (remoteWord) {
                    mergedWords.push({
                        word: localWord.word,
                        meaning: remoteWord.meaning,
                        lesson: remoteWord.lesson,
                        status: localWord.status // 保持状态不变
                    });
                } else {
                    mergedWords.push(localWord);
                }
            }

            // 处理远程数据
            for (const remoteWord of remoteWords) {
                const existingWord = localWords.find((l) => l.word === remoteWord.word);
                if (!existingWord) {
                    mergedWords.push(remoteWord);
                }
            }
            const t1 = mergedWords.length;
            console.log('单词数量：', t1);
            this.setData({
                t1: t1
            });
            const t2 = mergedWords.filter((word) => word.status === 0).length;
            console.log('学单词数量：', t2);
            this.setData({
                t2: t2
            });
            return mergedWords;
        },

        initializeData: function (initialWords) {
            uni.setStorageSync('words', initialWords);
            this.setData({
                words: initialWords
            });
            this.nextWord();
        },

        //---------------------------

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

        showMeaningFun: function () {
            this.setData({
                showMeaning: !this.showMeaning
            });
        },

        loadStoredData: function () {
            const localWords = uni.getStorageSync('words') || [];
            return localWords;
        },

        saveStoredData: function (updatedWords) {
            uni.setStorageSync('words', updatedWords);
            this.setData({
                words: updatedWords
            });
        },

        showAllWordsLearnedToast: function () {
            uni.showToast({
                title: '所有单词已学完！',
                icon: 'success',
                duration: 2000
            });
        },

        nextWord: function () {
            const wordArray = this.words.filter((word) => word.status >= 1);
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
            const t2 = this.words.filter((word) => word.status === 0).length;
            const t1 = this.words.length;
            const t3 = ((t2 / t1) * 100).toFixed(1); // 计算百分比，保留两位小数
            this.setData({
                t2: t2,
                t1: t1,
                t3: t3
            });
        },

        onWordBlockClick: function () {
            this.setData({
                showMeaning: true
            });
        },

        resetStatus: function () {
            const updatedWords = this.words.map((word) => {
                return {
                    word: word.word,
                    meaning: word.meaning,
                    lesson: word.lesson,
                    // 更新lesson栏位
                    status: 3
                };
            });
            console.log('更新数据:', updatedWords);
            uni.setStorageSync('words', updatedWords); // 将更新后的数据直接覆盖到本地存储

            this.setData({
                words: updatedWords,
                currentWord: updatedWords[this.currentIndex],
                showMeaning: false
            });
            this.nextWord();
        },

        onButtonClick: function (event) {
            const buttonText = event.currentTarget.dataset.text;
            const word = this.currentWord;
            if (buttonText === '忘记') {
                word.status = 3;
            } else if (buttonText === '困难') {
                word.status = 2;
            } else if (buttonText === '熟悉') {
                word.status = 1;
            } else if (buttonText === '牢记') {
                word.status = 0;
            }
            this.saveStoredData(this.words); // 保存更新后的数据到本地

            this.nextWord();
        }
    }
};
</script>
<style>
@import './anki.css';
</style>
