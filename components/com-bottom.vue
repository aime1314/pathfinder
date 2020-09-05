<template>
	<view class="page-bottom">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="right">
			<slot name="right">
				<button  class="action-btn Flex-cen" @tap="actionFun">{{rText}}</button>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			rText: String
		},
		data() {
			return {
				
			};
		},
		methods: {
			actionFun() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-bottom {
	height: 94rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	box-shadow:0 -3rpx 5rpx 0 rgba(0,0,0,0.05);
	z-index: 999;
	.left {
		flex: 0 0 auto;
		background: $uni-bg-color;
	}
	.right {
		flex: 1 0 auto;
		.action-btn {
			height: 100%;
			background: $uni-color-price;
			font-size: $uni-font-size-lg;
			color: #fff;
			flex: 1 1 auto;
		}
	}
}
</style>
