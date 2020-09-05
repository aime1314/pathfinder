<template>
	<view class="safeguard">
		<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/icons/icon-zp.png" mode="aspectFit"></image>
		<text>100%正品保障</text>
	</view>
</template>

<script>
	export default {
		name: 'safeguardItem',
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.safeguard {
	font-size: $uni-font-size-lg;
	color: $uni-color-price;
	display: flex;
	align-items: center;
	margin-bottom: $uni-margin-30;
	.img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 17rpx;
	}
}
</style>
