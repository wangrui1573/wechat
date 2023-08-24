<template>
    <view style="height: 100%">
        <view class="container">
            <view class="doc-title zan-hairline--bottom">TOAST</view>

            <view class="zan-btns" style="margin-top: 15vh">
                <button class="zan-btn" @tap="showToast">显示toast</button>

                <button class="zan-btn" @tap="showIconToast">显示 Icon 图标的toast</button>

                <button class="zan-btn" @tap="showImageToast">自定义图片作为图标的toast</button>

                <button class="zan-btn" @tap="showLoadingToast">显示 Loading toast</button>

                <button class="zan-btn" @tap="showOnlyIcon">只显示图标的toast</button>

                <button class="zan-btn" @tap="showLoading">显示 Loading</button>
            </view>
        </view>

        <!-- parse <template is="zan-toast" :data="zanToast"></template> -->
        <block name="zan-toast" v-if="false">
            <view :class="'zan-toast ' + (!zanToast.title ? 'zan-toast--notitle' : '')" v-if="zanToast.show" @tap="clearZanToast">
                <!-- icon 展示 -->
                <block v-if="zanToast.icon || zanToast.image">
                    <view v-if="zanToast.image" class="zan-toast__icon zan-toast__icon-image" :style="'background-image: url(' + zanToast.image + ');'"></view>
                    <view v-else-if="zanToast.icon === 'loading'" class="zan-toast__icon zan-toast__icon-loading">
                        <view class="zan-loading"></view>
                    </view>
                    <view wx:else :class="'zan-toast__icon zan-icon zan-icon-' + zanToast.icon"></view>
                </block>

                <!-- 文案展示 -->
                <view v-if="zanToast.title">{{ zanToast.title }}</view>
            </view>
        </block>
    </view>
</template>

<script>
const Zan = require('../../../dist/index');
export default Object.assign({}, Zan.Toast, {
    data: {},
    showToast() {
        this.showZanToast('toast的内容');
    },
    showIconToast() {
        this.showZanToast(
            {
                title: 'toast的内容',
                icon: 'fail'
            },
            1000
        );
    },
    showImageToast() {
        this.showZanToast({
            title: 'toast的内容',
            image: 'https://b.yzcdn.cn/v2/image/dashboard/secured_transaction/suc_green@2x.png'
        });
    },
    showLoadingToast() {
        this.showZanToast({
            title: 'toast的内容',
            icon: 'loading'
        });
    },
    showOnlyIcon() {
        this.showZanToast({
            icon: 'fail'
        });
    },
    showLoading() {
        this.showZanLoading('加载中');
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/toast/index.css';
</style>
