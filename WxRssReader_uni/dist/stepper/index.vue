<template>
    <view style="height: 100%">
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="zan-stepper" v-if="false">
            <view :class="'zan-stepper ' + ('small' === 'small' ? 'zan-stepper--small' : '')">
                <view
                    :class="'zan-stepper__minus ' + (stepper <= min ? 'zan-stepper--disabled' : '')"
                    :data-component-id="'stepper1'"
                    :data-stepper="stepper"
                    :data-disabled="stepper <= min"
                    @tap="_handleZanStepperMinus"
                >
                    -
                </view>
                <input
                    :class="'zan-stepper__text ' + (min >= max ? 'zan-stepper--disabled' : '')"
                    type="number"
                    :data-component-id="'stepper1'"
                    :data-min="min"
                    :data-max="max"
                    :value="stepper"
                    :disabled="min >= max"
                    @blur="_handleZanStepperBlur"
                />
                <view
                    :class="'zan-stepper__plus ' + (stepper >= max ? 'zan-stepper--disabled' : '')"
                    :data-component-id="'stepper1'"
                    :data-stepper="stepper"
                    :data-disabled="stepper >= max"
                    @tap="_handleZanStepperPlus"
                >
                    +
                </view>
            </view>
        </block>
    </view>
</template>

<script>
function handle(e, num) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var disabled = dataset.disabled;
    var stepper = +dataset.stepper;
    if (disabled) {
        return null;
    }
    callback.call(this, componentId, stepper + num);
}
function callback(componentId, stepper) {
    stepper = +stepper;
    var e = {
        componentId,
        stepper
    };
    console.info('[zan:stepper:change]', e);
    if (this.handleZanStepperChange) {
        this.handleZanStepperChange(e);
    } else {
        console.warn('页面缺少 handleZanStepperChange 回调函数');
    }
}
var Stepper = {
    _handleZanStepperMinus(e) {
        handle.call(this, e, -1);
    },
    _handleZanStepperPlus(e) {
        handle.call(this, e, +1);
    },
    _handleZanStepperBlur(e) {
        var dataset = e.currentTarget.dataset;
        var componentId = dataset.componentId;
        var max = +dataset.max;
        var min = +dataset.min;
        var value = e.detail.value;
        if (!value) {
            setTimeout(() => {
                callback.call(this, componentId, min);
            }, 16);
            callback.call(this, componentId, value);
            return '' + value;
        }
        value = +value;
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }
        callback.call(this, componentId, value);
        return '' + value;
    }
};
module.exports = Stepper;
</script>
<style>
@import './index.css';
</style>
