<template>
	<view class="mycoupon-list">
		<view class="item Flex-sb" v-for="(item, index) in userCoupons" :key="index">
			<view class="left">
				<view class="money">
					<text class="fleg">¥</text>
					<text class="num">{{item.worth}}</text>
				</view>
				<text>{{item.note}}</text>
			</view>
			<view class="mid">
				<view class="type" v-if="item.couponsType == 1">
					<text class="flag" >现金券</text>
					<text>{{item.name}}</text>
				</view>
				<view class="type" v-else-if="item.couponsType == 2">
					<text class="flag" >折扣券</text>
					<text>{{item.name}}</text>
				</view>
				<view class="time">
					<text >有效期:{{item.bindTime.substring(0,10)}} ~ {{item.experTime.substring(0,10)}}</text>
				</view>
			</view>
		</view>
		<com-nodata v-if="userCoupons && userCoupons.length == 0"></com-nodata>
	</view>
</template>

<script>
	
	export default {
		name: 'couponItem',
		props:['userCoupons'],
		data() {
			return {
			}
		},
		methods:{
			
		},
		
		created() {
		}
		
	}
</script>

<style lang="scss" scoped>
	.mycoupon-list {padding-top:$uni-padding-20;
		.item {
			width: 710rpx;
			height: 240rpx;
			margin:0 auto;
			background: url(https://cdn.colourfulchina.com/nwsh/static/images/coupon-bg-lg.png) 0 0 / 100% 100% no-repeat;

			.left {
				width: 200rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				color: #fff;
				font-size: $uni-font-size-sm;
				padding-left:$uni-padding-30;
				.money {
					margin-bottom: $uni-margin-10;

					.flag {}

					.num {
						font-size: $uni-font-size-40;
					}
				}
			}

			.mid {
				height: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 40rpx;

				.type {
					font-size: $uni-font-size-base;
					color: #303133;
					margin-bottom: 22rpx;
					.flag {
						height: 36rpx;
						display: inline-block;
						background: linear-gradient(270deg, rgba(255, 0, 0, 1) 0%, rgba(255, 119, 0, 1) 100%);
						border-radius: 20rpx;
						color: #fff;
						padding: 2rpx 15rpx;
						margin-right: $uni-margin-20;
						margin-left: $uni-margin-20;
					}
				}

				.time {
					font-size: 20rpx;
					color: $uni-text-color-subtitle;
				}
			}

			.right {
				writing-mode: vertical-lr;
				letter-spacing: 4rpx;
				flex: 0 0 auto;
				font-size: $uni-font-size-base;
				color: $uni-color-price;
				border-left: 1rpx solid #E3E3E3;
				padding-left: 18rpx;
			}
		}

	}
</style>
