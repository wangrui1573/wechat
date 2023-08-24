<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">ICON</view>

        <view class="zan-panel">
            <view class="icon-wrap" v-for="(icon, index) in icons" :key="index">
                <view :class="'zan-icon zan-icon-' + icon" style="color: #ff4343"></view>

                <view class="icon-classname">zan-icon-{{ icon }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            icons: [
                'close',
                'location',
                'clock',
                'gold-coin',
                'chat',
                'exchange',
                'upgrade',
                'edit',
                'contact',
                'passed',
                'points',
                'delete',
                'records',
                'logistics',
                'check',
                'checked',
                'gift',
                'like-o',
                'like',
                'qr',
                'qr-invalid',
                'shop',
                'photograph',
                'add',
                'add2',
                'add-o',
                'photo',
                'cart',
                'arrow',
                'search',
                'clear',
                'success',
                'fail',
                'wechat',
                'alipay',
                'password-view',
                'wap-nav',
                'password-not-view',
                'wap-home',
                'ecard-pay',
                'balance-pay',
                'peer-pay',
                'credit-pay',
                'debit-pay',
                'other-pay',
                'shopping-cart',
                'browsing-history',
                'goods-collect',
                'shop-collect',
                'receive-gift',
                'send-gift',
                'setting',
                'coupon',
                'free-postage',
                'discount',
                'birthday-privilege',
                'member-day-privilege',
                'balance-details',
                'cash-back-record',
                'points-mall',
                'exchange-record',
                'pending-payment',
                'pending-orders',
                'pending-deliver',
                'pending-evaluate',
                'cash-on-deliver',
                'gift-card-pay',
                'underway',
                'point-gift',
                'after-sale',
                'edit-data',
                'question',
                'description',
                'card',
                'gift-card',
                'completed',
                'value-card',
                'certificate',
                'tosend',
                'sign',
                'home',
                'phone',
                'play',
                'pause',
                'stop',
                'hot',
                'new',
                'new-arrival',
                'hot-sale'
            ],
            icon: ''
        };
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
