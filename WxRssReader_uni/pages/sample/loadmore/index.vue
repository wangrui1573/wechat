<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">LOADMORE</view>

        <!-- parse <template is="zan-loadmore" :data="loading: true"/> -->
        <block name="zan-loadmore">
            <block v-if="nomore">
                <view class="zan-loadmore zan-loadmore--nomore">
                    <view class="zan-loadmore__tips">
                        <view class="zan-loadmore__dot"></view>
                    </view>
                </view>
            </block>

            <block v-else-if="nodata">
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
        <!-- parse <template is="zan-loadmore" :data="nodata: true"/> -->
        <block name="zan-loadmore" v-if="false">
            <block v-if="nomore">
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
        <!-- parse <template is="zan-loadmore" :data="nomore: true"/> -->
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

<script>
export default {
    data() {
        return {
            nomore: '',
            nodata: '',
            nodata_str: ''
        };
    },
    onLoad: function () {},
    onShow: function () {},
    methods: {}
};
</script>
<style>
@import './index.css';
@import '@/dist/loadmore/index.css';
</style>
