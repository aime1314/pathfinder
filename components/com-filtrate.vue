<template>
	<view class="com-filtrate" :style="{background: bg, ...filterStyle}">
		<!-- <view class="item">
			<text>全部城市</text>
		</view> -->
		<text :class="['item', {active: sortType === 'desc'}]" @click="filterAction('desc')">价格从高到低</text>
		<text :class="['item', {active: sortType === 'asc'}]" @click="filterAction('asc')">价格从低到高</text>
	</view>
	</view>
</template>

<script>
	export default {
		name: 'comFiltrate',
		props: {
			bg: String,
			filterStyle: Object
		},
		data() {
			return {
				sortType: ''
			}
		},
		methods: {
			filterAction(value) {
				this.sortType = value;
				this.$emit('filter', value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-filtrate {
		background: $uni-bg-color;
		height: 88rpx;
		color: #909399;
		font-size: $uni-font-size-base;
		padding: 0 $uni-padding-30;
		display: flex;
		align-items: center;

		.item {
			margin-right: 60rpx;
		}
		.active {
			color: $uni-color-price;
		}
	}
</style>
