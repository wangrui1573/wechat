<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
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
</template>

<script>
var Switch = {
    _handleZanSwitchChange(e) {
        var dataset = e.currentTarget.dataset;
        var checked = !dataset.checked;
        var loading = dataset.loading;
        var disabled = dataset.disabled;
        var componentId = dataset.componentId;
        if (loading || disabled) {
            return;
        }
        console.info('[zan:switch:change]', {
            checked,
            componentId
        });
        if (this.handleZanSwitchChange) {
            this.handleZanSwitchChange({
                checked,
                componentId
            });
        } else {
            console.warn('页面缺少 handleZanSwitchChange 回调函数');
        }
    }
};
module.exports = Switch;
</script>
<style>
@import './index.css';
</style>
