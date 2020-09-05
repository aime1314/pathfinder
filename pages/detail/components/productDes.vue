<template>
	<view class="product-des">
		<view class="des">
			<com-price :price="goodsInfo.discountPrice" priceSize="40" :oldPrice="goodsInfo.marketPrice" oldPriceSize="28" flagSize="28"></com-price>
			<discount-label class="des-free" type="sm">6期免息</discount-label>
		</view>
		<com-scroll class="staging-wrap" :contentStye="{background: '#fff'}">
			<staging-wrap @itemClick="stagingChange" :installmentList="installmentList"></staging-wrap>
		</com-scroll>
		<view class="content">
			<view class="title">
				<text>{{goodsInfo.projectName}}</text>
			</view>
			<view class="sub">
				<text>{{goodsInfo.projectSubhead}}</text>
			</view>
		</view>
		<view class="coupon Flex-sb" @click="getCoupon">
			<view class="Flex-cen">
				<view class="item Flex-cen">
					<text>满100减20</text>
				</view>
				<view class="item Flex-cen">
					<text>满200减40</text>
				</view>
				<view class="item Flex-cen">
					<text>满500减100</text>
				</view>
			</view>
			<!-- <view class="action-text">
				<text>领劵</text>
				<com-icon name="icon-tiaozhuan" color="#EB2613"></com-icon>
			</view> -->
		</view>
		
		<member-info></member-info>
	</view>
</template>

<script>
	import discountLabel from '@/components/discount-label.vue'
	import memberInfo from './memberInfo.vue'
	import stagingWrap from './stagingWrap.vue'
	export default {
		name: 'productDes',
		props:['goodsInfo','installmentList'],
		data() {
			return {
			}
		},
		created() {
		},
		components: {
			discountLabel,
			memberInfo,
			stagingWrap
		},
		methods: {
			getCoupon() {
				// this.$emit('getCoupon')
			},
			// 分期 更改
			stagingChange(index, item) {
				console.log(index, item)
			},
		}
	}
</script>

<style lang="scss" scoped>
.product-des {
	background: $uni-bg-color;
	padding: $uni-padding-30;
	border-radius: 10rpx;
	margin-bottom: 16rpx;
	.des {
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		.des-free {
			margin-left: $uni-margin-20;
		}
	}
	.coupon {
		width: 690rpx;
		height: 70rpx;
		background: #FFE5E5;
		padding: 0 $uni-padding-20;
		color: $uni-color-price;
		border-radius: 10rpx;
		margin-bottom: 16rpx;
		.item {
			min-width: 143rpx;
			height: 36rpx;
			font-size: $uni-font-size-sm;
			margin-right: $uni-margin-20;
			background: url(https://cdn.colourfulchina.com/nwsh/static/icons/coupon-bg-sm.png) 0 0 /100% 100% no-repeat;
			&:last-child {
				margin-right: 0;
			}
		}
		.action-text {
			font-size: $uni-font-size-base;
		}
	}
	.content {
		.title {
			color: $uni-font-color-goods;
			font-size: 32rpx; display: inline-block;
			margin-bottom: 10rpx;
		}
		.sub {
			font-size: $uni-font-size-base;
			color: #606266;
			margin-bottom: $uni-margin-10;
		}
	}
}
</style>
