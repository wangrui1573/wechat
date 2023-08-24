<template>
    <view style="height: 100%">
        <!-- pages/rssManage/edit.wxml -->

        <view class="container">
            <view class="doc-title zan-hairline--bottom">{{ title }}</view>

            <!-- Field 基础用法 -->
            <view class="zan-panel-title">站点信息</view>
            <form @submit="saveSubmit" class="zan-panel">
                <!-- parse <template is="zan-field" 
 :data="...fields.url"></template> -->
                <block name="zan-field">
                    <view :class="'zan-cell zan-field ' + (error ? 'zan-field--error' : '') + ' ' + (mode === 'wrapped' ? 'zan-field--wrapped' : '')">
                        <view v-if="title" class="zan-cell__hd zan-field__title">{{ title }}</view>
                        <textarea
                            v-if="type === 'textarea'"
                            auto-height
                            :name="name || componentId || ''"
                            :value="value"
                            :placeholder="placeholder"
                            :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                            placeholder-class="zan-field__placeholder"
                            :data-component-id="componentId || ''"
                        ></textarea>
                        <input
                            wx:else
                            :type="inputType || 'text'"
                            :name="name || componentId || ''"
                            :value="value"
                            :placeholder="placeholder"
                            :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                            placeholder-class="zan-field__placeholder"
                            :data-component-id="componentId || ''"
                        />
                    </view>
                </block>
                <!-- parse <template is="zan-field" 
 :data="...fields.name"></template> -->
                <block name="zan-field" v-if="false">
                    <view :class="'zan-cell zan-field ' + (error ? 'zan-field--error' : '') + ' ' + (mode === 'wrapped' ? 'zan-field--wrapped' : '')">
                        <view v-if="title" class="zan-cell__hd zan-field__title">{{ title }}</view>
                        <textarea
                            v-if="type === 'textarea'"
                            auto-height
                            :name="name || componentId || ''"
                            :value="value"
                            :placeholder="placeholder"
                            :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                            placeholder-class="zan-field__placeholder"
                            :data-component-id="componentId || ''"
                        ></textarea>
                        <input
                            wx:else
                            :type="inputType || 'text'"
                            :name="name || componentId || ''"
                            :value="value"
                            :placeholder="placeholder"
                            :class="'zan-field__input zan-cell__bd ' + (right ? 'zan-field__input--right' : '')"
                            placeholder-class="zan-field__placeholder"
                            :data-component-id="componentId || ''"
                        />
                    </view>
                </block>
                <view class="zan-btns">
                    <button formType="submit" class="zan-btn zan-btn--primary">保存</button>
                    <button v-if="isEdit" class="zan-btn zan-btn--danger" @tap="deleteSite">删除</button>
                </view>
            </form>
        </view>

        <!-- parse <template is="zan-toast" :data="zanToast"></template> -->
        <block name="zan-toast">
            <view :class="'zan-toast ' + (!zanToast.title ? 'zan-toast--notitle' : '')" v-if="zanToast.show" @tap="clearZanToast">
                <!-- icon 展示 -->
                <block v-if="zanToast.icon || zanToast.image">
                    <view v-if="zanToast.image" class="zan-toast__icon zan-toast__icon-image" :style="'background-image: url(' + zanToast.image + ');'"></view>
                    <view v-else-if="zanToast.icon === 'loading'" class="zan-toast__icon zan-toast__icon-loading">
                        <view class="zan-loading"></view>
                    </view>
                    <view wx:else :class="'zan-toast__icon zan-icon zan-icon-' + zanToast.icon"></view>
                </block>

                <!-- 文案展示 -->
                <view v-if="zanToast.title">{{ zanToast.title }}</view>
            </view>
        </block>
        <!-- parse <template is="zan-dialog" :data="zanDialog"></template> -->
        <block name="zan-dialog">
            <view :class="'zan-dialog ' + (zanDialog.show ? 'zan-dialog--show' : '')">
                <view class="zan-dialog--mask"></view>
                <view class="zan-dialog--container">
                    <view v-if="zanDialog.title" class="zan-dialog__header">{{ zanDialog.title }}</view>
                    <view :class="'zan-dialog__content ' + (zanDialog.title ? 'zan-dialog__content--title' : '')">{{ zanDialog.content }}</view>
                    <view :class="'zan-dialog__footer ' + (zanDialog.buttonsShowVertical ? 'zan-dialog__footer--vertical' : 'zan-dialog__footer--horizon')">
                        <block v-for="(item, index) in zanDialog.buttons" :key="item.text + -+item.type">
                            <button
                                class="zan-dialog__button zan-btn"
                                :data-type="item.type"
                                @tap.stop.prevent="_handleZanDialogButtonClick"
                                :style="'color: ' + (item.color || '#333')"
                            >
                                {{ item.text }}
                            </button>
                        </block>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
// pages/rssManage/edit.js
const Zan = require('../../dist/index');
export default Object.assign({}, Zan.Toast, {
    /**
     * 页面的初始数据
     */
    data: {
        isEdit: false,
        title: '新增站点',
        fields: {
            url: {
                title: 'Feed',
                placeholder: '请输入Feed地址：https://rsshub.real9.cn/vgter/new',
                value: '',
                name: 'url'
            },
            name: {
                title: '名称',
                placeholder: '页面名称（不填将自动获取）',
                value: '',
                name: 'name'
            }
        },
        url: '',
        name: '',
        sites: uni.getStorageSync('Sites'),
        id: -1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var id = options.id;
        if (id) {
            var site = uni.getStorageSync('Sites')[id];
            var field = that.fields;
            field.url.value = site.url;
            field.name.value = site.name;
            that.setData({
                isEdit: true,
                title: '修改站点',
                fields: field,
                id: id
            });
        }
    },
    deleteSite: function () {
        var id = this.id;
        var site = uni.getStorageSync('Sites');
        site.splice(id, 1);
        uni.setStorage({
            key: 'Sites',
            data: site
        });
        this.showZanToast(
            {
                title: '已删除',
                icon: 'success'
            },
            2000
        );
        uni.navigateTo({
            url: '/pages/rssManage/index'
        });
    },
    saveSubmit: function (e) {
        var url = e.detail.value.url;
        var name = e.detail.value.name;
        var site = uni.getStorageSync('Sites');
        var id = this.id;
        if (url == null || url == '' || !url.startsWith('http')) {
            this.showZanToast(
                {
                    title: '非法URL',
                    icon: 'close'
                },
                2000
            );
        } else if (name == null || name == '') {
            this.showZanToast(
                {
                    title: '请输入名称',
                    icon: 'close'
                },
                2000
            );
        } else {
            //修改数据
            if (id >= 0) {
                site[id] = {
                    name: name,
                    url: url
                };
                uni.setStorage({
                    key: 'Sites',
                    data: site
                });
            } else {
                //先删除数组中的重复项
                if (site != '') {
                    site.forEach(function (val, index) {
                        if (val.url == url) {
                            site.splice(index, 1);
                        }
                        //console.log(val,index);
                    });
                } else {
                    site = [];
                }
                site.push({
                    name: name,
                    url: url
                });
                uni.setStorage({
                    key: 'Sites',
                    data: site
                });
                this.showZanToast(
                    {
                        title: '添加成功',
                        icon: 'success'
                    },
                    2000
                );
            }

            //跳转至站点列表页
            uni.redirectTo({
                url: '/pages/rssManage/index'
            });
        }
    }
});
</script>
<style>
@import './edit.css';
@import '@/dist/field/index.css';
@import '@/dist/toast/index.css';
@import '@/dist/dialog/index.css';
</style>
