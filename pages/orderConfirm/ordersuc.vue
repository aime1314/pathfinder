<template>
	<view class="orderPaystatus">
		<view class="icon font_family icon-guanbi" v-if="payStatus == 'fail'"></view>
		<view class="icon2 font_family icon-xuanzhong1" v-else></view>
		<view class="orderpayTip"><text v-if="payStatus == 'fail'">支付失败</text> <text v-else>支付成功</text></view>
		<view class="orderpayBtnBox"><text v-if="payStatus == 'fail'" @tap="goPayorder">立即支付</text><text v-else @tap="goBuygift">继续购买</text> <text @tap="goOrdershow">查看订单</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '支付',
				payStatus:'success', //订单状态
				reservOrderId:'', //订单ID
				paybackurl:'', //订单支付页
				channel:'',//渠道
			}
		},
		onLoad(e) {
			this.payStatus = e.payStatus;
			this.paybackurl = e.paybackurl
			this.reservOrderId = e.reservOrderId
			this.channel = e.channel
			console.log(this.payStatus)
		},
		methods: {
			goPayorder(){
				window.location.href = this.paybackurl
			},
			goBuygift(){
				 uni.switchTab({
					url:'/pages/index/index'
				})
			},
			goOrdershow(){
				uni.navigateTo({
					url:'../order/show?id='+this.reservOrderId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{background: $uni-bg-color;}
	.orderPaystatus{ padding-top:$uni-padding-30; text-align: center; margin-top:$uni-margin-30;
		.icon{font-size: 80rpx; color:$uni-text-color-them;}
		.icon2{font-size: 70rpx; color:#00d30b;}
		.orderpayTip{padding-top:$uni-padding-10; color:#333; font-weight: bold; font-size:$uni-font-size-lg;}
		.orderpayBtnBox{padding-top:$uni-padding-20; text{margin:$uni-margin-30 $uni-margin-20; display: inline-block; background:$uni-bg-color-them; color:$uni-text-color-inverse; padding:$uni-padding-10 $uni-padding-30; border-radius:$uni-border-radius-lg;}}
	}
</style>
