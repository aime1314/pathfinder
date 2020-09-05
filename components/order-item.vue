<template>
	<view class="Flex-box orderListBox">
		<view class="Flex-sb orderMsgTime">
			 <view  class="titleSize">
				 {{orderlist.salesOrderId}}
			 </view>
			 <view class="orderchannel" >
				 <text v-if ="orderlist.status ==0 ">待付款</text>
				 <text v-else-if="orderlist.status == 1 || orderlist.status == 2">已付款</text>
				 <text v-else-if="orderlist.status == 6">使用中</text>
				 <text v-else-if="orderlist.status == 3 || orderlist.status === 9 || orderlist.status === 8 || orderlist.status === 7">已取消</text>
				 <text v-else-if="orderlist.status == 4||orderlist.status == 5">售后/退款</text>
			</view>
		</view>
		<view class="orderMsgAbout Flex-sb"  @tap="ordermsgshow(orderlist.salesOrderId)">
			<view class="orderImg">
				<u-image v-if="orderlist.imgUrl" :src="orderlist.imgUrl" mode="widthFix" :fade="true" duration="450" border-radius="10"></u-image>
				<u-image v-else src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" mode="widthFix" :fade="true" duration="450" border-radius="10"></u-image>
			</view>
			<view class="orerName">
				<view class="orerName-title">{{orderlist.projectName}} </view>
				<!-- <view class="orerName-tip">{{orderlist.projectName}}</view> -->
			</view>
			<view class="orderNumber">
				<view class="orderNumber-money">¥ {{orderlist.salePrice}}</view>
				<view class="orderNumber-size">x {{orderlist.num}}</view>
			</view>
		</view>
		<view class="orderStatus titleSize">
			<view class="orderchannel" v-if="orderlist.status === 1 || orderlist.status === 2">
							<!-- <text  @tap="refundMethod(orderlist.acChannel,orderlist.salesOrderId)" >取消订单</text> -->
			</view>
			<!-- <view class="orderchannel" v-if="orderlist.status === 0 ">
				<text class="titleSize" @tap="payNow">立即支付</text><text  @tap="cancelOrder(orderlist.salesOrderId)">取消订单</text>
			</view>
			<view class="orderchannel" v-else-if="orderlist.status === 1 || orderlist.status === 2">
				<text  @tap="refundMethod(orderlist.acChannel,orderlist.salesOrderId)" >退款</text>
				<text class=" surebutton" >立即预订</text>
				<text  @tap="gobookingGift(orderlist.shortUrl)" class="surebutton" >立即预订</text>
			</view>
			<view class="orderchannel" v-else-if="orderlist.status === 6 ">
				<text class="surebutton">查看预约</text>
			</view>
			<view class="orderchannel" v-else-if="orderlist.status === 3 || orderlist.status === 9 || orderlist.status === 8 || orderlist.status === 7 ">
					<text >交易关闭</text>
				</view>
			<view class="orderchannel" v-else-if="orderlist.status === 4 ">
				<text  >退款中</text>
			</view>
			<view class="orderchannel" v-else-if="orderlist.status === 5 ">
				<text  >交易完成</text>
			</view> -->
			<text @tap="ordermsgshow(orderlist.salesOrderId)" >更多>></text>
		</view>
	</view>
</template>

<script>
	let Base64 = require('js-base64').Base64;
	export default {
		name: 'orderItem',
		props: {
			orderlist: {
				type: Object,
				default: () => {
					return {}
				}
			},
			current: {
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				loadingImg: '',
				errorImg: ''
			};
		},
		components: {
			
		},
		methods:{
			// 查看订单详情
			ordermsgshow(id){
				uni.navigateTo({
					url: `show?id=${id}`
				})
			},
			payNow(){
				//去支付
				var _this  = this;
				let orderDetail = _this.$props.orderlist;
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
					window.location.href = suc.result.mwebUrl + '?channel='+Base64.encode('NWSH')+'&params='+ Base64.encode(encodeURIComponent(suc.result.params))
				})
			},
			cancelOrder(orderId){
				let that =this;
				uni.showModal({
					title: '友情提示',
					content: '确认是否取消订单吗？',
					success: function (res) {
						if (res.confirm) {
							var params ={acChannel: that.$props.orderlist.acChannel,saleOrderId: orderId};
							that.$orderApi.cancelOrder(params).then(res => {
								if(res && res.ok === 0){
									uni.redirectTo({
										url: "/pages/order/order?current=" + that.$props.current+"&acChannel="+that.$props.orderlist.acChannel
									});
								}else{
									uni.showToast({ title:  "订单取消失败，请联系管理员！",icon: 'none', duration: 1500 })
								}
							});
						} 
					}
				});
				
			},
			gobookingGift(shortUrl){
				window.location.href = shortUrl +"&token=" + uni.getStorageSync('TOKEN') 
			},
			refundMethod(acChannel,orderId){
				let that =this;
				uni.showModal({
					title: '友情提示',
					content: '确认是否取消订单，并退款吗？',
					success: function (res) {
						if (res.confirm) {
							var params ={"acChannel":acChannel,"salesOrderId": orderId,"refundNote":"客户自己取消退款"};
							that.$orderApi.refundOrder(params).then(res => {
								if(res && res.ok === 0){
									uni.redirectTo({
										url: "/pages/order/order?current=1&acChannel="+acChannel,
									});
								}else{
									uni.showToast({ title:  "订单取消失败，"+res.msg,icon: 'none', duration: 1500 })
								}
							});
						} 
					}
				});
			},
		},
		
	}
</script>

<style lang="scss" scoped>
.orderListBox{margin-top:$uni-margin-10; padding-bottom:$uni-padding-30;
	.orderMsgBox{display: flex; flex-wrap: wrap;}
	.orderMsgTime{color: $uni-text-color-grey; line-height: 52rpx; padding-bottom:$uni-padding-10;
		.orderchannel{color: $uni-text-color-them;}
	}
	.orderMsgAbout{
		.orderImg{width:30%; background: $uni-bg-color-grey;}
		.orerName{width:60%; padding:0 $uni-padding-20;
			.orerName-title{padding-bottom: $uni-padding-10; }
			.orerName-tip{font-size:$uni-font-size-sm; color:$uni-text-color-grey;}
		}
		.orderNumber{width: 120rpx;text-align: right;}
	}
	.orderStatus{ text-align: right;
		text{display: inline-block; border:solid 1rpx $uni-bg-color-them; color:$uni-text-color-them; padding:0 $uni-padding-20; border-radius:19rpx; margin:0 $uni-margin-10; height:38rpx;}
		text:last-child{margin-right:0;}
	}
	.titleSize{
		font-size:24rpx;
	}
}
</style>
