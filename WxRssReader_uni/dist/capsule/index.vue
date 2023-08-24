<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
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
</template>

<style>
@import './index.css';
</style>
