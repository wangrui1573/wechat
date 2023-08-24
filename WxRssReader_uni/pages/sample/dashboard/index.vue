<template>
    <view class="container">
        <image class="logo" src="https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png"></image>

        <block v-for="(group, index) in list" :key="index">
            <view class="zan-panel-title">{{ group.title }}</view>

            <view class="zan-panel">
                <navigator class="zan-cell zan-cell--access" :url="item.path" v-for="(item, index1) in group.content" :key="index1">
                    <view class="zan-cell__bd">{{ item.name }}</view>

                    <view class="zan-cell__ft"></view>
                </navigator>
            </view>
        </block>
    </view>
</template>

<script>
import componentsConfig from './config';
export default {
    data() {
        return {
            list: componentsConfig,

            group: {
                title: '',
                content: []
            }
        };
    },
    onLoad: function () {},
    onShow: function () {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
