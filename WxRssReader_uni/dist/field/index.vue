<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-field" v-if="false">
            <view :class="'zan-cell zan-field ' + (error ? 'zan-field--error' : '') + ' ' + (mode === 'wrapped' ? 'zan-field--wrapped' : '')">
                <view v-if="title" class="zan-cell__hd zan-field__title">{{ title }}</view>
                <textarea
                    v-if="type === 'textarea'"
                    auto-height
                    :name="name || componentId || ''"
                    :value="textareaValue"
                    :placeholder="placeholder"
                    :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                    placeholder-class="zan-field__placeholder"
                    :data-component-id="componentId || ''"
                ></textarea>
                <input
                    wx:else
                    :type="inputType || 'text'"
                    :name="name || componentId || ''"
                    :value="textareaValue"
                    :placeholder="placeholder"
                    :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                    placeholder-class="zan-field__placeholder"
                    :data-component-id="componentId || ''"
                />
            </view>
        </block>
    </view>
</template>

<script>
const { extractComponentId } = require('../common/helper');
module.exports = {
    _handleZanFieldChange(event) {
        const componentId = extractComponentId(event);
        event.componentId = componentId;
        console.info('[zan:field:change]', event);
        if (this.handleZanFieldChange) {
            return this.handleZanFieldChange(event);
        }
        console.warn('页面缺少 handleZanFieldChange 回调函数');
    },
    _handleZanFieldFocus(event) {
        const componentId = extractComponentId(event);
        event.componentId = componentId;
        console.info('[zan:field:focus]', event);
        if (this.handleZanFieldFocus) {
            return this.handleZanFieldFocus(event);
        }
        console.warn('页面缺少 handleZanFieldFocus 回调函数');
    },
    _handleZanFieldBlur(event) {
        const componentId = extractComponentId(event);
        event.componentId = componentId;
        console.info('[zan:field:blur]', event);
        if (this.handleZanFieldBlur) {
            return this.handleZanFieldBlur(event);
        }
        console.warn('页面缺少 handleZanFieldBlur 回调函数');
    }
};
</script>
<style>
@import './index.css';
</style>
