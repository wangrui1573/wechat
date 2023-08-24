<template>
    <view style="height: 100%">
        <view class="container">
            <view class="doc-title zan-hairline--bottom">DIALOG</view>

            <view class="zan-btns" style="margin-top: 30vh">
                <button class="zan-btn" @tap="toggleBaseDialog">基础 Dialog</button>
                <button class="zan-btn" @tap="toggleWithoutTitleDialog">Dialog - 无标题</button>
                <button class="zan-btn" @tap="toggleButtonDialog">Dialog - 自定义显示按钮</button>
                <button class="zan-btn" @tap="toggleVerticalDialog">Dialog - 按钮纵向排布</button>
            </view>
        </view>

        <!-- parse <template is="zan-dialog" :data="zanDialog"></template> -->
        <block name="zan-dialog" v-if="false">
            <view :class="'zan-dialog ' + (zanDialog.show ? 'zan-dialog--show' : '')">
                <view class="zan-dialog--mask"></view>
                <view class="zan-dialog--container">
                    <view v-if="zanDialog.title" class="zan-dialog__header">{{ zanDialog.title }}</view>
                    <view :class="'zan-dialog__content ' + (zanDialog.title ? 'zan-dialog__content--title' : '')">{{ zanDialog.content }}</view>
                    <view :class="'zan-dialog__footer ' + (zanDialog.buttonsShowVertical ? 'zan-dialog__footer--vertical' : 'zan-dialog__footer--horizon')">
                        <block v-for="(item, index) in zanDialog.buttons" :key="item.text + -+item.type">
                            <button
                                class="zan-dialog__button zan-btn"
                                :data-type="item.type"
                                @tap.stop.prevent="_handleZanDialogButtonClick"
                                :style="'color: ' + (item.color || '#333')"
                            >
                                {{ item.text }}
                            </button>
                        </block>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
const Zan = require('../../../dist/index');
export default Object.assign({}, Zan.Dialog, {
    toggleBaseDialog() {
        this.showZanDialog({
            title: '弹窗',
            content: '这是一个模态弹窗',
            showCancel: true
        })
            .then(() => {
                console.log('=== dialog ===', 'type: confirm');
            })
            .catch(() => {
                console.log('=== dialog ===', 'type: cancel');
            });
    },
    toggleWithoutTitleDialog() {
        this.showZanDialog({
            content: '这是一个模态弹窗'
        }).then(() => {
            console.log('=== dialog without title ===', 'type: confirm');
        });
    },
    toggleButtonDialog() {
        this.showZanDialog({
            title: '弹窗',
            content: '这是一个模态弹窗',
            buttons: [
                {
                    text: '现金支付',
                    color: 'red',
                    type: 'cash'
                },
                {
                    text: '微信支付',
                    color: '#3CC51F',
                    type: 'wechat'
                },
                {
                    text: '取消',
                    type: 'cancel'
                }
            ]
        }).then(({ type }) => {
            console.log('=== dialog with custom buttons ===', `type: ${type}`);
        });
    },
    toggleVerticalDialog() {
        this.showZanDialog({
            title: '弹窗',
            content: '这是一个模态弹窗',
            buttonsShowVertical: true,
            buttons: [
                {
                    text: '现金支付',
                    color: 'red',
                    type: 'cash'
                },
                {
                    text: '微信支付',
                    color: '#3CC51F',
                    type: 'wechat'
                },
                {
                    text: '取消',
                    type: 'cancel'
                }
            ]
        }).then(({ type }) => {
            console.log('=== dialog with vertical buttons ===', `type: ${type}`);
        });
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/dialog/index.css';
</style>
