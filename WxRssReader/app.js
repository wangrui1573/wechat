
var xml2json = require('./lib/xml2json.js');

App({
  // 定义朗读方法
  speakText: function (text) {
    this.innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false
    })
    const that = this;
    wx.request({
      url: "https://tsn.baidu.com/text2audio",
      data: {
        tex: text,
        spd: 4,
        aue: 3,
        cuid: 'baidu_speech_demo',
        idx: 1,
        cod: 2,
        lan: 'zh',
        ctp: 1,
        pdt: 220,
        vol: 12,
        pit: 5,
        _res_tag_: 'audio'
      },
      responseType: 'arraybuffer',
      success(res) {
        const buffer = res.data;
        const fs = wx.getFileSystemManager();
        const path = wx.env.USER_DATA_PATH + "/temp_audio.mp3";
        fs.writeFileSync(path, buffer, 'binary');
        that.innerAudioContext.src = path;
        that.innerAudioContext.play();
      },
      fail(err) {
        console.error('TTS 请求失败', err);
      }
    });
  },
  

  globalData: {
  },
  "lazyCodeLoading": "requiredComponents",
  

  getRss: function (url, fn) {
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data = res.data.replace(/content:encoded/g, "content");
        //console.log(data);
        try {
          data = decodeURIComponent(data)
        }catch (err){}
        //data = htmlDecodeByRegExp(data)
        data = unescape(data.replace(/&#x/g, '%u').replace(/;/g, ''))
        //console.log(xml2json(data));
        var json; 
        try {
          json = xml2json(data).rss.channel.item.slice(0,10);    
        } catch(err){
          json = xml2json(data).feed.entry.slice(0,10);
        }
        //console.log(json);
        fn(json);
      }
    })
  },

  
  

});
