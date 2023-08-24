<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">Stepper</view>

        <view style="padding: 40px 15px">
            <!-- parse <template is="zan-stepper" :data="...stepper1, componentId: 'stepper1'"/> -->
            <block name="zan-stepper">
                <view :class="'zan-stepper ' + (size === 'small' ? 'zan-stepper--small' : '')">
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

        <!-- 当最大值等于最小值时，组件不可用 -->
        <view style="padding: 40px 15px">
            <!-- parse <template is="zan-stepper" :data="...stepper2, componentId: 'stepper2'"/> -->
            <block name="zan-stepper" v-if="false">
                <view :class="'zan-stepper ' + (size === 'small' ? 'zan-stepper--small' : '')">
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

        <!-- small size -->
        <view style="padding: 40px 15px">
            <!-- parse <template is="zan-stepper" :data="...stepper3, componentId: 'stepper3', size: 'small'"/> -->
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
    </view>
</template>

<script>
var Zan = require('../../../dist/index');
export default Object.assign({}, Zan.Stepper, {
    data: {
        stepper1: {
            stepper: 10,
            min: 1,
            max: 20
        },
        stepper2: {
            stepper: 1,
            min: 1,
            max: 1
        },
        stepper3: {
            stepper: 10,
            min: 1,
            max: 20
        }
    },
    handleZanStepperChange(e) {
        var componentId = e.componentId;
        var stepper = e.stepper;
        this.setData({
            [`${componentId}.stepper`]: stepper
        });
    }
});
</script>
<style>
@import './index.css';
@import '@/dist/stepper/index.css';
</style>
