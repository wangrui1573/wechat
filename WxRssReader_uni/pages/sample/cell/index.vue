<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">CELL</view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">单行列表</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">单行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__icon zan-icon zan-icon-checked" style="color: #38f"></view>
                <view class="zan-cell__bd">单行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">
                    <view class="zan-cell__text">单行列表</view>
                    <view class="zan-cell__desc">附加描述</view>
                </view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">单行列表</view>
                <view class="zan-cell__ft"></view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell zan-cell--switch">
                <view class="zan-cell__bd">开关</view>
                <view class="zan-cell__ft">
                    <!-- parse <template is="zan-switch" :data="checked"/> -->
                    <block name="zan-switch">
                        <view
                            :class="'zan-switch zan-switch--' + (checked ? 'on' : 'off') + ' ' + (disabled ? 'zan-swtich--disabled' : '')"
                            :data-checked="checked"
                            :data-loading="loading"
                            :data-disabled="disabled"
                            :data-component-id="componentId"
                            @tap="_handleZanSwitchChange"
                        >
                            <view class="zan-switch__circle">
                                <view v-if="loading" class="zan-switch__loading"></view>
                            </view>
                            <view class="zan-switch__bg"></view>
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">单行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">多行列表</view>
            </view>
            <view class="zan-cell">
                <view class="zan-cell__bd">多行列表</view>
            </view>
            <view class="zan-cell">
                <view class="zan-cell__bd">多行列表</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
            <view class="zan-cell">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
            <view class="zan-cell">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft"></view>
            </view>
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft"></view>
            </view>
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft"></view>
            </view>
        </view>

        <view class="zan-panel">
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
            <view class="zan-cell zan-cell--access">
                <view class="zan-cell__bd">多行列表</view>
                <view class="zan-cell__ft">详细信息</view>
            </view>
        </view>
    </view>
</template>

<script>
var Zan = require('../../../dist/index');
export default Object.assign({}, Zan.Switch, {
    data: {
        checked: false
    },
    onLoad() {},
    onShow() {},
    handleZanSwitchChange(e) {
        this.setData({
            checked: e.checked
        });
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/switch/index.css';
</style>
