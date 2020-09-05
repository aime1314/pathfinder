 export default {
	//获取渠道
    getChannel(state,data){
        state.channel = data
    },
	//用户信息
	getUserInfo(state, data){
		state.userMsg = data
	},
	//权益列表
	getGoodsData(state,data){
		state.goodsData = data
	},
	//优惠券列表
	getCouponsList(state,data){
		state.couponsList = data
	},
	//我的收货地址
	getMyaddressId(state,data){
		state.myaddressId = data
	},
	//我的优惠券ID
	getMyCouponsId(state,data){
		state.myCouponsId = data
	},
	//我的下单商品
	getMyProductId(state,data){
		state.myProductId = data
	}
}