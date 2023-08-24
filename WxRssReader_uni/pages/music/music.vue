<template>
    <view style="height: 100%">
        <view class="container">
            <view class="content">
                <image class="cover" :src="musicData[currentMusicIndex].cover" :style="'transform: rotate(' + rotateDeg + 'deg);'"></image>
                <view class="spacer60"></view>
                <text class="title">{{ musicData[currentMusicIndex].name }}</text>
            </view>
            <view class="spacer90"></view>
            <view class="button-group">
                <button class="play-button" @tap="togglePlayMode">
                    <i :class="playMode === 'sequence' ? 'iconfont wx-shunxubofang' : playMode === 'random' ? 'iconfont wx-suijibofang' : 'iconfont wx-danquxunhuan'"></i>
                </button>

                <button class="play-button" @tap="prev"><view class="iconfont wx-shangyishou"></view></button>
                <button class="play-button" @tap="play" v-if="!isPlaying"><view class="iconfont wx-bofang"></view></button>

                <button class="pause-button" @tap="pause" v-if="isPlaying"><view class="iconfont wx-zanting"></view></button>
                <button class="play-button" @tap="next"><view class="iconfont wx-xiayishou"></view></button>
                <button class="play-button" @tap="toggleSongList"><view class="iconfont wx-library"></view></button>
            </view>
        </view>

        <view class="popup-mask" v-if="showSongList">
            <view :class="'popup ' + (showSongList ? 'active' : '')">
                <!-- 歌曲列表 -->
                <view class="song-list">
                    <block v-for="(item, index) in musicData" :key="index">
                        <view class="song-item" @tap="playSong" :data-index="index">
                            <text class="song-info">
                                <text class="song-name">{{ item.name }}</text>
                                <text class="song-artist">({{ item.author }})</text>
                            </text>
                        </view>
                    </block>
                </view>

                <!-- <button class="close-button" bindtap="toggleSongList">关闭</button> -->
            </view>
        </view>

        <view class="transparent-mask" v-if="showSongList" @tap="closeSongList"></view>
    </view>
</template>

<script>
// pages/music/music.js
export default {
    data() {
        return {
            musicData: [],

            // 歌曲数据
            currentMusicIndex: 0,

            // 当前播放歌曲的索引
            isPlaying: false,

            // 是否正在播放
            rotateDeg: 0,

            // 旋转角度
            showSongList: false,

            // 控制歌曲列表弹出层的显示
            // 播放模式：'sequence'为顺序播放，'random'为随机播放，'loop'为循环播放
            playMode: 'sequence',

            cover: '',
            name: ''
        };
    },
    onLoad: function () {
        const localMusicData = uni.getStorageSync('musicData');
        if (localMusicData) {
            this.setData({
                musicData: localMusicData
            });
        }
        this.updateMusicData();
    },
    methods: {
        toggleSongList: function () {
            this.setData({
                showSongList: !this.showSongList
            });
        },

        closeSongList: function () {
            this.setData({
                showSongList: false
            });
        },

        playSong: function (e) {
            const index = e.currentTarget.dataset.index;
            const music = this.musicData[index];
            uni.playBackgroundAudio({
                dataUrl: music.link,
                title: music.name
            });
        },

        updateMusicData: function () {
            uni.request({
                url: 'https://db.real9.cn/real/lesson/2',
                success: (res) => {
                    const remoteMusicData = res.data;
                    uni.setStorageSync('musicData', remoteMusicData);
                    this.setData({
                        musicData: remoteMusicData
                    });
                    uni.showToast({
                        title: '数据更新完成',
                        icon: 'success',
                        duration: 2000
                    });
                },
                fail: (err) => {
                    console.error('获取远程歌曲数据失败', err);
                }
            });
        },

        togglePlayMode: function () {
            let newMode;
            if (this.playMode === 'sequence') {
                newMode = 'random';
            } else if (this.playMode === 'random') {
                newMode = 'loop';
            } else {
                newMode = 'sequence';
            }
            this.setData({
                playMode: newMode
            });
        },

        getNextIndex: function () {
            const currentIndex = this.currentMusicIndex;
            const musicDataLength = this.musicData.length;
            if (this.playMode === 'sequence') {
                return currentIndex < musicDataLength - 1 ? currentIndex + 1 : 0;
            } else if (this.playMode === 'random') {
                return Math.floor(Math.random() * musicDataLength);
            } else {
                return currentIndex;
            }
        },

        onMusicEnd: function () {
            const nextIndex = this.getNextIndex();
            this.setData({
                currentMusicIndex: nextIndex
            });
            if (this.isPlaying) {
                this.play();
            }
        },

        play: function () {
            const music = this.musicData[this.currentMusicIndex];
            uni.playBackgroundAudio({
                dataUrl: music.link,
                title: music.name
            });
            this.setData({
                isPlaying: true
            });
            this.rotateCover();
            uni.onBackgroundAudioStop(this.onMusicEnd);
        },

        pause: function () {
            uni.pauseBackgroundAudio();
            this.setData({
                isPlaying: false
            });
            clearInterval(this.rotateInterval);
        },

        rotateCover: function () {
            this.rotateInterval = setInterval(() => {
                this.setData({
                    rotateDeg: this.rotateDeg + 1
                });
            }, 30);
        },

        prev: function () {
            const prevIndex = this.currentMusicIndex - 1;
            let newIndex;
            if (prevIndex >= 0) {
                newIndex = prevIndex;
            } else {
                newIndex = this.musicData.length - 1;
            }
            this.setData({
                currentMusicIndex: newIndex
            });
            if (this.isPlaying) {
                this.play();
            }
        },

        next: function () {
            const nextIndex = this.getNextIndex();
            this.setData({
                currentMusicIndex: nextIndex
            });
            if (this.isPlaying) {
                this.play();
            }
        }
    }
};
</script>
<style>
@import './music.css';
</style>
