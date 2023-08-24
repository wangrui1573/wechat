<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-toptips" v-if="false">
            <view :class="'zan-toptips ' + (zanTopTips.show ? 'zan-toptips--show' : '')">{{ zanTopTips.content }}</view>
        </block>
    </view>
</template>

<script>
module.exports = {
    showZanTopTips(content = '', options = {}) {
        let zanTopTips = this.zanTopTips || {};
        // 如果已经有一个计时器在了，就清理掉先
        if (zanTopTips.timer) {
            clearTimeout(zanTopTips.timer);
            zanTopTips.timer = 0;
        }
        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        // options参数默认参数扩展
        options = Object.assign(
            {
                duration: 3000
            },
            options
        );

        // 设置定时器，定时关闭topTips
        let timer = setTimeout(() => {
            this.setData({
                'zanTopTips.show': false,
                'zanTopTips.timer': 0
            });
        }, options.duration);

        // 展示出topTips
        this.setData({
            zanTopTips: {
                show: true,
                content,
                options,
                timer
            }
        });
    }
};
</script>
<style>
@import './index.css';
</style>
