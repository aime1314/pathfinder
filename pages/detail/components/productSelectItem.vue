<template>
	<view class="product-wrap">
		<view class="product Flex-sb">
			<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" mode="aspectFit"></image>
			<view class="price">
				<text class="title">{{goodsInfo.projectName}}</text>
				<view class="num">
					<text class="mon">¥{{goodsInfo.discountPrice}}</text>
					<discount-label type="sm">6期免息</discount-label>
					<discount-label type="sm">领150减10</discount-label>
				</view>
				<text class="des">请选择：规格</text>
			</view>
		</view>
		<view class="combo">
			<view class="title">
				<text>规格</text>
			</view>
			<view class="content">
				<button :class="['item', 'Flex-cen', {active: selectIndex === index, disabled: item.disabled}]" :disabled="item.disabled" v-for="(item, index) in 6" :key='index' @click="itemClick(index, item)">礼盒套装01</button>
			</view>
		</view>
		<view class="num Flex-sb">
			<text>数量</text>
			<u-number-box :min="1" :max="1" @change="valChange"></u-number-box>
		</view>
	</view>
</template>

<script>
	import discountLabel from '@/components/discount-label.vue'
	export default {
		name: 'productSelectItem',
		props:['goodsInfo'],
		data() {
			return {
				selectIndex: -1,
			}
		},
		components: {
			discountLabel
		},
		methods: {
			itemClick(index, item) {
				this.selectIndex = index;
				
			},
			valChange(obj) {
				console.log(obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-wrap {
		padding: $uni-padding-30;
		font-size: $uni-font-size-base;
		color: $uni-text-color-des;
		.product {
			.img {
				width: 180rpx;
				height: 180rpx;
				margin-right: 40rpx;
			}
			.price {
				flex: 1 1 auto;
				.title {
					font-size: 30rpx;
					color: #303133;
				}
				.num {
					font-size: 36rpx;
					color: $uni-color-price;
					margin: $uni-margin-20 0;
					.mon {
						margin-right: $uni-margin-20;
					}
				}
			}
		}
		.combo {
			margin-top: $uni-margin-20;
			.content {
				display: flex;
				flex-wrap: wrap;
				margin-top: $uni-padding-30;
				.item {
					height: 52rpx;
					margin-right: $uni-margin-30;
					margin-bottom: $uni-margin-20;
					padding: 0 $uni-padding-30;
					background: #f4f4f4;
					border-radius: 25rpx;
					color: #85858E;
				}
				.active {
					background: #FFE5E5;
					color: #EB2512;
				}
				.disabled {
					background: #F7F7F7;
					color: #DBDCDF;
				}
			}
		}
		.num {
			margin-top: $uni-margin-30;
		}
	}
</style>
