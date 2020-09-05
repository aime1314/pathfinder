<template>
	<view class="interest-free Flex-sb" @tap="gocard">
		<view class="wrap">
			<view class="flag">
				<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/images/Installment-img.png" mode="widthFix"></image>
			</view>
			<view class="num">
				<text class="moeny"><text style="font-size: 22rpx; margin-right: 5rpx;">¥</text>41.00</text>
				<text style="margin-left: 5rpx;">×6 期免息，预计可免 0.8 元</text>
			</view>
		</view>
		<view class="right">
			<text>免费申请</text>
			<com-icon name="icon-tiaozhuan" color="#EB2613"></com-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'interestFreeItem',
		data() {
			return {
				
			}
		},
		methods:{
			gocard(){
				uni.navigateTo({
					url:'/pages/card-apply/cardapply'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.interest-free {
		height: 125rpx;
		padding: $uni-padding-10  $uni-padding-30 0 $uni-padding-30;
		background: $uni-bg-color;
		border-radius: 10rpx;
		margin-bottom: 16rpx;
		.wrap {
			.flag {
				margin-bottom: $uni-margin-10;
				.img {
					width: 290rpx;
				}
			}
			.num {
				font-size: $uni-font-size-sm;
				color: $uni-font-color-goods;
				.moeny {
					font-size: 30rpx;padding:$uni-padding-10 0; display: inline-block;
				}
			}
		}
		.right {
			color: $uni-color-price;
			font-size: $uni-font-size-sm;
		}
	}
</style>
