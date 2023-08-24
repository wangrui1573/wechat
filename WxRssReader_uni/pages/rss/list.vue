<template>
    <!-- pages/rss/list.wxml -->
    <view class="container">
        <block>
            <view class="zan-panel-title">{{ title }}</view>
            <view class="zan-panel">
                <navigator class="zan-cell zan-cell--access" :url="'/pages/rss/view?id=' + index" v-for="(item, index) in items" :key="index">
                    <view class="zan-cell__bd">{{ item.title.text }}</view>

                    <view class="zan-cell__ft"></view>
                </navigator>
            </view>
        </block>
    </view>
</template>

<script>
// pages/rss/list.js
export default {
    data() {
        return {
            // url: 'https://bak.yantuz.cn:8000/view.php?v=' + Math.random() + "&url=",
            url: 'https://pxy2.real9.cn/s/',
            title: '岩兔站',
            items: []
        };
    },
    onLoad: function (options) {
        this.showFetchingRssDataToast();
        const that = this;
        const sites = uni.getStorageSync('Sites');
        const app = getApp();
        let url = this.url;
        if (options.tid >= 0) {
            that.setData({
                title: sites[options.tid].name
            });
        }
        if (options.url && options.url != '') {
            url += options.url;
        } else {
            url += 'https://yantuz.cn/atom.xml';
        }
        app.globalData.getRss(url, function (json) {
            uni.setStorage({
                key: 'SiteData',
                data: json
            });
            that.setData({
                items: json
            });
        });
    },
    methods: {
        showFetchingRssDataToast: function () {
            uni.showToast({
                title: '正在获取RSS数据...',
                icon: 'loading',
                duration: 1500
            });
        }
    }
};
</script>
<style>
@import './list.css';
</style>
