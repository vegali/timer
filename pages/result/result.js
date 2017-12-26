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
		liveCar : '',
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
		shareTitle : '',
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
					app.globalData.userInfo = res.userInfo;
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
		this.randomShareTitle();
		return {
			title: this.data.shareTitle,
			path: '/pages/index/index',
			success: function(res) {
				// 转发成功
			},
			fail: function(res) {
				// 转发失败
			}
		}
	},
	randomShareTitle(){
		let shareMsgLive = [
			'我已经存在了' + this.data.liveYear + '年\n快来看看你的吧',
			'我已经存在了' + this.data.liveYear + '年\n比比到底谁小',
			'我已经存在了' + this.data.liveYear + '年\n比比谁吃的盐多',
			'我已经存在了' + this.data.liveYear + '年\n比比谁走的桥多',
			'我已经存在了' + this.data.liveMonth + '个月\n快来看看你的吧',
			'我已经存在了' + this.data.liveDay + '天\n快来看看你的吧',
			// '我已经存在了' + this.data.liveHour + '小时\n快来看看你的吧',
			// '我已经存在了' + this.data.liveMinute + '分钟\n快来看看你的吧',
			// '我已经存在了' + this.data.liveSecond + '秒\n快来看看你的吧',
			'我的天干地支是' + this.data.birthday.gzYear + this.data.birthday.gzMonth + this.data.birthday.gzDay + '\n大吉日啊,快来看看你的吧',
		],
		shareMsgDead = [
			'我大约还能存在' + this.data.deadYear + '年\n快来看看你的吧',
			'我大约还能存在' + this.data.deadYear + '年\n谁能熬过我',
			'我大约还能存在' + this.data.deadYear + '年\n怎么着都摇到北京小汽车牌了吧',
			// '我大约还能存在' + this.data.deadYear + '年\n那时候估计台湾都回归了',
			'我大约还能存在' + this.data.deadYear + '年\n估计能看到贾跃亭回国吧',
			// '我大约还能存在' + this.data.deadYear + '年\n估计能熬到房价降的那一天',
			// '我大约还能存在' + this.data.deadYear + '年\n估计能熬到房价降的那一天',
			// '我大约还能存在' + this.data.deadMonth + '月\n快来看看你的吧',
			// '我大约还能存在' + this.data.deadDay + '日\n快来看看你的吧',
			// '我大约还能睡' + this.data.deadDay + '个美梦\n今天就早点休息吧',
			// '我大约还能存在' + this.data.deadHour + '时\n快来看看你的吧',
			// '我大约还能存在' + this.data.deadMinute + '分\n快来看看你的吧',
			// '我大约还能存在' + this.data.deadSecond + '秒\n快来看看你的吧',
			// '我大约还能存在' + this.data.deadSecond + '秒\n快来看看你的吧',
			// '我大约还能存在' + this.data.deadSecond + '秒\n快来看看你的吧',
			// '我国平均寿命是' + this.data.average + '年\n人生得意须尽欢',
			'我此生大约还能度过' + this.data.deadWeek + '个周末\n是时候欢聚一下啦',
			'我此生大约还能度过' + this.data.deadWeek + '个周末\n睡他个天昏地暗',
			'我此生大约还能享用' + this.data.deadFood + '次美食\n还不赶紧请我吃顿好的',
			'我此生大约还能享用' + this.data.deadFood + '次美食\n唯有美食不可辜负',
			// '我此生大约还能拥有' + this.data.deadLove + '个不可描述的夜晚\n要锻炼好身体哟',
			// '我此生大约还能拥有' + this.data.deadLove + '个不可描述的夜晚\n唯有爱人不可辜负',
			'我此生大约还能拥有' + this.data.deadLove + '个不可描述的夜晚\nTA好我也好',
			'我此生大约还能拥有' + this.data.deadLove + '个不可描述的夜晚\n今天翻谁的牌子好呢',
			'我此生大约还能拥有' + this.data.deadLove + '个不可描述的夜晚\n但是手好累啊',
			'我此生大约还能拥有' + this.data.deadLove + '个不可描述的夜晚\n看来今晚又是个不眠之夜啊',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n怎么着也中签了吧!',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n一定会中签的!',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n谁敢比我惨啊!',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n这回该我中了吧!',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n谁能告诉我中签要拜哪路佛!',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n我已经沐浴、斋戒、更衣,就等26号了',
			'我此生大约还能拥有' + this.data.deadCar + '次摇号机会\n老子跟你丫磕上了',
		],
		shareMsgAverage = [
			'我国平均寿命是' + this.data.average + '年\n我已经跑赢了平均寿命,棒棒哒',
			'我已经跑赢了国内的平均寿命' + this.data.average + '岁\n想知道养生秘诀的就请我吃饭',
			'我已经跑赢了国内的平均寿命' + this.data.average + '岁\n想知道养生秘诀的给我发红包',
			'我已经跑赢了国内的平均寿命' + this.data.average + '岁\n吃的盐比你吃过的米都多',
			'我已经跑赢了国内的平均寿命' + this.data.average + '岁\n走的桥比你走的路都多',
			'什么北京车牌,我已经不在乎了',
		],
		shareMsgResult,
		randomCount;
		
		if(this.data.liveYear > this.data.average){
			shareMsgResult = shareMsgLive.concat(shareMsgAverage)
		}else{
			shareMsgResult = shareMsgLive.concat(shareMsgDead)
		}
		randomCount = Math.floor(Math.random()*shareMsgResult.length);
		this.setData({
			shareTitle : shareMsgResult[randomCount]
		})
		
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
			liveTime = nowDate - birthday,
			deadAverage = this.data.average * 365 * 24 * 60 * 60 * 1000,      // 平均寿命毫秒数
			deadRemain  = deadAverage - this.data.liveTime;                   // 剩余时间毫秒数
		
		this.setData({
			liveTime    : liveTime,
			birthday    : birthdayObj,
			liveSecond  : (liveTime / 1000).toFixed(0),
			liveMinute  : (liveTime / 1000 / 60).toFixed(0),
			liveHour    : (liveTime / 1000 / 60 / 60).toFixed(0),
			liveDay     : (liveTime / 1000 / 60 / 60 / 24).toFixed(0),
			liveMonth   : (liveTime / 1000 / 60 / 60 / 24 / 30).toFixed(2),
			liveYear    : (liveTime / 1000 / 60 / 60 / 24 / 365).toFixed(2),
			deadSecond  : (deadRemain / 1000).toFixed(0),
			deadMinute  : (deadRemain / 1000 / 60).toFixed(0),
			deadHour    : (deadRemain / 1000 / 60 / 60).toFixed(0),
			deadDay     : (deadRemain / 1000 / 60 / 60 / 24).toFixed(0),
			deadFood    : (deadRemain / 1000 / 60 / 60 / 24 * 3).toFixed(0),
			deadWeek    : (deadRemain / 1000 / 60 / 60 / 24 / 7).toFixed(0),
			deadMonth   : (deadRemain / 1000 / 60 / 60 / 24 / 30).toFixed(2),
			deadCar     : (deadRemain / 1000 / 60 / 60 / 24 / 30 / 2).toFixed(0),
			deadLove    : (deadRemain / 1000 / 60 / 60 / 24 / 30 * this.data.makeLove).toFixed(0),
			deadYear    : (deadRemain / 1000 / 60 / 60 / 24 / 365).toFixed(2),		});
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
		
		this.setData({
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
