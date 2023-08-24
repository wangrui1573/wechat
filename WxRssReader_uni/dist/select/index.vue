<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-select" v-if="false">
            <radio-group class="zan-select__list" :name="'formtest' || 'base' || ''" @change="_handleZanSelectChange" :data-component-id="'base'">
                <label v-for="(item, index) in items" :key="index">
                    <view class="zan-cell">
                        <radio class="zan-select__radio" :value="item.value" :checked="item.value === checked.base" />
                        <view class="zan-cell__bd" :style="parse.getItemStyle(item, checked.base, activeColor)">{{ item.name }}</view>
                        <view v-if="item.value === checked.base" class="zan-cell__ft">
                            <icon type="success_no_circle" :color="parse.getColor(activeColor)" size="14"></icon>
                        </view>
                    </view>
                </label>
            </radio-group>
        </block>
    </view>
</template>
<script module="parse" lang="wxs">
function getColor(color) {
  color = color || '#ff4444'
  return color;
}

module.exports = {
  getColor: getColor,
  getItemStyle: function(item, checkedValue, activeColor) {
    var padding = item.padding * 10;
    var style = 'padding-left: ' + padding + 'px;';

    // 如果为选中状态，则高亮
    if (item.value === checkedValue) {
      style += 'color: ' + getColor(activeColor);
    }

    return style;
  }
};
</script>
<script>
const { extractComponentId } = require('../common/helper');
function handle(e) {
    const componentId = extractComponentId(e);
    const value = e.detail.value;
    callback.call(this, componentId, value);
}
function callback(componentId, value) {
    const e = {
        componentId,
        value
    };
    console.info('[zan:Select:change]', e);
    if (this.handleZanSelectChange) {
        this.handleZanSelectChange(e);
    } else {
        console.warn('页面缺少 handleZanSelectChange 回调函数');
    }
}
module.exports = {
    _handleZanSelectChange(e) {
        handle.call(this, e);
    }
};
</script>
<style>
@import './index.css';
</style>
