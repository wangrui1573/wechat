<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-steps" v-if="false">
            <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + 'my-class'">
                <view
                    :class="
                        'zan-steps__step ' +
                        (true ? 'zan-steps__step--db-title' : '') +
                        ' ' +
                        (index == 0 ? 'zan-steps__step--first-child' : '') +
                        ' ' +
                        (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                        ' ' +
                        (step.done ? 'zan-steps__step--done' : '') +
                        ' ' +
                        (step.current ? 'zan-steps__step--cur' : '')
                    "
                    v-for="(step, index) in steps2"
                    :key="index"
                >
                    <view class="zan-steps__title">{{ step.text }}</view>

                    <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                    <view class="zan-steps__icons">
                        <view class="zan-steps__circle"></view>
                    </view>

                    <view class="zan-steps__line"></view>
                </view>
            </view>
        </block>
    </view>
</template>

<style>
@import './index.css';
</style>
