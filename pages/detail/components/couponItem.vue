<template>
	<view class="coupon-list">
		<view class="item" v-for="(item, index) in 10" :key="index">
			<view class="left">
				<view class="money">
					<text class="fleg">¥</text>
					<text class="num">50</text>
				</view>
				<text>满159.0元可用</text>
			</view>
			<view class="mid">
				<view class="type">
					<text class="flag">现金券</text>
					<text>美妆个护满159满40</text>
				</view>
				<view class="time">
					<text>2020.06.11 00:00-2020.06.11 23:59</text>
				</view>
			</view>
			<view class="right">
				<text>立即领取</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'couponItem',
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-list {
		height: 100%;
		.item {
			width: 690rpx;
			height: 200rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 38rpx 0 14rpx;
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

				.money {
					margin-bottom: $uni-margin-10;

					.flag {}

					.num {
						font-size: 40rpx;
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
					font-size: $uni-font-size-sm;
					color: #303133;
					margin-bottom: 22rpx;

					.flag {
						width: 98rpx;
						height: 36rpx;
						background: linear-gradient(270deg, rgba(255, 0, 0, 1) 0%, rgba(255, 119, 0, 1) 100%);
						border-radius: 18rpx;
						color: #fff;
						padding: 2rpx 10rpx;
						margin-right: $uni-margin-20;
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
