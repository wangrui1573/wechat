<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
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

        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-tab-list" v-if="false">
            <view
                :class="'zan-tab__item ' + ((tab.selectedId || tab.selectedId || selectedId) == item.id ? 'zan-tab__item--selected' : '')"
                :data-component-id="componentId"
                :data-item-id="item.id"
                @tap="_handleZanTabChange"
                v-for="(item, index) in tab.list || tab.list || list"
                :key="index"
            >
                <view class="zan-tab__title">{{ item.title }}</view>
            </view>
        </block>
    </view>
</template>

<script>
const { extractComponentId } = require('../common/helper');
var Tab = {
    _handleZanTabChange(e) {
        const componentId = extractComponentId(e);
        const dataset = e.currentTarget.dataset;
        const selectedId = dataset.itemId;
        const data = {
            componentId,
            selectedId
        };
        console.info('[zan:tab:change]', data);
        if (this.handleZanTabChange) {
            this.handleZanTabChange(data);
        } else {
            console.warn('页面缺少 handleZanTabChange 回调函数');
        }
    }
};
module.exports = Tab;
</script>
<style>
@import './index.css';
@import '@/dist/tab/index.css';
</style>
