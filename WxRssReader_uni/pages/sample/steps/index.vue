<template>
    <view class="container">
        <view class="doc-title zan-hairline--bottom">STEPS</view>

        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'horizon', steps: steps"></template> -->
                    <block name="zan-steps">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (hasDesc ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="hasDesc && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>

            <view class="zan-cell">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'horizon', steps: steps2"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (hasDesc ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="hasDesc && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>

            <view class="zan-cell zan-cell--last-child">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'horizon', steps: steps3"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (hasDesc ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="hasDesc && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="zan-panel-title">有描述的steps</view>
        <view class="zan-panel">
            <view class="zan-cell">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'horizon', hasDesc: true, steps: steps"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (true ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>

            <view class="zan-cell">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'horizon', hasDesc: true, steps: steps2"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (true ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>

            <view class="zan-cell zan-cell--last-child">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'horizon', hasDesc: true, steps: steps3"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (true ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="zan-panel-title">垂直方向的steps</view>
        <view class="zan-panel">
            <view class="zan-cell zan-cell">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'vertical', hasDesc: true, steps"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (true ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>

            <view class="zan-cell zan-cell--last-child">
                <view class="zan-cell__bd">
                    <!-- parse <template is="zan-steps" :data="type: 'vertical', steps"></template> -->
                    <block name="zan-steps" v-if="false">
                        <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + className">
                            <view
                                :class="
                                    'zan-steps__step ' +
                                    (true ? 'zan-steps__step--db-title' : '') +
                                    ' ' +
                                    (index == 0 ? 'zan-steps__step--first-child' : '') +
                                    ' ' +
                                    (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                    ' ' +
                                    (step.done ? 'zan-steps__step--done' : '') +
                                    ' ' +
                                    (step.current ? 'zan-steps__step--cur' : '')
                                "
                                v-for="(step, index) in steps2"
                                :key="index"
                            >
                                <view class="zan-steps__title">{{ step.text }}</view>

                                <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                                <view class="zan-steps__icons">
                                    <view class="zan-steps__circle"></view>
                                </view>

                                <view class="zan-steps__line"></view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="zan-panel-title">可自定义class</view>
        <view class="zan-panel">
            <view class="zan-cell__bd">
                <!-- parse <template is="zan-steps" :data="type: 'vertical', steps, className: 'my-class'"></template> -->
                <block name="zan-steps" v-if="false">
                    <view :class="'zan-steps zan-steps--' + ('horizon' == 'vertical' ? 'vsteps' : 'steps') + ' zan-steps--' + steps2.length + ' ' + 'my-class'">
                        <view
                            :class="
                                'zan-steps__step ' +
                                (true ? 'zan-steps__step--db-title' : '') +
                                ' ' +
                                (index == 0 ? 'zan-steps__step--first-child' : '') +
                                ' ' +
                                (index == steps2.length - 1 ? 'zan-steps__step--last-child' : '') +
                                ' ' +
                                (step.done ? 'zan-steps__step--done' : '') +
                                ' ' +
                                (step.current ? 'zan-steps__step--cur' : '')
                            "
                            v-for="(step, index) in steps2"
                            :key="index"
                        >
                            <view class="zan-steps__title">{{ step.text }}</view>

                            <view v-if="true && step.desc" class="zan-steps__title zan-steps__title--desc">{{ step.desc }}</view>

                            <view class="zan-steps__icons">
                                <view class="zan-steps__circle"></view>
                            </view>

                            <view class="zan-steps__line"></view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                {
                    current: true,
                    done: true,
                    text: '步骤一',
                    desc: '10.01'
                },
                {
                    done: false,
                    current: false,
                    text: '步骤二',
                    desc: '10.02'
                },
                {
                    done: false,
                    current: false,
                    text: '步骤三'
                }
            ],

            steps2: [
                {
                    current: false,
                    done: true,
                    text: '步骤一',
                    desc: '10.01'
                },
                {
                    done: true,
                    current: true,
                    text: '步骤二',
                    desc: '10.02'
                },
                {
                    done: false,
                    current: false,
                    text: '步骤三',
                    desc: '10.03'
                }
            ],

            steps3: [
                {
                    current: false,
                    done: true,
                    text: '步骤一',
                    desc: '10.01'
                },
                {
                    done: true,
                    current: false,
                    text: '步骤二',
                    desc: '10.02'
                },
                {
                    done: true,
                    current: true,
                    text: '步骤三',
                    desc: '10.03'
                }
            ],

            className: '',
            hasDesc: false,

            step: {
                done: false,
                current: false,
                text: '',
                desc: ''
            }
        };
    },
    onLoad() {},
    onShow() {},
    methods: {}
};
</script>
<style>
@import './index.css';
@import '@/dist/steps/index.css';
</style>
