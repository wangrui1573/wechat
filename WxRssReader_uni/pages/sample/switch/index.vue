<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">SWITCH</view>

        <view class="zan-panel-title">同步开关</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-switch" :data="...sync, componentId: 'sync'"/> -->
            <block name="zan-switch" v-if="false">
                <view
                    :class="'zan-switch zan-switch--' + (checked ? 'on' : 'off') + ' ' + (disabled ? 'zan-swtich--disabled' : '')"
                    :data-checked="checked"
                    :data-loading="loading"
                    :data-disabled="disabled"
                    :data-component-id="'sync'"
                    @tap="_handleZanSwitchChange"
                >
                    <view class="zan-switch__circle">
                        <view v-if="loading" class="zan-switch__loading"></view>
                    </view>
                    <view class="zan-switch__bg"></view>
                </view>
            </block>
        </view>

        <view class="zan-panel-title">异步开关</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-switch" :data="...async, componentId: 'async'"/> -->
            <block name="zan-switch" v-if="false">
                <view
                    :class="'zan-switch zan-switch--' + (checked ? 'on' : 'off') + ' ' + (disabled ? 'zan-swtich--disabled' : '')"
                    :data-checked="checked"
                    :data-loading="loading"
                    :data-disabled="disabled"
                    :data-component-id="'sync'"
                    @tap="_handleZanSwitchChange"
                >
                    <view class="zan-switch__circle">
                        <view v-if="loading" class="zan-switch__loading"></view>
                    </view>
                    <view class="zan-switch__bg"></view>
                </view>
            </block>
        </view>

        <view class="zan-panel-title">开关不可用</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-switch" :data="checked: false, disabled: true, componentId: 'switch3'"/> -->
            <block name="zan-switch" v-if="false">
                <view
                    :class="'zan-switch zan-switch--' + (false ? 'on' : 'off') + ' ' + (true ? 'zan-swtich--disabled' : '')"
                    :data-checked="false"
                    :data-loading="loading"
                    :data-disabled="true"
                    :data-component-id="'sync'"
                    @tap="_handleZanSwitchChange"
                >
                    <view class="zan-switch__circle">
                        <view v-if="loading" class="zan-switch__loading"></view>
                    </view>
                    <view class="zan-switch__bg"></view>
                </view>
            </block>
            <!-- parse <template is="zan-switch" :data="checked: true, disabled: true, componentId: 'switch4'"/> -->
            <block name="zan-switch" v-if="false">
                <view
                    :class="'zan-switch zan-switch--' + (false ? 'on' : 'off') + ' ' + (true ? 'zan-swtich--disabled' : '')"
                    :data-checked="false"
                    :data-loading="loading"
                    :data-disabled="true"
                    :data-component-id="'sync'"
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
</template>

<script>
var Zan = require('../../../dist/index');
export default Object.assign({}, Zan.Switch, {
    data: {
        sync: {
            checked: false
        },
        async: {
            checked: true,
            loading: false
        }
    },
    handleZanSwitchChange(e) {
        var componentId = e.componentId;
        var checked = e.checked;
        if (componentId == 'sync') {
            // 同步开关
            this.setData({
                [`${componentId}.checked`]: checked
            });
        } else if (componentId == 'async') {
            // 异步开关
            this.setData({
                [`${componentId}.loading`]: true
            });
            setTimeout(() => {
                this.setData({
                    [`${componentId}.loading`]: false,
                    [`${componentId}.checked`]: checked
                });
            }, 500);
        }
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/switch/index.css';
</style>
