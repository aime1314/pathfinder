<template>
	<view class="service-wrap">
		<view class="item Flex-sb">
			<text class="icon font_family icon-info"></text>
			<view class="content">
				<view class="title">
					<text>放心购</text>
				</view>
				<text>此消费券未使用，在有效期内支持退货</text>
			</view>
		</view>
		<view class="item Flex-sb">
			<text class="icon font_family icon-info"></text>
			<view class="content">
				<view class="title">
					<text>平台全品类券</text>
				</view>
				<text>此商品可使用全平台品类券</text>
			</view>
		</view>
		<view class="item Flex-sb">
			<text class="icon font_family icon-info"></text>
			<view class="content">
				<view class="title">
					<text>分期付款</text>
				</view>
				<text>开通极融卡免息，可享商品分期付款福利</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'serviceItem',
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-wrap {
		padding-top: $uni-padding-30;
		.item {
			padding: 0 $uni-padding-30;
			margin-bottom: $uni-margin-30;
			align-items: inherit;
			.icon{color: $uni-text-color-them; font-size:$uni-font-size-40; font-weight: bold; margin-right:$uni-margin-20;}
			.content {
				flex: 1 1 auto;
				font-size: $uni-font-size-base;
				color: $uni-font-color-goods;
				.title {
					font-size: 30rpx;
					margin-bottom: 8rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
