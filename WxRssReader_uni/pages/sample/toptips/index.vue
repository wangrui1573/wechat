<template>
    <view style="height: 100%">
        <view class="container">
            <view class="doc-title zan-hairline--bottom">TOPTIPS</view>

            <view class="zan-btns" style="margin-top: 30vh">
                <button class="zan-btn" @tap="showTopTips">显示toptips</button>
            </view>
        </view>

        <!-- parse <template is="zan-toptips" :data="zanTopTips"></template> -->
        <block name="zan-toptips" v-if="false">
            <view :class="'zan-toptips ' + (zanTopTips.show ? 'zan-toptips--show' : '')">{{ zanTopTips.content }}</view>
        </block>
    </view>
</template>

<script>
var Zan = require('../../../dist/index');
export default Object.assign({}, Zan.TopTips, {
    data: {},
    showTopTips() {
        this.showZanTopTips('toptips的内容');
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/toptips/index.css';
</style>
