<template>
    <!-- pages/ip/ip.wxml -->
    <view class="container">
        <view class="input-container">
            <text class="input-label">IP地址：</text>
            <input class="input-box" placeholder="请输入IP地址" @input="handleInput" data-key="ipAddress" />
        </view>
        <view class="input-container">
            <text class="input-label">掩码长度：</text>
            <input class="input-box" placeholder="请输入掩码长度" @input="handleInput" data-key="subnetMask" />
        </view>
        <view class="spacer90"></view>
        <button class="calculate-button" @tap="calculateRange">计算IP地址段</button>
        <view class="result">{{ ipRange }}</view>
    </view>
</template>

<script>
// pages/ip-calculator/index.js

export default {
    data() {
        return {
            ipAddress: '',
            subnetMask: '',
            ipRange: ''
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
        // 处理用户输入的IP地址和掩码长度
        handleInput: function (e) {
            const { value } = e.detail;
            const key = e.currentTarget.dataset.key;
            this.setData({
                [key]: value
            });
        },

        // 计算IP地址段
        calculateRange: function () {
            const { ipAddress, subnetMask } = this;
            if (!ipAddress || !subnetMask) {
                uni.showToast({
                    title: '请输入IP地址和掩码长度',
                    icon: 'none'
                });
                return;
            }
            const ipParts = ipAddress.split('.');
            const mask = 4294967295 << (32 - parseInt(subnetMask));
            const startIp = ((ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3]) & mask;
            const endIp = startIp | (~mask & 4294967295);
            const startIpArray = [(startIp >> 24) & 255, (startIp >> 16) & 255, (startIp >> 8) & 255, startIp & 255];
            const endIpArray = [(endIp >> 24) & 255, (endIp >> 16) & 255, (endIp >> 8) & 255, endIp & 255];
            const ipRange = startIpArray.join('.') + '~' + endIpArray.join('.');
            this.setData({
                ipRange
            });
        }
    }
};
</script>
<style>
@import './ip.css';
</style>
