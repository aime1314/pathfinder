<template>
	<view class="piece-wrap" v-on="$listeners">
		<view class="top Flex-sb">
			<image class="img" :src="src" mode="widthFix"></image>
			<text class="text">{{title}}</text>
			<u-icon class="flag" name="arrow-right" color="#909399" size="28"></u-icon>
		</view>
		<text class="num">{{num}}</text>
	</view>
</template>

<script>
	export default {
		name: 'pieceItem',
		props: {
			src: String,
			title: String,
			num: Number | String
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.piece-wrap {
		width: 336rpx;
		height: 165rpx;
		border-radius: 10rpx;
		background: $uni-bg-color;
		padding: $uni-padding-30;
		.top {
			margin-bottom: $uni-margin-30;
			.img {
				width: 32rpx;
				height: 32rpx;
			}
			.text {
				flex: 1;
				margin-left: $uni-margin-20;
			}
		}
		.num {
			font-size: 36rpx;
			font-weight: bold;
			color: #1D1F29;
		}
	}
</style>
