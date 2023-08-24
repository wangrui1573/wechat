<template>
    <view style="height: 100%">
        <!--**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */-->

        <!-- 基础元素 -->
        <template name="wxParseVideo">
            <!-- 增加video标签支持，并循环添加 -->
            <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                <video :class="item.classStr + ' wxParse-' + item.tag + '-video'" :src="item.attr.src"></video>
            </view>
        </template>

        <template name="wxParseImg">
            <image
                :class="item.classStr + ' wxParse-' + item.tag"
                :data-from="item.from"
                :data-src="item.attr.src"
                :data-idx="item.imgIndex"
                :src="item.attr.src"
                mode="widthFix"
                @load="wxParseImgLoad"
                @tap="wxParseImgTap"
                :style="'width:' + item.width + 'px;'"
            />
        </template>

        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="WxEmojiView" v-if="false">
            <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                <block v-for="(item, index) in item.textArray" :key="index">
                    <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                    <block v-else-if="item.node == 'element'">
                        <image class="wxEmoji" :src="item.baseSrc + item.text" />
                    </block>
                </block>
            </view>
        </block>

        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="WxParseBr" v-if="false">
            <text>\n</text>
        </block>
        <!-- 入口模版 -->

        <template name="wxParse">
            <block v-for="(item, index) in wxParseData" :key="index">
                <!-- <template is="wxParse0" :data="item"/> -->
                <mp-html :content="item"></mp-html>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse0">
            <!-- <template is="wxParse1" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse1" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse1" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse1" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>
                <block v-else-if="item.tag == 'table'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse1" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse1" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse1" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse1">
            <!-- <template is="wxParse2" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse2" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse2" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse2" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse2" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse2" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse2">
            <!-- <template is="wxParse3" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse3" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse3" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse3" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse3" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse3" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse3">
            <!-- <template is="wxParse4" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse4" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse4" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse4" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse4" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse4" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse4">
            <!-- <template is="wxParse5" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse5" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse5" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse5" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse5" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse5" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse5">
            <!-- <template is="wxParse6" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse6" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse6" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse6" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse6" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse6" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse6">
            <!-- <template is="wxParse7" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse7" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse7" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse7" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse7" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse7" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>
        <!-- 循环模版 -->
        <template name="wxParse7">
            <!-- <template is="wxParse8" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse8" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse8" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse8" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse8" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse8" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse8">
            <!-- <template is="wxParse9" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse9" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse9" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse9" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse9" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse9" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse9">
            <!-- <template is="wxParse10" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse10" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse10" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse10" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse10" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse10" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse10">
            <!-- <template is="wxParse11" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse11" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse11" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse11" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse11" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse11" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>

        <!-- 循环模版 -->
        <template name="wxParse11">
            <!-- <template is="wxParse12" data="{{item}}" /> -->
            <!-- 判断是否是标签节点 -->
            <block v-if="item.node == 'element'">
                <block v-if="item.tag == 'button'">
                    <button type="default" size="mini">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse12" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </button>
                </block>
                <!-- li类型 -->
                <block v-else-if="item.tag == 'li'">
                    <view :class="item.classStr + ' wxParse-li'" :style="item.styleStr">
                        <view :class="item.classStr + ' wxParse-li-inner'">
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <view :class="item.classStr + ' wxParse-li-circle'"></view>
                            </view>
                            <view :class="item.classStr + ' wxParse-li-text'">
                                <block v-for="(item, index) in item.nodes" :key="index">
                                    <!-- <template is="wxParse12" :data="item"/> -->
                                    <mp-html :content="item"></mp-html>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>

                <!-- video类型 -->
                <block v-else-if="item.tag == 'video'">
                    <!-- <template is="wxParseVideo" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- img类型 -->
                <block v-else-if="item.tag == 'img'">
                    <!-- <template is="wxParseImg" :data="item"/> -->
                    <mp-html :content="item"></mp-html>
                </block>

                <!-- a类型 -->
                <block v-else-if="item.tag == 'a'">
                    <view @tap="wxParseTagATap" :class="'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag" :data-src="item.attr.href" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse12" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <block v-else-if="item.tag == 'br'">
                    <!-- parse <template is="WxParseBr"></template> -->
                    <block name="WxParseBr" v-if="false">
                        <text>\n</text>
                    </block>
                </block>
                <!-- 其他块级标签 -->
                <block v-else-if="item.tagType == 'block'">
                    <view :class="item.classStr + ' wxParse-' + item.tag" :style="item.styleStr">
                        <block v-for="(item, index) in item.nodes" :key="index">
                            <!-- <template is="wxParse12" :data="item"/> -->
                            <mp-html :content="item"></mp-html>
                        </block>
                    </view>
                </block>

                <!-- 内联标签 -->
                <view v-else :class="item.classStr + ' wxParse-' + item.tag + ' wxParse-' + item.tagType" :style="item.styleStr">
                    <block v-for="(item, index) in item.nodes" :key="index">
                        <!-- <template is="wxParse12" :data="item"/> -->
                        <mp-html :content="item"></mp-html>
                    </block>
                </view>
            </block>

            <!-- 判断是否是文本节点 -->
            <block v-else-if="item.node == 'text'">
                <!-- 如果是，直接进行 -->
                <!-- parse <template is="WxEmojiView" :data="item"/> -->
                <block name="WxEmojiView" v-if="false">
                    <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
                        <block v-for="(item, index) in item.textArray" :key="index">
                            <block :class="item.text == '\\n' ? 'wxParse-hide' : ''" v-if="item.node == 'text'">{{ item.text }}</block>

                            <block v-else-if="item.node == 'element'">
                                <image class="wxEmoji" :src="item.baseSrc + item.text" />
                            </block>
                        </block>
                    </view>
                </block>
            </block>
        </template>
    </view>
</template>

<script>
/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 *
 * github地址: https://github.com/icindy/wxParse
 *
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */
/**
 * utils函数引入
 **/
import showdown from './showdown.js';
import HtmlToJson from './html2json.js';
/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
uni.getSystemInfo({
    success: function (res) {
        realWindowWidth = res.windowWidth;
        realWindowHeight = res.windowHeight;
    }
});
/**
 * 主函数入口区
 **/
function wxParse(bindName = 'wxParseData', type = 'html', data = '<div class="color:red;">数据不能为空</div>', target, imagePadding) {
    var that = target;
    var transData = {}; //存放转化后的数据
    if (type == 'html') {
        transData = HtmlToJson.html2json(data, bindName);
        //console.log(JSON.stringify(transData, ' ', ' '));
    } else if (type == 'md' || type == 'markdown') {
        var converter = new showdown.Converter();
        var html = converter.makeHtml(data);
        transData = HtmlToJson.html2json(html, bindName);
        //console.log(JSON.stringify(transData, ' ', ' '));
    }

    transData.view = {};
    transData.view.imagePadding = 0;
    if (typeof imagePadding != 'undefined') {
        transData.view.imagePadding = imagePadding;
    }
    var bindData = {};
    bindData[bindName] = transData;
    that.setData(bindData);
    that.wxParseImgLoad = wxParseImgLoad;
    that.wxParseImgTap = wxParseImgTap;
}
// 图片点击事件
function wxParseImgTap(e) {
    var that = this;
    var nowImgUrl = e.target.dataset.src;
    var tagFrom = e.target.dataset.from;
    if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
        uni.previewImage({
            current: nowImgUrl,
            // 当前显示图片的http链接
            urls: that[tagFrom].imageUrls // 需要预览的图片http链接列表
        });
    }
}

/**
 * 图片视觉宽高计算函数区
 **/
function wxParseImgLoad(e) {
    var that = this;
    var tagFrom = e.target.dataset.from;
    var idx = e.target.dataset.idx;
    if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
        calMoreImageInfo(e, idx, that, tagFrom);
    }
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {
    var temData = that.data[bindName];
    if (!temData || temData.images.length == 0) {
        return;
    }
    var temImages = temData.images;
    //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
    var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
    // temImages[idx].width = recal.imageWidth;
    // temImages[idx].height = recal.imageheight;
    // temData.images = temImages;
    // var bindData = {};
    // bindData[bindName] = temData;
    // that.setData(bindData);
    var index = temImages[idx].index;
    var key = `${bindName}`;
    for (var i of index.split('.')) {
        key += `.nodes[${i}]`;
    }
    var keyW = key + '.width';
    var keyH = key + '.height';
    that.setData({
        [keyW]: recal.imageWidth,
        [keyH]: recal.imageheight
    });
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
    //获取图片的原始长宽
    var windowWidth = 0;
    var windowHeight = 0;
    var autoWidth = 0;
    var autoHeight = 0;
    var results = {};
    var padding = that.data[bindName].view.imagePadding;
    windowWidth = realWindowWidth - 2 * padding;
    windowHeight = realWindowHeight;
    //判断按照那种方式进行缩放
    // console.log("windowWidth" + windowWidth);
    if (originalWidth > windowWidth) {
        //在图片width大于手机屏幕width时候
        autoWidth = windowWidth - 20;
        // console.log("autoWidth" + autoWidth);
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        // console.log("autoHeight" + autoHeight);
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
    } else {
        //否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
    }
    return results;
}
function wxParseTemArray(temArrayName, bindNameReg, total, that) {
    var array = [];
    var temData = that.data;
    var obj = null;
    for (var i = 0; i < total; i++) {
        var simArr = temData[bindNameReg + i].nodes;
        array.push(simArr);
    }
    temArrayName = temArrayName || 'wxParseTemArray';
    obj = JSON.parse('{"' + temArrayName + '":""}');
    obj[temArrayName] = array;
    that.setData(obj);
}

/**
 * 配置emojis
 *
 */

function emojisInit(reg = '', baseSrc = '/wxParse/emojis/', emojis) {
    HtmlToJson.emojisInit(reg, baseSrc, emojis);
}
module.exports = {
    wxParse: wxParse,
    wxParseTemArray: wxParseTemArray,
    emojisInit: emojisInit
};
</script>
<style>
@import './wxParse.css';
@import '@/pages/wxParse/wxParse.css';
</style>
