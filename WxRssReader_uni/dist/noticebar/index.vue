<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-noticebar" v-if="false">
            <view class="zan-noticebar">
                <view :id="'movable' + '__content-wrap'" style="height: 18px; overflow: hidden; position: relative">
                    <view :animation="animationData" :id="'movable' + '__content'" style="position: absolute; white-space: nowrap">
                        {{ text }}
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
var ZanNoticeBar = {
    initZanNoticeBarScroll(componentId) {
        this.zanNoticeBarNode = this.zanNoticeBarNode || {};
        this.zanNoticeBarNode[`${componentId}`] = {
            width: undefined,
            wrapWidth: undefined,
            animation: null,
            resetAnimation: null
        };
        var currentComponent = this.zanNoticeBarNode[`${componentId}`];
        uni.createSelectorQuery()
            .in(uni)
            .select(`#${componentId}__content`)
            .boundingClientRect((rect) => {
                if (rect.width) {
                    currentComponent.width = rect.width;
                    uni.createSelectorQuery()
                        .in(uni)
                        .select(`#${componentId}__content-wrap`)
                        .boundingClientRect((rect) => {
                            currentComponent.wrapWidth = rect.width;
                            if (currentComponent.wrapWidth < currentComponent.width) {
                                var mstime = (currentComponent.width / 40) * 1000;
                                currentComponent.animation = uni.createAnimation({
                                    duration: mstime,
                                    timingFunction: 'linear'
                                });
                                currentComponent.resetAnimation = uni.createAnimation({
                                    duration: 0,
                                    timingFunction: 'linear'
                                });
                                this.scrollZanNoticeBar(componentId, mstime);
                            }
                        })
                        .exec();
                } else {
                    console.warn('页面缺少 noticebar 元素');
                }
            })
            .exec();
    },
    scrollZanNoticeBar(componentId, mstime) {
        var currentComponent = this.zanNoticeBarNode[`${componentId}`];
        var resetAnimationData = currentComponent.resetAnimation.translateX(currentComponent.wrapWidth).step();
        this.setData({
            [`${componentId}.animationData`]: resetAnimationData.export()
        });
        var aninationData = currentComponent.animation.translateX((-mstime * 40) / 1000).step();
        setTimeout(() => {
            this.setData({
                [`${componentId}.animationData`]: aninationData.export()
            });
        }, 100);
        setTimeout(() => {
            this.scrollZanNoticeBar(componentId, mstime);
        }, mstime);
    }
};
module.exports = ZanNoticeBar;
</script>
<style>
@import './index.css';
</style>
