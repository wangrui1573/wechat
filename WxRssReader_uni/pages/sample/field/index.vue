<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">Field</view>

        <!-- Field 基础用法 -->
        <view class="zan-panel-title">基础用法</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-field" 
 :data="...config.base.name, value"></template> -->
            <block name="zan-field" v-if="false">
                <view :class="'zan-cell zan-field ' + (error ? 'zan-field--error' : '') + ' ' + (mode === 'wrapped' ? 'zan-field--wrapped' : '')">
                    <view v-if="title" class="zan-cell__hd zan-field__title">{{ title }}</view>
                    <textarea
                        v-if="type === 'textarea'"
                        auto-height
                        :name="name || componentId || ''"
                        :value="value"
                        :placeholder="placeholder"
                        :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                        placeholder-class="zan-field__placeholder"
                        :data-component-id="componentId || ''"
                    ></textarea>
                    <input
                        wx:else
                        :type="inputType || 'text'"
                        :name="name || componentId || ''"
                        :value="value"
                        :placeholder="placeholder"
                        :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                        placeholder-class="zan-field__placeholder"
                        :data-component-id="componentId || ''"
                    />
                </view>
            </block>
            <!-- parse <template is="zan-field" 
 :data="...config.base.tel"></template> -->
            <block name="zan-field" v-if="false">
                <view :class="'zan-cell zan-field ' + (error ? 'zan-field--error' : '') + ' ' + (mode === 'wrapped' ? 'zan-field--wrapped' : '')">
                    <view v-if="title" class="zan-cell__hd zan-field__title">{{ title }}</view>
                    <textarea
                        v-if="type === 'textarea'"
                        auto-height
                        :name="name || componentId || ''"
                        :value="value"
                        :placeholder="placeholder"
                        :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                        placeholder-class="zan-field__placeholder"
                        :data-component-id="componentId || ''"
                    ></textarea>
                    <input
                        wx:else
                        :type="inputType || 'text'"
                        :name="name || componentId || ''"
                        :value="value"
                        :placeholder="placeholder"
                        :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                        placeholder-class="zan-field__placeholder"
                        :data-component-id="componentId || ''"
                    />
                </view>
            </block>
            <!-- parse <template is="zan-field" 
 :data="...config.base.address"></template> -->
            <block name="zan-field" v-if="false">
                <view :class="'zan-cell zan-field ' + (error ? 'zan-field--error' : '') + ' ' + (mode === 'wrapped' ? 'zan-field--wrapped' : '')">
                    <view v-if="title" class="zan-cell__hd zan-field__title">{{ title }}</view>
                    <textarea
                        v-if="type === 'textarea'"
                        auto-height
                        :name="name || componentId || ''"
                        :value="value"
                        :placeholder="placeholder"
                        :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                        placeholder-class="zan-field__placeholder"
                        :data-component-id="componentId || ''"
                    ></textarea>
                    <input
                        wx:else
                        :type="inputType || 'text'"
                        :name="name || componentId || ''"
                        :value="value"
                        :placeholder="placeholder"
                        :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                        placeholder-class="zan-field__placeholder"
                        :data-component-id="componentId || ''"
                    />
                </view>
            </block>
        </view>

        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary" @tap="clearInput">清除输入</button>
        </view>

        <!-- 去除标题后的输入框样式 -->
        <view class="zan-panel-title">无标题输入框</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-field" 
 :data="...config.notitle, value: textareaValue"></template> -->
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

        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary" @tap="clearTextarea">清除输入</button>
        </view>

        <!-- 使用 Field 圆角样式 -->
        <view class="zan-panel-title field__title--radius">圆角输入框</view>
        <!-- parse <template is="zan-field" 
 :data="...config.radius.totalPrice"></template> -->
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
        <!-- parse <template is="zan-field" 
 :data="...config.radius.excludePrice"></template> -->
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
        <!-- parse <template is="zan-field" 
 :data="...config.radius.notitle"></template> -->
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

        <!-- form 中使用 Field -->
        <view class="zan-panel-title">Form 表单中的field应用</view>
        <form @submit="formSubmit" @reset="formReset">
            <view class="zan-panel">
                <!-- parse <template is="zan-field" 
 :data="...config.form.name"></template> -->
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
                <!-- parse <template is="zan-field" 
 :data="...config.form.tel"></template> -->
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
                <view class="zan-btns">
                    <button class="zan-btn zan-btn--primary" formType="submit">提交数据</button>
                    <button class="zan-btn" formType="reset">重置数据</button>
                </view>
            </view>
        </form>

        <view class="zan-panel-title">自定义显示内容</view>
        <view class="zan-panel">
            <!-- 配合 popup 使用 picker-view -->
            <view class="zan-cell zan-field">
                <view class="zan-cell__hd zan-field__title">信息</view>
                <view class="zan-field__input zan-cell__bd" @tap="handleDateFieldClick">
                    日期: {{ pickerViewConfig.year[pickerViewConfig.value[0]] }} 是否: {{ pickerViewConfig.sex[pickerViewConfig.value[1]] }}
                </view>
            </view>
            <!-- 对应的 popup 层 -->
            <view :class="'zan-popup zan-popup--bottom ' + (pickerViewConfig.show ? 'zan-popup--show' : '')">
                <view class="zan-popup__mask" @tap="hideDatePopup"></view>
                <view class="zan-popup__container popup-field-example--bottom">
                    <picker-view :value="pickerViewConfig.value" indicator-style="height: 50px" class="picker-view-example" @change="handlePopupDateChange">
                        <picker-view-column>
                            <view class="picker-view-column-example" v-for="(item, index) in pickerViewConfig.year" :key="index">{{ item }}年</view>
                        </picker-view-column>
                        <picker-view-column>
                            <view class="picker-view-column-example" v-for="(item, index) in pickerViewConfig.sex" :key="index">{{ item }}</view>
                        </picker-view-column>
                    </picker-view>
                </view>
            </view>

            <!-- 简单 picker 示例 -->
            <view class="zan-cell zan-field">
                <view class="zan-cell__hd zan-field__title">选择区域</view>
                <picker mode="selector" class="zan-field__input zan-cell__bd" :range="area" :value="areaIndex" @change="onAreaChange">
                    {{ area[areaIndex] }}
                </picker>
            </view>

            <view class="zan-cell zan-field">
                <view class="zan-cell__hd zan-field__title">验证码</view>
                <input type="text" placeholder="请输入短信验证码" class="zan-field__input zan-cell__bd" />
                <view class="zan-cell__ft">
                    <button class="zan-btn zan-btn--mini zan-btn--primary">获取验证码</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const Zan = require('../../../dist/index');
const config = require('./config');
export default Object.assign({}, Zan.Field, {
    data: {
        config,
        value: 'test',
        textareaValue: 'test textarea',
        area: [
            '区域',
            '北京市',
            '天津市',
            '河北省',
            '山西省',
            '内蒙古自治区',
            '辽宁省',
            '吉林省',
            '黑龙江省',
            '上海市',
            '江苏省',
            '浙江省',
            '安徽省',
            '福建省',
            '江西省',
            '山东省',
            '河南省',
            '湖北省',
            '湖南省',
            '广东省',
            '广西壮族自治区',
            '海南省',
            '重庆市',
            '四川省',
            '贵州省',
            '云南省',
            '西藏自治区',
            '陕西省',
            '甘肃省',
            '青海省',
            '宁夏回族自治区',
            '新疆维吾尔自治区',
            '台湾省',
            '香港特别行政区',
            '澳门特别行政区'
        ],
        areaIndex: 0,
        // picker-view 示例配置
        pickerViewConfig: {
            show: false,
            value: [0, 0],
            year: [2016, 2017, 2018],
            sex: ['是', '否']
        }
    },
    onAreaChange(e) {
        this.setData({
            areaIndex: e.detail.value
        });
    },
    handleZanFieldChange(e) {
        const { componentId, detail } = e;
        console.log('[zan:field:change]', componentId, detail);
    },
    handleZanFieldFocus(e) {
        const { componentId, detail } = e;
        console.log('[zan:field:focus]', componentId, detail);
    },
    handleZanFieldBlur(e) {
        const { componentId, detail } = e;
        console.log('[zan:field:blur]', componentId, detail);
    },
    clearInput() {
        this.setData({
            value: ''
        });
    },
    clearTextarea() {
        this.setData({
            textareaValue: ''
        });
    },
    formSubmit(event) {
        console.log('[zan:field:submit]', event.detail.value);
    },
    formReset(event) {
        console.log('[zan:field:reset]', event);
    },
    /* piker-view 示例相关函数 */
    handleDateFieldClick() {
        this.setData({
            'pickerViewConfig.show': true
        });
    },
    handlePopupDateChange(e) {
        this.setData({
            'pickerViewConfig.value': e.detail.value
        });
    },
    hideDatePopup() {
        this.setData({
            'pickerViewConfig.show': false
        });
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/field/index.css';
</style>
