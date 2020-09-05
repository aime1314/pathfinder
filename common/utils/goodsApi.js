import http from "./http.js";
export default {
	
	//获取商品列表
	getGoodsList(data) {
		return http.request({
			url: "/cmall/shop/v1/front/project/getCCBHomePage",
			method: "POST",
			data
		})
	},
	//获取商品详情
	getGoodsDetail(data){
		return http.request({
			url: '/cmall/shop/v1/front/project/getPrjGroupListByPrjId',
			method: 'POST',
			data
		});
	},
	//获取产品列表
	getProductList(data){
		return http.request({
			url: '/coupons/voucher/getMemVouchersList',
			method: 'POST',
			data
		});
	},
	//获取产品详情
	getProductDetail(data){
		return http.request({
			url: '/coupons/voucher/getMemVouchersList',
			method: 'POST',
			data
		});
	},
	//获取首页banner
	getProjectBannerList(data){
		return http.request({
			url: '/cmall/api/projectBanner/bankProjectBannerList',
			method: 'POST',
			data
		});
	},	
	//获取权益信息（会员权益）
	getMemberType(data){
		return http.request({
			url: '/cmall/channel/v1/front/vip/vipCards',
			method: 'POST',
			data
		});
	},
	//获取首页分类type
	getProjectModuleList(data){
		return http.request({
			url: '/cmall/shop/v1/front/project/getChannelModulePrjList',
			method: 'POST',
			data
		});
	},
	
	//查询商品列表
	selectPrjListByParams(data){
		return http.request({
			url: '/cmall/shop/v1/front/project/selectPrjListByParams',
			method: 'POST',
			data
		});
	},
	
	//查询商品收藏状态
	checkProductCollectStatus(data){
		return http.request({
			url: '/cmall/shop/v1/front/project/productCollectStatus',
			method: 'POST',
			data
		});
	},
	//商品收藏/取消收藏
	productCollect(data){
		return http.request({
			url: '/cmall/shop/v1/front/project/productCollect',
			method: 'POST',
			data
		});
	},
	//商品收藏列表
	productCollectList(data){
		return http.request({
			url: '/cmall/shop/v1/front/project/productCollectList',
			method: 'POST',
			data
		});
	},
	
	//分期计算
	installment(data){
		return http.request({
			url: '/cmall/api/v1/installment',
			method: 'POST',
			data
		});
	}
}