<template>
	<view class="credit">
		<view class="des"><text>信用额度最高（元）</text></view>
		<view class="num"><text>50,000.00</text></view>
		<view class="action"><text>立即领取 </text></view>
	</view>
</template>

<script>
	export default {
		name: 'comCredit',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.credit {
	width:690rpx;
	height:340rpx;
	margin: 0 auto;
	background: url(https://cdn.colourfulchina.com/nwsh/static/images/credit-bg.png) 0 0 / 100% 100% no-repeat;
	text-align: center;
	color: #fff;
	font-weight: bold;
	padding-top: 45rpx;
	.des {
		font-size: $uni-font-size-base;
		margin-bottom: 15rpx;
	}
	.num {
		font-size: 70rpx;
		margin-bottom: 50rpx;
	}
	.action {
		width:280rpx;
		height:70rpx;
		line-height: 70rpx;
		margin: 0 auto;
		background: $uni-bg-color;
		border-radius:35rpx;
		color: $uni-color-price;
	}
}
</style>
