<template>
	<view class="discount-label">
		<view :class="textClass">
			<text>
				<slot></slot>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'discountLabel',
		props: {
			type: {
				type: String,
				default: 'lg'
			}
		},
		computed: {
			textClass() {
				return this.type
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
.discount-label {
	display: inline-block;
	.sm {
		min-width:84rpx;
		height:30rpx;
		line-height: 30rpx;
		background: $uni-color-discountbg-sm;
		color: $uni-color-discount-sm;
		text-align: center;
		font-size: 20rpx;
		padding: 0 $uni-padding-10;
		margin-right: 16rpx;
	}
	.lg {
		color: $uni-color-discount-lg;
		min-width:116rpx;
		height:60rpx;
		line-height: 60rpx;
		background: url(https://cdn.colourfulchina.com/nwsh/static/images/discount-lg-bg.png) 0rpx 0 / 100% 100% no-repeat;
		text-align: center;
		font-size: $uni-font-size-sm;
		padding: 0 $uni-padding-10;
		margin-right: 16rpx;
	}
}
</style>
