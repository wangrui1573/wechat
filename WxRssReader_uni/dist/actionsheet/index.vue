<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-actionsheet" v-if="false">
            <view :class="'zan-actionsheet ' + (show ? 'zan-actionsheet--show' : '')">
                <view
                    class="zan-actionsheet__mask"
                    @tap.stop.prevent="_handleZanActionsheetMaskClick"
                    :data-close-on-click-overlay="closeOnClickOverlay"
                    :data-component-id="componentId"
                ></view>
                <view class="zan-actionsheet__container">
                    <!-- 实际按钮显示 -->
                    <button
                        @tap.stop.prevent="_handleZanActionsheetBtnClick"
                        :data-component-id="componentId"
                        :data-index="index"
                        :open-type="item.openType"
                        :class="'zan-btn zan-actionsheet__btn ' + (item.loading ? 'zan-btn--loading' : '') + ' ' + item.className"
                        v-for="(item, index) in actions"
                        :key="index + -+item.name"
                    >
                        <text>{{ item.name }}</text>

                        <text v-if="item.subname" class="zan-actionsheet__subname">{{ item.subname }}</text>
                    </button>

                    <!-- 关闭按钮 -->
                    <view v-if="cancelText" class="zan-actionsheet__footer">
                        <button class="zan-btn zan-actionsheet__btn" @tap.stop.prevent="_handleZanActionsheetCancelBtnClick" :data-component-id="componentId">
                            {{ cancelText }}
                        </button>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
const { extractComponentId } = require('../common/helper');
module.exports = {
    _handleZanActionsheetMaskClick({ currentTarget = {} }) {
        const dataset = currentTarget.dataset || {};
        const { componentId, closeOnClickOverlay } = dataset;

        // 判断是否在点击背景时需要关闭弹层
        if (!closeOnClickOverlay) {
            return;
        }
        resolveCancelClick.call(this, {
            componentId
        });
    },
    _handleZanActionsheetCancelBtnClick(e) {
        const componentId = extractComponentId(e);
        resolveCancelClick.call(this, {
            componentId
        });
    },
    _handleZanActionsheetBtnClick({ currentTarget = {} }) {
        const dataset = currentTarget.dataset || {};
        const { componentId, index } = dataset;
        if (this.handleZanActionsheetClick) {
            this.handleZanActionsheetClick({
                componentId,
                index
            });
        } else {
            console.warn('页面缺少 handleZanActionsheetClick 回调函数');
        }
    }
};
function resolveCancelClick({ componentId }) {
    console.info('[zan:actionsheet:cancel]');
    if (this.handleZanActionsheetCancel) {
        this.handleZanActionsheetCancel({
            componentId
        });
    } else {
        console.warn('页面缺少 handleZanActionsheetCancel 回调函数');
    }
}
</script>
<style>
@import './index.css';
</style>
