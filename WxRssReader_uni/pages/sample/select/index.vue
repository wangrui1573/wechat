<template>
    <view style="height: 100%">
        <view class="container">
            <view class="doc-title zan-hairline--bottom">SELECT</view>

            <view class="zan-panel-title">基础用法</view>
            <view class="zan-panel">
                <view>
                    <!-- parse <template is="zan-select" :data="items, checkedValue: checked.base, componentId: 'base'"></template> -->
                    <block name="zan-select">
                        <radio-group class="zan-select__list" :name="name || 'base' || ''" @change="_handleZanSelectChange" :data-component-id="'base'">
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
            </view>

            <view class="zan-panel-title">自定义高亮颜色</view>
            <view class="zan-panel">
                <view>
                    <!-- parse <template is="zan-select" :data="items, checkedValue: checked.color, activeColor, componentId: 'color'"></template> -->
                    <block name="zan-select" v-if="false">
                        <radio-group class="zan-select__list" :name="name || 'base' || ''" @change="_handleZanSelectChange" :data-component-id="'base'">
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
            </view>

            <view class="zan-panel-title">Form 表单中的select应用</view>
            <form @submit="formSubmit">
                <view class="zan-panel">
                    <view>
                        <!-- parse <template is="zan-select" 
 :data="items, checkedValue: checked.form, name: 'formtest', componentId: 'form'"></template> -->
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
                </view>

                <view class="zan-btns">
                    <button class="zan-btn zan-btn--primary" formType="submit">提交数据</button>
                </view>
            </form>
        </view>

        <!-- parse <template is="zan-toptips" :data="zanTopTips"></template> -->
        <block name="zan-toptips">
            <view :class="'zan-toptips ' + (zanTopTips.show ? 'zan-toptips--show' : '')">{{ zanTopTips.content }}</view>
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
var Zan = require('../../../dist/index');
export default Object.assign({}, Zan.Select, Zan.TopTips, {
    data: {
        items: [
            {
                padding: 0,
                value: '1',
                name: '选项一'
            },
            {
                padding: 0,
                value: '2',
                name: '选项二'
            }
        ],
        checked: {
            base: -1,
            color: -1,
            form: -1
        },
        activeColor: '#4b0'
    },
    handleZanSelectChange({ componentId, value }) {
        this.setData({
            [`checked.${componentId}`]: value
        });
    },
    formSubmit(event) {
        console.log('[zan:field:submit]', event.detail.value);
        this.showZanTopTips(`选中的值为${event.detail.value.formtest}`);
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/select/index.css';
@import '@/dist/toptips/index.css';
</style>
