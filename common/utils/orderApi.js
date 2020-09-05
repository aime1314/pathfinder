import http from "./http.js";
export default {
	// 获取订单信息
	getOrderList(data) {
		return http.request({
			url: "/cmall/shop/v1/front/project/getCCBHomePage",
			method: "POST",
			data
		})
	},
	frontendSalesOrderList(data) {
		return http.request({
			url: "/cmall/shop/v1/front/salesOrder/frontendSalesOrderList",
			method: "POST",
			data
		})
	},
	
	cancelOrder(data) {
		return http.request({
			url: "/cmall/shop/v1/front/salesOrder/cancelOrder",
			method: "POST",
			data
		})
	},
	salesOrderDetail(data) {
		return http.request({
			url: "/cmall/shop/v1/front/salesOrder/salesOrderDetail",
			method: "POST",
			data
		})
	},
	
	//购买权益下单
	creMemberType(data) {
		return http.request({
			url: "/cmall/channel/v1/front/vip/buy",
			method: "POST",
			data
		})
	},
	//会员权益单支付(聚合支付)
	payMemberType(data){
		return http.request({
			url: "/mars/pay/getAggregatePayParams",
			method: "POST",
			data
		})
	},
	refundOrder(data){
		return http.request({
			url: "/cmall/api/v1/wx/pay/lct/refund",
			method: "POST",
			data
		})
	},
	//购买权益下单
	createOrder(data) {
		return http.request({
			url: "/cmall/shop/v1/front/salesOrder/createOrder",
			method: "POST",
			data
		})
	},
}