<template>
    <!-- pages/sub/sub.wxml -->
    <view class="container">
        <view class="input-container">
            <text class="input-label">请输入文本：</text>
            <input class="input-box" placeholder="请输入文本" @input="handleInput" />
        </view>
        <button class="scroll-button" @tap="goToScrollPage">大字滚动显示</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            inputText: '' // 用户输入的文本
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
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
        handleInput: function (e) {
            this.setData({
                inputText: e.detail.value
            });
        },

        goToScrollPage: function () {
            uni.navigateTo({
                url: '/pages/sub/sub_scroll?text=' + this.inputText
            });
        }
    }
};
</script>
<style>
@import './sub.css';
</style>
