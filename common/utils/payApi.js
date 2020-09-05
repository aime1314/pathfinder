import http from "./http.js";
export default {
	
	wxPay(data, fn, fn2) {
		var payT = data;
		uni.requestPayment({
			'timeStamp': payT.timeStamp + "", // 时间戳从1970年1月1日至今的秒数，即当前的时间。
			'nonceStr': payT.nonceStr, // 随机字符串，长度为32个字符以下。
			'package': payT.package, // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
			'signType': 'MD5', // 签名算法，暂支持 MD5。
			'paySign': payT.paySign, // 签名
			'success'(res) {
				fn(res)
			},
			'fail'(res) {
				fn2(res)
			}
		})
	},
	ALiPay(data, fn, fn2) {
		var payT = data;
		uni.requestPayment({
			orderInfo: payT.orderInfo,
			success(res) {
				fn(res)
			},
			fail(res) {
				fn2(res)
			}
		})
	}
	
}