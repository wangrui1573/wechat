<template>
    <view style="height: 100%">
        <!-- pages/rss/view.wxml -->

        <view class="doc-title zan-hairline--bottom">{{ title }}</view>
        <view class="doc-description">
            <!-- <template is="wxParse" :data="wxParseData:article.nodes"/> -->
            <mp-html :content="article"></mp-html>
            <hr />
            <view class="viewLink zan-c-green">
                原文地址：{{ url }}
                <button @tap="copyUrl" class="zan-btn zan-btn--small zan-btn--primary">复制链接</button>
            </view>
        </view>
    </view>
</template>

<script>
// pages/rss/view.js
var WxParse = require('../wxParse/wxParse.js');
var htmlDecodeByRegExp = function (str) {
    var s = '';
    if (str.length == 0) {
        return '';
    }
    s = str.replace(/&amp/g, '&');
    s = s.replace(/&lt/g, '<');
    s = s.replace(/&gt/g, '>');
    s = s.replace(/&nbsp/g, ' ');
    s = s.replace(/&#39/g, "'");
    s = s.replace(/&quot/g, '"');
    return s;
};
export default {
    data() {
        return {
            title: '标题',
            url: 'https://yantuz.cn',
            article: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        var items = uni.getStorageSync('SiteData');
        var item = items[options.id];
        //console.log(item);
        that.setData({
            title: item.title.text,
            url: item.link.text || item.link.href
        });
        if (item.content) {
            var html = item.content.text;
        } else {
            if (item.summary) {
                var html = item.summary.text;
            } else {
                var html = item.description.text;
            }
        }
        html = htmlDecodeByRegExp(html);
        that.article = that.escape2Html(html);
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
        copyUrl: function () {
            uni.setClipboardData({
                data: this.url,
                success: function (res) {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'success',
                        duration: 2000
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './view.css';
</style>
