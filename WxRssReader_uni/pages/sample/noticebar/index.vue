<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">NOTICEBAR</view>

        <view class="zan-panel-title">滚动通告栏</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-noticebar" 
 :data="...movable, componentId: 'movable'"></template> -->
            <block name="zan-noticebar">
                <view class="zan-noticebar">
                    <view :id="'movable' + '__content-wrap'" style="height: 18px; overflow: hidden; position: relative">
                        <view :animation="animationData" :id="'movable' + '__content'" style="position: absolute; white-space: nowrap">
                            {{ text }}
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <view class="zan-panel-title">静止通告栏1</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-noticebar" 
 :data="...static1, componentId: 'static1'"></template> -->
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

        <view class="zan-panel-title">静止通告栏2</view>
        <view class="zan-panel">
            <!-- parse <template is="zan-noticebar" 
 :data="...static2, componentId: 'static2'"></template> -->
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
    </view>
</template>

<script>
var Zan = require('../../../dist/index');
export default Object.assign({}, Zan.NoticeBar, {
    data: {
        movable: {
            text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
        },
        static1: {
            text: '足协杯战线连续第2年上演广州德比战'
        },
        static2: {
            text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
        }
    },
    onShow() {
        // 滚动通告栏需要initScroll
        this.initZanNoticeBarScroll('movable');
        // initScroll的通告栏如果宽度足够显示内容将保持静止
        this.initZanNoticeBarScroll('static1');
        // 不进行initScroll的通告栏也将保持静止
        // this.initZanNoticeBarScroll('static2');
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/noticebar/index.css';
</style>
