<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">POPUP</view>

        <view class="zan-btns" style="margin-top: 30vh">
            <button class="zan-btn" @tap="togglePopup">弹出popup</button>
            <button class="zan-btn" @tap="toggleTopPopup">从顶部弹出popup</button>
            <button class="zan-btn" @tap="toggleBottomPopup">从底部弹出popup</button>
            <button class="zan-btn" @tap="toggleLeftPopup">从左边弹出popup</button>
            <button class="zan-btn" @tap="toggleRightPopup">从右边弹出popup</button>
        </view>

        <view :class="'zan-popup ' + (showPopup ? 'zan-popup--show' : '')">
            <view class="zan-popup__mask" @tap="togglePopup"></view>
            <view class="zan-popup__container popup-example--center">
                <view class="zan-btns">
                    <button class="zan-btn" @tap="togglePopup">关闭 popup</button>
                </view>
            </view>
        </view>

        <view :class="'popup-example--left zan-popup zan-popup--left ' + (showLeftPopup ? 'zan-popup--show' : '')">
            <view class="zan-popup__mask" @tap="toggleLeftPopup"></view>
            <view class="zan-popup__container">
                <view class="zan-btns">
                    <button class="zan-btn" @tap.stop.prevent="toggleLeftPopup">关闭 popup</button>
                </view>
            </view>
        </view>

        <view :class="'popup-example--right zan-popup zan-popup--right ' + (showRightPopup ? 'zan-popup--show' : '')">
            <view class="zan-popup__mask" @tap.stop.prevent="toggleRightPopup"></view>
            <view class="zan-popup__container">
                <view class="zan-btns">
                    <button class="zan-btn" @tap.stop.prevent="toggleRightPopup">关闭 popup</button>
                </view>
            </view>
        </view>

        <view :class="'popup-example--top zan-popup zan-popup--top ' + (showTopPopup ? 'zan-popup--show' : '')">
            <view class="zan-popup__mask" @tap.stop.prevent="toggleTopPopup"></view>
            <view class="zan-popup__container">内容</view>
        </view>

        <view :class="'popup-example--bottom zan-popup zan-popup--bottom ' + (showBottomPopup ? 'zan-popup--show' : '')">
            <view class="zan-popup__mask" @tap.stop.prevent="toggleBottomPopup"></view>
            <view class="zan-popup__container">
                <view class="zan-btns">
                    <button class="zan-btn" @tap.stop.prevent="toggleBottomPopup">关闭 popup</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            showPopup: false,
            showLeftPopup: false,
            showRightPopup: false,
            showTopPopup: false,
            showBottomPopup: false
        };
    },
    methods: {
        togglePopup() {
            this.setData({
                showPopup: !this.showPopup
            });
        },

        toggleLeftPopup() {
            this.setData({
                showLeftPopup: !this.showLeftPopup
            });
        },

        toggleRightPopup() {
            this.setData({
                showRightPopup: !this.showRightPopup
            });
        },

        toggleBottomPopup() {
            this.setData({
                showBottomPopup: !this.showBottomPopup
            });
        },

        toggleTopPopup() {
            this.setData({
                showTopPopup: !this.showTopPopup
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
