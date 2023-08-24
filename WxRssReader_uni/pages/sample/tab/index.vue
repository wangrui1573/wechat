<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">TAB</view>

        <view style="margin: 20px 0">
            <!-- parse <template is="zan-tab" 
 :data="...tab1, componentId: 'tab1'"></template> -->
            <block name="zan-tab">
                <view class="zan-tab">
                    <block v-if="tab.scroll || scroll">
                        <scroll-view
                            :class="'zan-tab__bd zan-tab__bd--scroll ' + (fixed ? 'zan-tab__bd--fixed' : '')"
                            :scroll-x="true"
                            :style="'height: ' + (tab.height || height ? (tab.height || height) + 'px' : 'auto')"
                        >
                            <!-- parse <template is="zan-tab-list" 
 :data="list: tab.list || list, selectedId: tab.selectedId || selectedId, componentId">
        </template> -->
                            <block name="zan-tab-list">
                                <view
                                    :class="'zan-tab__item ' + ((tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                                    :data-component-id="'tab1'"
                                    :data-item-id="item.id"
                                    @tap="_handleZanTabChange"
                                    v-for="(item, index) in tab.list || list"
                                    :key="index"
                                >
                                    <view class="zan-tab__title">{{ item.title }}</view>
                                </view>
                            </block>
                        </scroll-view>
                    </block>
                    <block v-else>
                        <view :class="'zan-tab__bd ' + (fixed ? 'zan-tab__bd--fixed' : '')">
                            <!-- parse <template is="zan-tab-list" 
 :data="list: tab.list || list, selectedId: tab.selectedId || selectedId, componentId">
        </template> -->
                            <block name="zan-tab-list" v-if="false">
                                <view
                                    :class="'zan-tab__item ' + ((tab.selectedId || tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                                    :data-component-id="'tab1'"
                                    :data-item-id="item.id"
                                    @tap="_handleZanTabChange"
                                    v-for="(item, index) in tab.list || tab.list || list"
                                    :key="index"
                                >
                                    <view class="zan-tab__title">{{ item.title }}</view>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </block>
        </view>
        <view style="margin: 20px 0">
            <!-- parse <template is="zan-tab" 
 :data="...tab2, componentId: 'tab2'"></template> -->
            <block name="zan-tab" v-if="false">
                <view class="zan-tab">
                    <block v-if="tab.scroll || scroll">
                        <scroll-view
                            :class="'zan-tab__bd zan-tab__bd--scroll ' + (fixed ? 'zan-tab__bd--fixed' : '')"
                            :scroll-x="true"
                            :style="'height: ' + (tab.height || height ? (tab.height || height) + 'px' : 'auto')"
                        >
                            <!-- parse <template is="zan-tab-list" 
 :data="list: tab.list || list, selectedId: tab.selectedId || selectedId, componentId">
        </template> -->
                            <block name="zan-tab-list">
                                <view
                                    :class="'zan-tab__item ' + ((tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                                    :data-component-id="'tab1'"
                                    :data-item-id="item.id"
                                    @tap="_handleZanTabChange"
                                    v-for="(item, index) in tab.list || list"
                                    :key="index"
                                >
                                    <view class="zan-tab__title">{{ item.title }}</view>
                                </view>
                            </block>
                        </scroll-view>
                    </block>
                    <block v-else>
                        <view :class="'zan-tab__bd ' + (fixed ? 'zan-tab__bd--fixed' : '')">
                            <!-- parse <template is="zan-tab-list" 
 :data="list: tab.list || list, selectedId: tab.selectedId || selectedId, componentId">
        </template> -->
                            <block name="zan-tab-list" v-if="false">
                                <view
                                    :class="'zan-tab__item ' + ((tab.selectedId || tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                                    :data-component-id="'tab1'"
                                    :data-item-id="item.id"
                                    @tap="_handleZanTabChange"
                                    v-for="(item, index) in tab.list || tab.list || list"
                                    :key="index"
                                >
                                    <view class="zan-tab__title">{{ item.title }}</view>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </block>
        </view>
        <view style="margin: 20px 0">
            <!-- parse <template is="zan-tab" 
 :data="...tab3, componentId: 'tab3'"></template> -->
            <block name="zan-tab" v-if="false">
                <view class="zan-tab">
                    <block v-if="tab.scroll || scroll">
                        <scroll-view
                            :class="'zan-tab__bd zan-tab__bd--scroll ' + (fixed ? 'zan-tab__bd--fixed' : '')"
                            :scroll-x="true"
                            :style="'height: ' + (tab.height || height ? (tab.height || height) + 'px' : 'auto')"
                        >
                            <!-- parse <template is="zan-tab-list" 
 :data="list: tab.list || list, selectedId: tab.selectedId || selectedId, componentId">
        </template> -->
                            <block name="zan-tab-list">
                                <view
                                    :class="'zan-tab__item ' + ((tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                                    :data-component-id="'tab1'"
                                    :data-item-id="item.id"
                                    @tap="_handleZanTabChange"
                                    v-for="(item, index) in tab.list || list"
                                    :key="index"
                                >
                                    <view class="zan-tab__title">{{ item.title }}</view>
                                </view>
                            </block>
                        </scroll-view>
                    </block>
                    <block v-else>
                        <view :class="'zan-tab__bd ' + (fixed ? 'zan-tab__bd--fixed' : '')">
                            <!-- parse <template is="zan-tab-list" 
 :data="list: tab.list || list, selectedId: tab.selectedId || selectedId, componentId">
        </template> -->
                            <block name="zan-tab-list" v-if="false">
                                <view
                                    :class="'zan-tab__item ' + ((tab.selectedId || tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                                    :data-component-id="'tab1'"
                                    :data-item-id="item.id"
                                    @tap="_handleZanTabChange"
                                    v-for="(item, index) in tab.list || tab.list || list"
                                    :key="index"
                                >
                                    <view class="zan-tab__title">{{ item.title }}</view>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
const { Tab, extend } = require('../../../dist/index');
export default extend({}, Tab, {
    data: {
        tab1: {
            list: [
                {
                    id: 'all',
                    title: '全部'
                },
                {
                    id: 'topay',
                    title: '待付款'
                },
                {
                    id: 'tosend',
                    title: '待发货'
                },
                {
                    id: 'send',
                    title: '待收货'
                },
                {
                    id: 'sign',
                    title: '已完成订单'
                }
            ],
            selectedId: 'all'
        },
        tab2: {
            list: [
                {
                    id: '1',
                    title: '最新商品1'
                },
                {
                    id: '2',
                    title: '最新商品2'
                },
                {
                    id: '3',
                    title: '最新商品3'
                },
                {
                    id: '4',
                    title: '最新商品4'
                },
                {
                    id: '5',
                    title: '最新商品5'
                },
                {
                    id: '6',
                    title: '最新商品6'
                }
            ],
            selectedId: '1',
            scroll: true,
            height: 45
        },
        tab3: {
            list: [
                {
                    id: '1',
                    title: '商品1'
                },
                {
                    id: '2',
                    title: '商品2'
                },
                {
                    id: '3',
                    title: '商品3'
                },
                {
                    id: '4',
                    title: '商品4'
                },
                {
                    id: '5',
                    title: '商品5'
                },
                {
                    id: '6',
                    title: '商品6'
                }
            ],
            selectedId: '1',
            scroll: true,
            height: 45
        }
    },
    handleZanTabChange(e) {
        var componentId = e.componentId;
        var selectedId = e.selectedId;
        this.setData({
            [`${componentId}.selectedId`]: selectedId
        });
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/tab/index.css';
</style>
