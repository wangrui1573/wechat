<template>
    <!-- pages/rssManage/index.wxml -->
    <view class="container">
        <block>
            <view class="zan-panel-title">订阅列表</view>
            <view class="zan-panel">
                <navigator class="zan-cell zan-cell--access" :url="'/pages/rssManage/edit?id=' + index" open-type="redirect" v-for="(item, index) in items" :key="index">
                    <view class="zan-cell__bd">{{ item.name }}</view>

                    <view class="zan-cell__ft"></view>
                </navigator>
            </view>
            <view class="zan-btns">
                <button @tap="addSite" class="zan-btn zan-btn--primary">
                    <i class="zan-icon zan-icon-add"></i>
                    新增站点
                </button>
            </view>
        </block>

        <!-- 远程站点配置 -->
        <block>
            <view class="zan-panel-title">远程站点配置</view>
            <view class="zan-panel">
                <input class="rssremote_input" placeholder="请输入远程站点的URL" @input="handleRemoteInput" :value="remoterss_config" />
                <button @tap="saveRemoteConfig" class="zan-btn zan-btn--primary">
                    <i class="zan-icon zan-icon-passed"></i>
                    保存
                </button>
            </view>
        </block>
    </view>
</template>

<script>
// pages/rssManage/index.js
export default {
    data() {
        return {
            remoterss_config: '',
            // 初始的远程站点配置为空
            items: uni.getStorageSync('Sites')
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            items: uni.getStorageSync('Sites')
        });
        const remoteConfig = uni.getStorageSync('remoterss_config');
        if (remoteConfig) {
            this.setData({
                remoterss_config: remoteConfig
            });
        }
    },
    methods: {
        addSite: function () {
            uni.redirectTo({
                url: '/pages/rssManage/edit'
            });
        },

        handleRemoteInput: function (event) {
            this.setData({
                remoterss_config: event.detail.value
            });
        },

        saveRemoteConfig: function () {
            const remoteURL = this.remoterss_config;
            // 将远程站点配置保存到本地存储
            uni.setStorageSync('remoterss_config', remoteURL);
            console.log('保存远程站点配置:', remoteURL);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
