// pages/ip-calculator/index.js

Page({
  data: {
    ipAddress: '',
    subnetMask: '',
    ipRange: ''
  },

  // 处理用户输入的IP地址和掩码长度
  handleInput: function (e) {
    const { value } = e.detail;
    const key = e.currentTarget.dataset.key;
    this.setData({
      [key]: value
    });
  },

  // 计算IP地址段
  calculateRange: function () {
    const { ipAddress, subnetMask } = this.data;

    if (!ipAddress || !subnetMask) {
      wx.showToast({
        title: '请输入IP地址和掩码长度',
        icon: 'none'
      });
      return;
    }

    const ipParts = ipAddress.split('.');
    const mask = 0xFFFFFFFF << (32 - parseInt(subnetMask));
    const startIp = (ipParts[0] << 24 | ipParts[1] << 16 | ipParts[2] << 8 | ipParts[3]) & mask;
    const endIp = startIp | (~mask & 0xFFFFFFFF);

    const startIpArray = [
      startIp >> 24 & 0xFF,
      startIp >> 16 & 0xFF,
      startIp >> 8 & 0xFF,
      startIp & 0xFF
    ];
    const endIpArray = [
      endIp >> 24 & 0xFF,
      endIp >> 16 & 0xFF,
      endIp >> 8 & 0xFF,
      endIp & 0xFF
    ];

    const ipRange = startIpArray.join('.') + '~' + endIpArray.join('.');
    this.setData({ ipRange });
  }
});
