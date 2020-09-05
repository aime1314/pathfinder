<template>
	<view class="hot-sale-wrap">
		<!-- <hot-sale-item v-for="(item, index) in contentList" :key="index" :item="item" v-bind="$attrs">
			
		</hot-sale-item> -->

		<view class="hot-sale" v-for="(item, index) in contentList" :key="index" :item="item" @tap="detail(item.projectId)">
			<image class="img" v-if="item.projectUrl" :src="item.projectUrl" mode="scaleToFill"></image>
			<image class="img" v-else src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" mode="aspectFit"></image>
			<view class="des">
				<view class="title ellipsis">
					{{item.projectName}}
				</view>
				<view class="subtitle ellipsis">
					香餐厅（深圳香格里拉香餐厅（深圳香格里拉…香餐厅（深圳香格里
				</view>
				<view class="price-content">
					<discount-label type="sm">6期免息</discount-label>
					<com-price :price="item.discountPrice"></com-price>
				</view>
			</view>
		</view>
		<view class="check-more">
			<text @tap="gomorelist">查看更多</text>
		</view>
	</view>
</template>

<script>
	// import HotSaleItem from './hot-sale-item.vue'
	import discountLabel from './discount-label.vue'
	export default {
		name: 'comHotSale',
		props: {
			contentList: Array
		},
		data() {
			return {

			};
		},
		components: {
			// HotSaleItem,
			discountLabel
		},
		methods: {
			detail(projectId) {
				uni.navigateTo({
					url: `../detail/detail?id=` + projectId
				})
			},
			gomorelist() {
				uni.navigateTo({
					url: '/pages/searchResult/searchResult'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$gap-margin: 16rpx;
	$paddingX: 8rpx;
	$paddingY: 16rpx;

	.hot-sale-wrap {
		.hot-sale {
			width: 240rpx;
			margin-right: 16rpx;
			border-radius: 4rpx;
			display: inline-block;
			background: $uni-bg-color;

			.img {
				width: 100%;
				height: 140rpx;
				border-radius: 4rpx;
				margin-bottom: $gap-margin;
				overflow: hidden;
			}

			.des {
				padding: $paddingY $paddingX;
				width: 100%;

				.title {
					font-size: $uni-font-size-sm;
					color: #606266;
					margin-bottom: 8rpx;
				}

				.subtitle {
					margin-bottom: 16rpx;
					font-size: 20rpx;
					color: #51545B;
				}

				.price-content {
					display: flex;
					align-items: center;
				}
			}
		}

		.check-more {
			display: inline-block;
			font-size: 22rpx;
			color: #51545B;
			position: relative;
			top: -150rpx;
			margin-left: 12rpx;
		}
	}
</style>
