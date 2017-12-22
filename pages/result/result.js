const app = getApp();
import { calendar } from '../../utils/calendar.js';
let nowTimer, pastTimer;

Page({
	data: {
		animationData: {},
		animationData2: {},
		animationData3: {},
		userInfo: {},
		hasUserInfo: false,
		average: 76.34,    // 国内平均寿命
		makeLove: 6.48, // 国内月作爱频率
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		dateType: ['阳历', '农历'],
		typeIndex: 0,
		date: '1990-01-01',
		liveTime: 0,
		liveSecond: '',
		liveMinute: '',
		liveHour: '',
		liveDay: '',
		liveMonth: '',
		liveYear:'',
		deadSecond: '',
		deadMinute: '',
		deadHour: '',
		deadDay: '',
		deadWeek: '',
		deadFood: '',
		deadLove: '',
		deadMonth: '',
		deadYear:'',
		birthday : {},
		showInfo : true,
		showBirth : false,
		showDead : false,
	},
	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	onShow: function () {
		// 检测storage里是否有值
		this.setData({
			date : wx.getStorageSync('date'),
			typeIndex : wx.getStorageSync('type')
		});
		this.bindNow();
	},
	onShareAppMessage: function (res) {
		return {
			title: '我已经存在了' + this.data.liveYear + '年\n快来看看你的时间吧',
			path: '/pages/index/index',
			success: function(res) {
				// 转发成功
			},
			fail: function(res) {
				// 转发失败
			}
		}
	},
	getUserInfo: function(e) {
		app.globalData.userInfo = e.detail.userInfo;
		this.setData({
			userInfo    : e.detail.userInfo,
			hasUserInfo : true
		})
	},
	singleDate: function(date){ // 单位数日期加零返回双位数
		return date.toString().length === 1 ? '0' + date : date;
	},
	bindCount:function () {
		let nowDate  = new Date().getTime(),
			birthFormat = this.data.date.split('-').map((item, index)=>(parseInt(item))),
			birthdayObj = !parseInt(this.data.typeIndex) ? calendar.solar2lunar(birthFormat[0],birthFormat[1],birthFormat[2]) : calendar.lunar2solar(birthFormat[0],birthFormat[1],birthFormat[2]),
			birthdayMonth = this.singleDate(birthdayObj.cMonth),
			birthdayDay = this.singleDate(birthdayObj.cDay),
			birthday = new Date(`${birthdayObj.cYear}-${birthdayMonth}-${birthdayDay}`).getTime(),
			liveTime = nowDate - birthday;
		
		this.setData({
				liveTime    : liveTime,
				birthday    : birthdayObj,
				liveSecond  : (liveTime / 1000).toFixed(0),
				liveMinute  : (liveTime / 1000 / 60).toFixed(0),
				liveHour    : (liveTime / 1000 / 60 / 60).toFixed(0),
				liveDay     : (liveTime / 1000 / 60 / 60 / 24).toFixed(0),
				liveMonth   : (liveTime / 1000 / 60 / 60 / 24 / 30).toFixed(2),
				liveYear    : (liveTime / 1000 / 60 / 60 / 24 / 365).toFixed(2),
		});
	},
	bindNow: function () {
		this.bindCount();
		this.setData({
			showInfo    : true,
			showBirth   : false,
			showDead    : false
		});
		this.bindCountDown();
	},
	bindPast: function () {
		this.setData({
			showInfo    : false,
			showBirth   : true,
			showDead    : false
		});
		this.bindCountDown();
	},
	bindFuture: function () {
		this.bindCount();
		let deadAverage = this.data.average * 365 * 24 * 60 * 60 * 1000,      // 平均寿命毫秒数
				deadRemain  = deadAverage - this.data.liveTime;                   // 剩余时间毫秒数
		
		this.setData({
			deadSecond  : (deadRemain / 1000).toFixed(0),
			deadMinute  : (deadRemain / 1000 / 60).toFixed(0),
			deadHour    : (deadRemain / 1000 / 60 / 60).toFixed(0),
			deadDay     : (deadRemain / 1000 / 60 / 60 / 24).toFixed(0),
			deadFood    : (deadRemain / 1000 / 60 / 60 / 24 * 3).toFixed(0),
			deadWeek    : (deadRemain / 1000 / 60 / 60 / 24 / 7).toFixed(0),
			deadMonth   : (deadRemain / 1000 / 60 / 60 / 24 / 30).toFixed(2),
			deadLove    : (deadRemain / 1000 / 60 / 60 / 24 / 30 * this.data.makeLove).toFixed(0),
			deadYear    : (deadRemain / 1000 / 60 / 60 / 24 / 365).toFixed(2),
			showInfo    : false,
			showBirth   : false,
			showDead    : true
		});
		this.bindCountDown();
	},
	bindCountDown:function () {
		let _this = this,
				_time = 1000;
		clearInterval(nowTimer);
		clearInterval(pastTimer);
		if(this.data.showInfo){
			nowTimer = setInterval(function () {
				_this.bindNow();
			},_time)
		}
		if(this.data.showDead){
			pastTimer = setInterval(function () {
				_this.bindFuture();
			},_time)
		}
	}
});
