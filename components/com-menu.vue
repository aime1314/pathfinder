<template>
	<view class="menu">
		<view class="menu-item" v-for="(item, index) in menus" :key="index" @click="itemClick(index, item)">
			<image :src="item.src" mode="" class="img"></image>
			<text class="title">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comMenu',
		props: {
			menus: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			itemClick(index, item) {
				this.$emit('itemClick', index, item)
			}
		}
	}
</script>

<style lang="scss" scoped>
.menu {
	width: 650rpx;
	height: 170rpx;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	.menu-item {
		display: inline-block;
		margin-right: 52rpx;
		text-align: center;
		width: 92rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		&:last-child {
			margin-right: 0;
		}
		.img {
			width: 100%;
			height: 90rpx;
			border-radius: $uni-border-radius-circle;
			margin-bottom: 16rpx;
		}
		.title {
			font-size: $uni-font-size-base;
			color: $uni-font-color-goods;
		}
	}
}
</style>
