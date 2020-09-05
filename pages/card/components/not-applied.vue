<template>
	<view class="not-applied">
		<view class="equity wrap">
			<text class="title">开通极融卡权益</text>
			<view class="content Flex-sb">
				<view class="item">
					<image class="img1" src="https://cdn.colourfulchina.com/nwsh/static/icons/free-icon.png" mode="aspectFit"></image>
					<text>分期免息</text>
				</view>
				<view class="item">
					<image class="img2" src="https://cdn.colourfulchina.com/nwsh/static/icons/quota-icon.png" mode="aspectFit"></image>
					<text>分期免息</text>
				</view>
				<view class="item">
					<image class="img3" src="https://cdn.colourfulchina.com/nwsh/static/icons/refund-icon.png" mode="aspectFit"></image>
					<text>分期免息</text>
				</view>
			</view>
		</view>
		<view class="gift-wrap wrap">
			<text class="title">开通可得千元礼包</text>
			<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/images/card-1-y.png" mode="widthFix"></image>
			<view class="coupon-list">
				<view class="item Flex-sb" v-for="(item, index) in 10" :key="index">
					<view class="left Flex-cen">
						<text>1000元</text>
					</view>
					<view class="right">
						<text class="type">化妆品全品类劵包</text>
						<text class="des">叠加优惠折上折</text>
						<text class="scop">部分可用</text>
					</view>
				</view>
			</view>
		</view>
		<view class="question-wrap wrap">
			<text class="title">常见问题</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'notApplied'
	}
</script>

<style lang="scss" scoped>
	$coupon-text-color: #7E4A3D;
	.not-applied {
		margin-top: $uni-margin-30;

		.title {
			font-size: 40rpx;
			background: linear-gradient(to right, rgba($color: #EAA47B, $alpha: 1), rgba($color: #9D684E, $alpha: 1));
			-webkit-background-clip: text;
			clip: text;
			color: transparent;
		}

		.equity {
			.content {
				width: 586rpx;
				height: 153rpx;
				padding-top: $uni-padding-20;
				margin: $uni-margin-30 auto 0;

				.item {
					font-size: 30rpx;
					color: #906B29;
					display: flex;
					align-items: center;
					height: 100%;
					justify-content: space-between;
					flex-direction: column;

					.img1 {
						width: 64rpx;
						height: 45rpx;
					}

					.img2 {
						width: 52rpx;
						height: 52rpx;
					}

					.img3 {
						width: 45rpx;
						height: 58rpx;
					}
				}
			}
		}
		.wrap {
			margin-top: $uni-margin-30;
			text-align: center;
		}
		.gift-wrap {
			
			.coupon-list {
				margin-top: $uni-margin-30;
				.item {
					width: 690rpx;
					height: 160rpx;
					margin-bottom: $uni-margin-30;
					&:last-child {
						margin-bottom: 0;
					}
					background: url(https://cdn.colourfulchina.com/nwsh/static/images/card-coupon-bg.png) 0 0 /100% 100% no-repeat;
					.left {
						font-size: 40rpx;
						width: 212rpx;
						background: linear-gradient(-60deg, rgba($color: #8F6828, $alpha: 1), rgba($color: #7E4A3D, $alpha: 1));
						-webkit-background-clip: text;
						clip: text;
						color: transparent;
					}
					.right {
						color: $coupon-text-color;
						display: flex;
						flex-direction: column;
						flex: 1;
						text-align: left;
						padding-left: 34rpx;
						.type {
							font-size: 38rpx;
						}
						.des {
							font-size: 26rpx;
							margin: 6rpx 0;
						}
						.scop {
							font-size: 22rpx;
						}
					}
				}
			}
		}
	}
</style>
