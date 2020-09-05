<template>
	<view class="youdao">
		<view class="top">
			<com-plate title="有道财富" subtitle="高端理财"></com-plate>
			<view class="ad">
				<text class="text">广告</text>
				<u-icon name="arrow-down" color="#85858E" size="20"></u-icon>
			</view>
		</view>
		<view class="card">
			<view class="title"><text>新手专享</text></view>
			
			<view class="Flex-sb">
				<view class="income">
					<view class="num">
						<text class="base">7.5%</text>
						<text class="add">+4%</text>
					</view>
					<text class="des">参考年华收益率</text>
				</view>
				<view class="days">
					<view>
						<text>起投 <text class="num">50</text>元</text>
					</view>
					<view>
						<text>期限 <text class="num">360</text>天</text>
					</view>
				</view>
			</view>
			<view class="Flex-cen">
				<view class="bottom">
					<text>立即认购</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comYoudao',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.youdao {
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ad {
			width: 100rpx;
			height: 40rpx;
			border-radius: 5rpx;
			font-size: $uni-font-size-base;
			color: #85858E;
			background: #fff;
			text-align: center;
			.text {
				margin-right: 8rpx;
			}
		}
	}
	.card {
		width:690rpx;
		height:362rpx;
		margin: 0 auto;
		padding: 40rpx $uni-padding-30 0;
		background:linear-gradient(317deg,rgba(253,229,214,0.88) 0%,rgba(255,255,255,1) 100%);
		border-radius: 10rpx;
		.title {
			font-size: $uni-font-size-base;
			color: $uni-text-color-title;
			padding-bottom: 28rpx;
			border-bottom: 1rpx dashed $uni-border-color-dashed;
			margin-bottom: 20rpx;
		}
		.income {
			.num {
				font-size: 56rpx;
				color: $uni-color-price;
				.add {
					font-size: 42rpx;
				}
			}
			.des {
				font-size: 26rpx;
				color: $uni-text-color-subtitle;
			}
		}
		.days {
			color: $uni-text-color-subtitle;
			font-size: 26rpx;
			.num {
				font-size: 36rpx;
				color: $uni-font-color-goods;
			}
		}
		.bottom {
			width:360rpx;
			height:70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: $uni-color-price;
			text-align: center;
			box-shadow:0 5rpx 16rpx 0 rgba(235,38,19,0.3);
			border-radius:40rpx;
			border:1rpx solid rgba(235,38,19,1);
			margin-top: $uni-margin-30;
		}
	}
}
</style>
