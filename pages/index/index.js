const app = getApp();

Page({
  data: {
    dateType: ['阳历', '农历'],
    typeIndex: 0,
    date: '1990-01-01',
    maxDate : '',
  },
  onShow: function () {
    let today = new Date(),
        maxDate = today.getFullYear() +'-'+ (today.getMonth() + 1) +'-'+ today.getDate();
    wx.setStorage({
      key:"date",
      data:this.data.date
    });
    wx.setStorage({
      key:"type",
      data:this.data.typeIndex
    });
    this.setData({
      maxDate: maxDate
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '看看自己存在了多长时间',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    });
    wx.setStorageSync('type', e.detail.value);
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
    wx.setStorageSync('date', e.detail.value);
    console.log(wx.getStorageSync('date'))
  }
});
