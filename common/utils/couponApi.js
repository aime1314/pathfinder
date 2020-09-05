import http from "./http.js";
export default {

	//获取用户优惠券列表
	getMemCpnVoucherList(data){
		return http.request({
			url: '/coupons/voucher/getMemVouchersList',
			method: 'POST',
			data
		});
	},
}