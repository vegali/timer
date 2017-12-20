const app = getApp();

Page({
  data: {
    dateType: ['阳历', '农历'],
    typeIndex: 0,
    date: '1990-01-01',
    maxDate : '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
