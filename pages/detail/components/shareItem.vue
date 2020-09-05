<template>
	<view class="share-item">
		<view class="item-wrap Flex-cen">
			<view class="item">
				<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/icons/share-wechat.png" mode="aspectFit"></image>
				<text>微信好友</text>
			</view>
			<view class="item">
				<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/icons/share-wechat-friends.png" mode="aspectFit"></image>
				<text>微信好友</text>
			</view>
			<view class="item">
				<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/icons/share-qq.png" mode="aspectFit"></image>
				<text>微信好友</text>
			</view>
		</view>
			<view class="bottom Flex-cen" @click="cancel">取消</view>
	</view>
</template>

<script>
	export default {
		name: 'shareItem',
		data() {
			return {

			}
		},
		methods: {
			cancel() {
				this.$emit('cancel')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-item {
		display: flex;
		flex-direction: column;
		height: 100%;

		.item-wrap {
			display: flex;
			flex: 1 0 auto;

			.item {
				font-size: $uni-font-size-lg;
				color: $uni-font-color-goods;
				margin-right: 135rpx;

				&:last-child {
					margin-right: 0;
				}

				.img {
					width: 120rpx;
					height: 120rpx;
					margin-bottom: 18rpx;
					border-radius: $uni-border-radius-circle;
				}
			}
		}

		.bottom {
			height: 80rpx;
			flex: 0 0 auto;
			font-size: 36rpx;
			color: #2577E3;
			border-top: 1rpx solid #E3E3E3;
		}
	}
</style>
