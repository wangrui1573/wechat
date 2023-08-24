<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-loadmore" v-if="false">
            <block v-if="true">
                <view class="zan-loadmore zan-loadmore--nomore">
                    <view class="zan-loadmore__tips">
                        <view class="zan-loadmore__dot"></view>
                    </view>
                </view>
            </block>

            <block v-else-if="true">
                <view class="zan-loadmore zan-loadmore--nodata">
                    <view class="zan-loadmore__tips">{{ nodata_str || '暂无数据' }}</view>
                </view>
            </block>

            <block v-else-if="true">
                <view class="zan-loadmore">
                    <view class="zan-loading"></view>
                    <view class="zan-loadmore__tips">加载中...</view>
                </view>
            </block>
        </block>
    </view>
</template>

<style>
@import './index.css';
</style>
