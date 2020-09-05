<template>
	<view class="price-wrap">
		<view class="price">
			<text class="flag" :style="{'font-size': flagSize + 'rpx'}">¥</text>
			<text class="num" :style="{'font-size': priceSize + 'rpx'}">{{price}}</text>
		</view>
		<view v-if="oldPrice" class="old-price" :style="{'font-size': oldPriceSize + 'rpx'}">
			<text class="oldflag">¥</text><text class="old-num">{{oldPrice}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comPrice',
		props: {
			price: Number | String,
			oldPrice: Number | String,
			priceSize: {
				type: String | Number,
				default: 30
			},
			flagSize: {
				type: Number | String,
				default: 22
			},
			oldPriceSize: {
				type: String | Number,
				default: 22
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.price-wrap {
	display: flex;
	align-items: center;
	.price {
		color: $uni-color-price;
		margin-right: $uni-margin-20;
		.flag {margin-right: 5rpx;
		}
		.num {
		}
	}
	.old-price {
		text-decoration: line-through;
		color: $uni-text-color-des; font-size:22rpx;
		.oldflag{margin-right:5rpx;}
		.old-num{font-size: $uni-font-size-base;}
	}
}
</style>
