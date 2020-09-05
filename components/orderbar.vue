<template>
	<view class="orderbarHome">
		<view class="orderchannel" v-if="orderstatus === 0 ">
			<text @tap="connectPhone()">联系客服</text>
			<text class="titleSize surebutton" @tap="payNow">立即支付</text>
			<text class="titleSize" @tap="cancelOrder(order.salesOrderId)">取消订单</text>
		</view>
		
		<view class="orderchannel" v-else-if="orderstatus === 1 || orderstatus === 2">
			<text @tap="connectPhone()">联系客服</text>
			<!-- <text class="titleSize " @tap="cancelOrder(order.salesOrderId)" >退款申请</text> -->
			<text class="titleSize surebutton"  @tap="gobookingGift(order.shortUrl)">立即预约</text>
		</view>
		<view class="orderchannel" v-else-if="orderstatus === 6">
			<text @tap="connectPhone()">联系客服</text>
			<!-- <text class="titleSize surebutton" >立即使用</text> -->
			<text class="titleSize surebutton" >查看预约</text>
		</view>
		<view class="orderchannel" v-else-if="orderstatus === 3  || orderstatus === 9   || orderstatus === 8   ||orderstatus === 7  ">
			<text>交易关闭</text>
		</view>
		<view class="orderchannel" v-else-if="orderstatus === 4 ">
			<text @tap="connectPhone()">联系客服</text>
			<text class="titleSize " >退款中</text>
		</view>
		<view class="orderchannel" v-else-if="orderstatus === 5 ">
			<text @tap="connectPhone()"> 联系客服</text>
			<text class="titleSize " >交易完成</text>
		</view>
		<!-- <text>联系客服</text>
		<text>查看物流{{orderstatus}}</text>
		<text class="surebutton">确认收货</text> -->
	</view>
</template>

<script>
	import checkLoginFun from '../common/util.js'
	let Base64 = require('js-base64').Base64;
	export default {
		name: 'orderItembar',
		props: {
			orderstatus: {
				type: Number,
			},
			order: {
				type: Object,
				default() {
				      return {}
				   }
			}
		},
		
		components: {
			
		},
		methods:{
			cancelOrder(orderId){
				let that = this;
				uni.showModal({
					title: '友情提示',
					content: '请问您是真的要取消订单吗？',
					success: function (res) {
						if (res.confirm) {
							var params ={acChannel: "NWSH",saleOrderId: orderId};
							that.$orderApi.cancelOrder(params).then(res => {
								if(res && res.ok === 0){
									uni.redirectTo({
										url: 'show?id='+that.$props.order.salesOrderId
									});
								}else{
									uni.showToast({ title:  "订单取消失败，请联系管理员！",icon: 'none', duration: 1500 })
								}
							});
						} 
					}
				});
				
			},
			connectPhone(){
				let that =this;
				uni.showModal({
					title: '客服热线',
					content: '400-636-2882',
					success: function (res) {
						
					}
				});
			},
			gobookingGift(shortUrl){
				window.location.href = shortUrl +"&token=" + uni.getStorageSync('TOKEN')
			},
			payNow(){
				//去支付
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						var _this  = this;
						let orderDetail = _this.$props.order;
						let payobject = {
							"acId": orderDetail.acid,
							"amount": orderDetail.salePrice,
							"body": orderDetail.projectName,
							"curcode": "CNY",
							"goodsName": orderDetail.projectName,
							"mbId": orderDetail.mbid,
							"merchantId": 1585818018424,
							"orderId": orderDetail.salesOrderId,
							"payMethod": 3,
							"paymentType": "会员权益单",
							"source": "NWSH",
						}
						this.$orderApi.payMemberType(payobject).then(suc =>{
							window.location.href = suc.result.mwebUrl + '?channel='+Base64.encode('NWSH')+'&params='+ Base64.encode(encodeURIComponent(suc.result.params)) + '&stages=show'
						})
					}
				})
				
			},
		},
	}		
</script>

<style lang="scss" scoped>
	.orderbarHome{background-color: $uni-bg-color; position: fixed; left:0; bottom:0; width:100%; box-shadow: inset 0rpx 15rpx 10rpx -15rpx  rgba(0,0,0,.1); text-align:right; padding:$uni-padding-20 $uni-padding-30;
		text{display: inline-block; margin:0 $uni-margin-10; border:solid 1rpx $uni-border-color; height: 56rpx; line-height: 56rpx; border-radius:28rpx; padding:0 $uni-padding-20;}
		text.surebutton{border: solid 1px $uni-bg-color-them; background: $uni-bg-color-them; color:$uni-text-color-inverse;}
	}
</style>
