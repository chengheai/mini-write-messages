// 时间处理
/**
 * dateTimeStamp是评论的发送时间   2020-01-12 20:10:15 这样的形式
 * @param dateTimeStamp
 * @returns {string}
 */
// export function timestampFormat(dateTimeStamp) {
// 	console.log('====',dateTimeStamp)
// 	let result = "";
// 	let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
// 	let hour = minute * 60;
// 	let day = hour * 24;
// 	let week = day * 7;
// 	let halfamonth = day * 15;
// 	let month = day * 30;
// 	let now = new Date().getTime(); //获取当前时间毫秒

// 	dateTimeStamp = dateTimeStamp.substring(0, 18);
// 	//必须把日期'-'转为'/'
// 	dateTimeStamp = dateTimeStamp.replace(/-/g, '/');
// 	let timestamp = new Date(dateTimeStamp).getTime();

// 	let diffValue = now - timestamp; //时间差

// 	if (diffValue < 0) {
// 		return result;
// 	}
// 	let minC = diffValue / minute; //计算时间差的分，时，天，周，月
// 	let hourC = diffValue / hour;
// 	let dayC = diffValue / day;
// 	let weekC = diffValue / week;
// 	let monthC = diffValue / month;
// 	// if (monthC >= 1 && monthC <= 3) {
// 	// 	result = " " + parseInt(monthC) + "月前"
// 	// } else if (weekC >= 1 && weekC <= 3) {
// 	// 	result = " " + parseInt(weekC) + "周前"
// 	// } else 
// 	if (dayC >= 1 && dayC <= 6) {
// 		result = " " + parseInt(dayC) + "天前"
// 	} else if (hourC >= 1 && hourC <= 23) {
// 		result = " " + parseInt(hourC) + "小时前"
// 	} else if (minC >= 1 && minC <= 59) {
// 		result = " " + parseInt(minC) + "分钟前"
// 	} else if (diffValue >= 0 && diffValue <= minute) {
// 		result = "刚刚"
// 	} else {
// 		let datetime = new Date();
// 		datetime.setTime(dateTimeStamp);
// 		let Nyear = datetime.getFullYear();
// 		console.log(1111111111)
// 		let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
// 		let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
// 		let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
// 		let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
// 		let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
// 		result = Nyear + "-" + Nmonth + "-" + Ndate
// 	}
// 	return result;


// }
export function timestampFormat(timestamp) {

	function autoZero(num) {
		return (String(num).length == 1 ? '0' : '') + num;
	}
	//js函数代码：字符串转换为时间戳
	function getDateTimeStamp(dateStr) {
		return Date.parse(dateStr.replace(/-/gi, "/"));
	}
	timestamp = (getDateTimeStamp(timestamp) / 1000)
	var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
	var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

	var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
	var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

	var Y = tmDate.getFullYear(),
		m = tmDate.getMonth() + 1,
		d = tmDate.getDate();
	var H = tmDate.getHours(),
		i = tmDate.getMinutes(),
		s = tmDate.getSeconds();

	if (timestampDiff < 60) {
		// 一分钟以内
		return '刚刚';
	} else if (timestampDiff < 3600) {
		// 一小时前之内
		return Math.floor(timestampDiff / 60) + '分钟前';
	} else if (
		curDate.getFullYear() == Y &&
		curDate.getMonth() + 1 == m &&
		curDate.getDate() == d
	) {
		return '今天' + autoZero(H) + ':' + autoZero(i);
	} else {
		var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
		if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
			return '昨天' + autoZero(H) + ':' + autoZero(i);
		} else if (curDate.getFullYear() == Y) {
			return Y + '年' + autoZero(m) + '月' + autoZero(d) + '日';
		} else {
			return (
				Y +
				'年' +
				autoZero(m) +
				'月' +
				autoZero(d) +
				'日'
			);
		}
	}
}
export function requestLogin() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: function(data) {
				console.log('data:', data)
				resolve(data)
			},
			fail: function(err) {
				resolve(err)
			}
		})
	})
}
