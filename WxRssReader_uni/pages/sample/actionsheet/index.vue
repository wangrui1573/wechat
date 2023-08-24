<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom zan-hairline--bottom">ACTIONSHEET</view>

        <view class="zan-btns" style="margin-top: 30vh">
            <button class="zan-btn" @tap="toggleActionsheet">Actionsheet</button>
        </view>

        <!-- parse <template is="zan-actionsheet" :data="...baseActionsheet"></template> -->
        <block name="zan-actionsheet">
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
const { Actionsheet, extend } = require('../../../dist/index');
export default extend({}, Actionsheet, {
    data: {
        baseActionsheet: {
            show: false,
            cancelText: '关闭 Action',
            closeOnClickOverlay: true,
            componentId: 'baseActionsheet',
            actions: [
                {
                    name: '选项1',
                    subname: '选项描述语1',
                    className: 'action-class',
                    loading: false
                },
                {
                    name: '选项2',
                    subname: '选项描述语2',
                    className: 'action-class',
                    loading: false
                },
                {
                    name: '去分享',
                    openType: 'share'
                }
            ]
        }
    },
    onShareAppMessage() {
        return {
            title: 'ZanUI-WeApp',
            imageUrl: 'https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png'
        };
    },
    toggleActionsheet() {
        this.setData({
            'baseActionsheet.show': true
        });
    },
    handleZanActionsheetCancel({ componentId }) {
        this.setData({
            [`${componentId}.show`]: false
        });
    },
    handleZanActionsheetClick({ componentId, index }) {
        console.log(`item index ${index} clicked`);

        // 如果是分享按钮被点击, 不处理关闭
        if (index === 2) {
            return;
        }
        this.setData({
            [`${componentId}.actions[${index}].loading`]: true
        });
        setTimeout(() => {
            this.setData({
                [`${componentId}.show`]: false,
                [`${componentId}.actions[${index}].loading`]: false
            });
        }, 1500);
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/actionsheet/index.css';
</style>
