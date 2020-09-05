<template>
	<view class="staging-wrap">
		<view :class="['item', {active: selectIndex === index}]" v-for="(item, index) in installmentList" :key="index" @click="itemClick(index, item)">
			<text class="money"><text style="font-size:16rpx; margin-right: 5rpx;">¥</text>{{item.monthMoney.toFixed(2)}}</text>
			<text class="num"><text style="margin-right: 5rpx;">*</text>{{item.periods}}<text style="margin-left: 5rpx;">期</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'stagingWrap',
		props: ['installmentList'],
		data() {
			return {
				selectIndex: -1,
			}
		},
		methods: {
			itemClick(index, item) {
				if (this.selectIndex === index) {
					this.selectIndex = - 1;
					this.$emit('itemClick', null, null);
					return;
				}
				this.selectIndex  = index;
				this.$emit('itemClick', index, item);
			}
		}
	}
</script>

<style lang="scss" scoped>
.staging-wrap {
	display: inline-block;
	// background: $uni-bg-color-grey;
	margin-bottom: $uni-margin-20;
	.item {
		display: inline-block;
		margin-right: 10rpx;
		// 
		background: rgba($color: $uni-color-price, $alpha: 0.1);
		color: $uni-color-price;
		height: 52rpx;
		line-height: 52rpx;
		padding:0 $uni-padding-20;
		border-radius: 26rpx;
		text-align: center;
		&:last-child {
			margin-right: 0;
		}
		.money {
			font-size: 28rpx;
			margin-right: 10rpx;
			// color: $uni-text-color-subtitle;
		}
		.num {
			font-size: 20rpx;
			// color: $uni-text-color-des;
		}
	}
	.active {
		background: rgba($color: $uni-color-price, $alpha: 0.1);
		.money {
			color: $uni-color-price;
		}
		.num {
			color: $uni-color-price;
		}
	}
}
</style>
