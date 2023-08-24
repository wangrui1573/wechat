<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">CAPSULE</view>

        <view class="zan-panel-title">基本用法</view>
        <view class="zan-panel">
            <view class="zan-cell zan-cell--last-child">
                <!-- parse <template is="capsule" :data="leftText: '1折', rightText: '限购一份'"/> -->
                <block name="capsule">
                    <view :class="'zan-capsule zan-capsule--' + type">
                        <block v-if="color">
                            <view class="zan-capsule__left" :style="'background: ' + color + '; border-color: ' + color">{{ '1折' }}</view>
                            <view class="zan-capsule__right" :style="'color: ' + color + '; border-color: ' + color">{{ '限购一份' }}</view>
                        </block>
                        <block v-else>
                            <view class="zan-capsule__left">{{ '1折' }}</view>
                            <view class="zan-capsule__right">{{ '限购一份' }}</view>
                        </block>
                    </view>
                </block>
                <!-- parse <template is="capsule" :data="leftText: '1折', rightText: '限购一份', type: 'danger'"/> -->
                <block name="capsule" v-if="false">
                    <view :class="'zan-capsule zan-capsule--' + 'danger'">
                        <block v-if="color">
                            <view class="zan-capsule__left" :style="'background: ' + color + '; border-color: ' + color">{{ '1折' }}</view>
                            <view class="zan-capsule__right" :style="'color: ' + color + '; border-color: ' + color">{{ '限购一份' }}</view>
                        </block>
                        <block v-else>
                            <view class="zan-capsule__left">{{ '1折' }}</view>
                            <view class="zan-capsule__right">{{ '限购一份' }}</view>
                        </block>
                    </view>
                </block>
            </view>
        </view>

        <view class="zan-panel-title">自定义颜色</view>
        <view class="zan-panel">
            <view class="zan-cell zan-cell--last-child">
                <!-- parse <template is="capsule" :data="leftText: '1折', rightText: '限购一份', color: '#38f'"/> -->
                <block name="capsule" v-if="false">
                    <view :class="'zan-capsule zan-capsule--' + 'danger'">
                        <block v-if="'#38f'">
                            <view class="zan-capsule__left" :style="'background: ' + '#38f' + '; border-color: ' + '#38f'">{{ '1折' }}</view>
                            <view class="zan-capsule__right" :style="'color: ' + '#38f' + '; border-color: ' + '#38f'">{{ '限购一份' }}</view>
                        </block>
                        <block v-else>
                            <view class="zan-capsule__left">{{ '1折' }}</view>
                            <view class="zan-capsule__right">{{ '限购一份' }}</view>
                        </block>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            type: '',
            color: ''
        };
    },
    methods: {}
};
</script>
<style>
@import './index.css';
@import '@/dist/capsule/index.css';
</style>
