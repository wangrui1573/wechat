<template>
    <!-- pages/rssManage/export.wxml -->
    <view class="container">
        <view class="zan-panel-title">OPML导入/导出</view>
        <form @submit="importOpml">
            <view class="zan-panel">
                <view class="zan-cell zan-field">
                    <textarea class="zan-field__input zan-cell__bd" style="height: 20em" :value="opml" maxlength="-1" name="opml"></textarea>
                </view>
            </view>
            <view style="padding: 15px">
                <button @tap="copyOpml" class="zan-btn zan-btn--small zan-btn--primary">导出至剪切板</button>
                <button formType="submit" class="zan-btn zan-btn--small zan-btn--warn">导入</button>
            </view>
        </form>
    </view>
</template>

<script>
// pages/rssManage/export.js
export default {
    data() {
        return {
            opml: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var storeSite = uni.getStorageSync('Sites');
        var sites = '<?xml version="1.0" encoding="ISO-8859-1"?><opml version="2.0">\n';
        sites += '<head><title>岩兔RSS阅读器</title></head>\n';
        sites += '<body>\n';
        if (storeSite != '') {
            storeSite.forEach(function (val, key) {
                sites += '<outline type="rss" text="' + val.name + '" xmlUrl="' + val.url + '"/>\n';
            });
        }
        sites += '</body>';
        this.setData({
            opml: sites
        });
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
        copyOpml: function () {
            uni.setClipboardData({
                data: this.opml,
                success: function (res) {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'success',
                        duration: 2000
                    });
                }
            });
        },

        importOpml: function (e) {
            var opml = e.detail.value.opml;
            var xml2json = require('../../lib/xml2json.js');
            var json = xml2json(opml);
            //console.log(json);

            if (!json.opml) {
                uni.showToast({
                    title: '请输入OPML格式',
                    icon: 'none',
                    duration: 2000
                });
            } else if (!json.opml.body) {
                uni.showToast({
                    title: '缺少body',
                    icon: 'none',
                    duration: 2000
                });
            } else if (!json.opml.body.outline) {
                uni.showToast({
                    title: 'body内无outline',
                    icon: 'none',
                    duration: 2000
                });
            } else {
                var lines = json.opml.body.outline;
                var sites = [];
                //console.log(lines);
                lines.forEach(function (val, key) {
                    if (val.text && val.xmlUrl) {
                        sites.push({
                            name: val.text,
                            url: val.xmlUrl
                        });
                    }
                });
                uni.setStorage({
                    key: 'Sites',
                    data: sites,
                    success: function () {
                        uni.showToast({
                            title: '导入成功' + sites.length + '条',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                });
            }
        }
    }
};
</script>
<style>
@import './export.css';
</style>
