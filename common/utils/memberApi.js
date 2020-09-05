import http from "./http.js";
export default {
	// 检验心跳
	getUserToken(data) {
		return http.request({
			url: "/yangjian/mem/heartBeat",
			method: "POST",
			data
		});
	},
	
	// 获取注册短信验证码
	getPhoneVerifyCode(data) {
		return http.request({
			url: "/yangjian/exercise/createSmsCode?phone=" + data,
			method: "POST",
			data
		})
	},	
	// 登录
	login(data) {
		return http.request({
			url: "/yangjian/mem/codelogin",
			method: "POST",
			data
		})
	},	
	//新增收货地址
	addConsigneeInfo(data){
		return http.request({
			url:"/member/consigneeInfo/add",
			method:"POST",
			data
		})
	},
	
	//删除收货地址
	deleteConsigneeInfo(data){
		return http.request({
			url:"/member/consigneeInfo/delete/"+data,
			method:"GET",
			data
		})
	},
	//修改收货地址
	updateConsigneeInfo(data){
		return http.request({
			url:"/member/consigneeInfo/update",
			method:"POST",
			data
		})
	},
	//查询单个收货地址
	getConsigneeInfo(data){
		return http.request({
			url:"/member/consigneeInfo/getOne/"+data,
			method:"GET",
			data
		})
	},
	//查询收货人信息列表
	getConsigneeInfoList(data){
		return http.request({
			url:"/member/consigneeInfo/getAll/"+data,
			method:"GET",
			data
		})
	},
	// 查询用户权益
	getMemberGift(data){
		return http.request({
			url:"/cmall/shop/v1/front/salesOrder/frontendSalesOrderList",
			method:"POST",
			data
		})
	},
	//查询用户（超级会员）会员权益所匹配的优惠券信息
	getSvipDataCoupon(data){
		return http.request({
			url:"/cmall/channel/v1/front/vip/vipcoupons/" + data,
			method:"GET",
			data
		})
	},
	
}