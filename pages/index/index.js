const app = getApp();

Page({
  data: {
    dateType: ['阳历', '农历'],
    typeIndex: 0,
    date: '1990-01-01',
    maxDate : '',
	  shareTitle : ''
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
	  this.randomShareTitle();
    return {
      title: this.data.shareTitle,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
	randomShareTitle(){
		let shareIndexTitle = [
			'查看自己存在了多长时间',
			'查看自己还剩多长时间',
			'查看自己还能享受多少个周末',
			'查看自己还能享受多少次美食',
			'查看自己的天干地支',
			'查看自己还能摇多少次北京车牌',
		],
		randomCount = Math.floor(Math.random()*shareIndexTitle.length);
		this.setData({
			shareTitle : shareIndexTitle[randomCount]
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
