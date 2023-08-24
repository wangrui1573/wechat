<template>
    <!-- pages/rss/index.wxml -->
    <view class="container">
        <image class="logo" src="https://avatars.githubusercontent.com/u/42831156?v=4"></image>
        <block v-for="(group, index) in list" :key="index">
            <view class="zan-panel-title">{{ group.title }}</view>

            <view class="zan-panel">
                <navigator class="zan-cell zan-cell--access" :url="item.path" v-for="(item, index1) in group.content" :key="index1">
                    <view class="zan-cell__bd">{{ item.name }}</view>

                    <view class="zan-cell__ft"></view>
                </navigator>
            </view>
        </block>

        <!-- 底部导航栏 -->
        <view class="bottom-nav">
            <navigator class="nav-item" url="/pages/rss/index" open-type="redirect">
                <view class="iconfont wx-rss2"></view>
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
                <view class="iconfont wx-guanyuwo"></view>
                <view class="nav-text">我的</view>
            </navigator>
        </view>
    </view>
</template>

<script>
// pages/rss/index.js

export default {
    data() {
        return {
            list: [
                {
                    title: 'RSS站点',
                    content: []
                },
                {
                    title: '常用工具',
                    content: [
                        {
                            name: 'IP计算器',
                            path: '/pages/ip/ip'
                        }
                        // {
                        //   name: '导入/导出',
                        //   path: '/pages/rssManage/export'
                        // },
                        // {
                        //   name: '关于',
                        //   path: '/pages/about/index'
                        // }
                    ]
                },
                {
                    title: '设置',
                    content: [
                        {
                            name: '管理订阅列表',
                            path: '/pages/rssManage/index'
                        },
                        {
                            name: '导入/导出',
                            path: '/pages/rssManage/export'
                        },
                        {
                            name: '关于',
                            path: '/pages/about/index'
                        }
                    ]
                }
            ],

            group: {
                title: '',
                content: []
            }
        };
    },
    onLoad: function () {
        this.showFetchingDataToast();
        this.fetchRemoteData();
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
        showFetchingDataToast: function () {
            uni.showToast({
                title: '正在获取数据...',
                icon: 'loading',
                duration: 1500
            });
        },

        fetchRemoteData: function () {
            var that = this;

            // 从本地存储中获取远程站点配置
            var remoteURL = uni.getStorageSync('remoterss_config');

            // 如果本地存储中有远程站点配置，则使用该配置作为 URL
            // var requestURL = remoteURL ? remoteURL : 'https://gist.githubusercontent.com/wangrui1573/72a5562a0499dd972dcdba1bb04888ce/raw/wx_rss.json';
            if (remoteURL) {
                var requestURL = remoteURL;
            } else {
                var requestURL = '';
            }
            uni.request({
                url: requestURL,
                // 使用动态的 URL
                success: function (res) {
                    var remoteSites = res.data;
                    var localSites = uni.getStorageSync('Sites') || [];
                    remoteSites.forEach(function (remoteSite) {
                        if (
                            !localSites.some(function (localSite) {
                                return localSite.url === remoteSite.url;
                            })
                        ) {
                            localSites.push(remoteSite);
                        }
                    });
                    if (remoteURL) {
                        uni.setStorageSync('Sites', localSites); // 仅在远程站点配置存在时更新本地存储
                        that.updateList(localSites);
                    } else {
                        uni.setStorageSync('Sites', localSites); // 在没有远程站点配置时，更新本地存储
                        that.updateList(localSites);
                    }
                },
                fail: function () {
                    that.hideToast();
                    uni.showToast({
                        title: '请配置站点',
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        },

        updateList: function (sites) {
            var newData = this.list.slice();
            newData[0].content = sites.map(function (val, key) {
                // return { name: val.name, path: "/pages/rss/list?url=" + encodeURIComponent(val.url) + "&tid=" + key };
                return {
                    name: val.name,
                    path: '/pages/rss/list?url=' + val.url + '&tid=' + key
                };
            });
            this.setData({
                list: newData
            });
            this.hideToast();
        },

        hideToast: function () {
            uni.hideToast();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
