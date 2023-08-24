<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-toast" v-if="false">
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
    </view>
</template>

<script>
module.exports = {
    showZanToast(title, timeout) {
        const options = formatParameter(title, timeout);

        // 清除上一轮的计时器
        const { timer = 0 } = this.zanToast || {};
        clearTimeout(timer);

        // 弹层设置~
        const zanToast = {
            show: true,
            icon: options.icon,
            image: options.image,
            title: options.title
        };
        this.setData({
            zanToast
        });

        // 传入的显示时长小于0，就认为需要一直显示
        if (timeout < 0) {
            return;
        }

        // 下一轮计时器
        const nextTimer = setTimeout(() => {
            this.clearZanToast();
        }, timeout || 3000);
        this.setData({
            'zanToast.timer': nextTimer
        });
    },
    // 清除所有 toast
    clearZanToast() {
        const { timer = 0 } = this.zanToast || {};
        clearTimeout(timer);
        this.setData({
            'zanToast.show': false
        });
    },
    // 快捷方法，显示 loading
    showZanLoading(title) {
        const options = formatParameter(title);
        this.showZanToast({
            ...options,
            icon: 'loading'
        });
    }
};
function formatParameter(title, timeout = 0) {
    // 如果传入的 title 是对象，那么认为所有的配置属性都在这个对象中了
    if (typeof title === 'object') {
        return title;
    }
    return {
        title,
        timeout
    };
}
</script>
<style>
@import './index.css';
</style>
