<template>
	<view class="para-wrap">
		<view class="item Flex-sb">
			<text class="title">商品类别</text>
			<text class="content ellipsis">自助餐</text>
		</view>
		<view class="item Flex-sb">
			<text class="title">有效期</text>
			<text class="content ellipsis">购买后6个月内有效</text>
		</view>
		<view class="item Flex-sb">
			<text class="title">不适用时段</text>
			<text class="content ellipsis">国定节假日</text>
		</view>
		<view class="item Flex-sb">
			<text class="title">需要发票</text>
			<text class="content ellipsis">如需发票请与在线客服联系 </text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'paraItem',
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.para-wrap {
		padding: 0 $uni-padding-30;
		.item {
			border-bottom: 1rpx solid $uni-border-color;
			padding: $uni-padding-30 0;
			.title {
				font-weight: bold;
				min-width: 140rpx;
				margin-right: $uni-margin-10;
			}
			.content {
				flex: 1 1 auto;
				font-size: $uni-font-size-base;
				color: $uni-font-color-goods;
			}
		}
	}
</style>
