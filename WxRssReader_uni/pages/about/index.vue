<template>
    <view style="height: 100%">
        <!-- pages/about/index.wxml -->
        <view class="container">
            <view class="zan-panel-title">关于</view>
            <view class="zan-panel doc-description">
                <view class="wxParse-p">222</view>
                <view class="wxParse-p">11</view>
                <view class="wxParse-p">333</view>
                <view class="wxParse-p">博客地址：https://www.real7.cn/</view>
                <view class="wxParse-p">联系方式：realwang@live.cn</view>
            </view>
            <navigator class="nav-item" url="/pages/sample/dashboard/index">
                <view class="nav-icon">
                    <image src="https://gist.githubusercontent.com/wangrui1573/70c9954014e1ebdf57727e20a66918f8/raw/sub.svg" class="nav-icon-image"></image>
                </view>
                <view class="nav-text"></view>
            </navigator>
        </view>

        <!-- 底部导航栏 -->
        <view class="bottom-nav">
            <navigator class="nav-item" url="/pages/rss/index" open-type="redirect">
                <view class="iconfont wx-rss"></view>
                <view class="nav-text">RSS阅读器</view>
            </navigator>
            <navigator class="nav-item" url="/pages/tools/tools" open-type="redirect">
                <view class="iconfont wx-gongju-"></view>
                <view class="nav-text">小工具</view>
            </navigator>
            <navigator class="nav-item" url="/pages/anki/anki" open-type="redirect">
                <view class="iconfont wx-abc"></view>
                <view class="nav-text">ANKI背单词</view>
            </navigator>
            <navigator class="nav-item" url="/pages/about/index" open-type="redirect">
                <view class="iconfont wx-guanyuwo2"></view>
                <view class="nav-text">我的</view>
            </navigator>
        </view>
    </view>
</template>

<script>
// pages/about/index.js
export default {
    data() {
        return {};
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
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
