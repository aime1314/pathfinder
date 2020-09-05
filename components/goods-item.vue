<template>
	<view class="goods-item" @click="itemClick">
		<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
		<!-- #ifndef MP-WEIXIN -->
		<image v-if="!goods[propSrc]" src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="widthFix"></image>
		<u-lazy-load v-else :image="goods[propSrc]" class="img" threshold="-300" border-radius="0" img-mode="widthFix" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
			<image :src="goods[propSrc]" class="img" mode="widthFix" v-if="goods[propSrc]"></image>
			<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="scaleToFill" v-else></image>
		<!-- #endif -->
		
		<view class="bottom-wrap">
			<view class="title">
				<text >
					{{goods[propTitle]}}
				</text>
			</view>
			<text class="des">
				涵盖全国30多家高端酒店
			</text>
			<view class="discount-wrap">
				<discountLabel type="sm">
					6期免息
				</discountLabel>
			</view>
			<view class="price-wrap">
				<com-price :price="goods[propPrice]" :oldPrice="goods[oldPrice]" priceSize="32" oldPriceSize="22"></com-price>
			</view>
		</view>
		
	</view>
</template>

<script>
	import discountLabel from './discount-label.vue'
	export default {
		name: 'goodsItem',
		props: {
			propTitle: {
				type: String,
				default: 'projectName',
			},
			propSrc: {
				type: String,
				default: 'projectUrl'
			},
			propPrice: {
				type: String,
				default: 'discountPrice'
			},
			oldPrice: {
				type: String,
				default: 'marketPrice'
			},
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components: {
			discountLabel
		},
		data() {
			return {
				loadingImg: 'https://cdn.colourfulchina.com/nwsh/static/images/default.png',
				errorImg: ''
			};
		},
		methods: {
			itemClick() {
				this.$emit('itemClick', this.goods)
			}
		}
	}
</script>

<style lang="scss" scoped>
.goods-item {
	width: 336rpx;
	overflow: hidden;
	width: 100%;
	margin: 0 auto;
	// background: $uni-bg-color;
	border-radius: 20rpx;
	.img {
		width: 336rpx;
		// height: 336rpx;
		position: relative;
		margin: 0 auto;
	}
	.bottom-wrap {
		background: $uni-bg-color;
		padding: $uni-padding-10 $uni-padding-20 $uni-padding-20;
		.title {
			font-size: $uni-font-size-base;
			color: $uni-font-color-goods;
		}
		.des {
			color: #606266;
			font-size: 26rpx;
			padding:5rpx 0; color:$uni-text-color-grey; display: inline-block;
		}
		.discount-wrap {
			margin: $uni-margin-10 0;
		}
	}
}
</style>
