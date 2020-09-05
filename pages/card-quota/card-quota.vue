<template>
	<com-layout :navBg="navBg" titleColor="#fff" :contentBg="contentBg">
		<template v-slot:nav-center>
			<text>极融卡额度</text>
		</template>
		<template v-slot:nav-right>
			<image src="https://cdn.colourfulchina.com/nwsh/static/icons/msg.png" class="message" mode="aspectFit"></image>
		</template>
		<view class="quota-page">
			<view class="card-view">
				<view class="card-top Flex-sb">
					<view class="left Flex-cen">
						<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/icons/card-flag-g.png" mode="widthFix"></image>
						<text>极融卡</text>
					</view>
					<view class="right Flex-cen">
						<!-- <text>GEERONG</text>
						<text class="servise">SERVISE</text> -->
					</view>
				</view>
				<view class="card-mid">
					<text>可用额度</text>
					<view class="num">
						<text>2,000.00</text>
					</view>
				</view>
				<view class="card-bottom Flex-sb">
					<view class="left">
						<text>总额度（元）</text>
						<view class="num">
							<text>2,600.00</text>
						</view>
					</view>
					<view class="right">
						<text>已使用（元）</text>
						<view class="num">
							<text>600.00</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="rise-quota Flex-cen">
				<text>提升额度</text>
			</view>
			<view class="free-wrap">
				<image src="https://cdn.colourfulchina.com/nwsh/static/images/9.png" mode="widthFix"></image>
			</view>
			
		</view>
	</com-layout>
</template>

<script>
	export default {
		data() {
			return {
				navBg: `url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 0 / 100% 574rpx no-repeat`,
				contentBg: `url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 -50px / 100% 600rpx no-repeat`,
			};
		}
	}
</script>

<style lang="scss" scoped>
	.quota-page {
		padding-top: 77rpx;
		.card-view {
			width: 690rpx;
			height: 460rpx;
			margin: 0 auto;
			background: url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg-g.png) 0 0 / 100% 100% no-repeat;
			color: #9D684E;
			padding: $uni-padding-30 60rpx;
			font-size: $uni-font-size-base;
			color: #7E4A3D;
			.card-top {
				align-items: center;
				.left {
					font-size: 42rpx;
					.img {
						width: 47rpx;
						height: 53rpx;
						margin-right: $uni-margin-20;
					}
				}
			}
			.card-mid {
				text-align: center;
				margin-top: 40rpx;
				margin-bottom: 50rpx;
				.num {
					font-size: 70rpx;
				}
			}
			.card-bottom {
				
				.num {
					font-size: 50rpx;
					margin-top: 8rpx;
				}
			}
		}
		.rise-quota {
			width: 580rpx;
			height: 90rpx;
			margin: 52rpx auto 0;
			color: #fff;
			font-size: 40rpx;
			border-radius: 45rpx;
			box-shadow: 0 1rpx 9rpx rgba($color: #A37161, $alpha: 0.3);
			background: linear-gradient(to right, rgba($color: #E1BB74, $alpha: 0.9), rgba($color: #CA9A4E, $alpha: 1));
		}
		.free-wrap {
			margin-top: 125rpx;
		}
	}
</style>
