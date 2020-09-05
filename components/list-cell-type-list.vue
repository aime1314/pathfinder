<template>
	<view class="list-cell Flex-sb" @click="detail(item.projectId)">
		<image class="img" :src="item.projectUrl" mode="scaleToFill" v-if="item.projectUrl"></image>
		<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="widthFix" v-else></image>
		<view class="des">
			<text class="title ellipsis">{{item.projectName}}</text>
			<text class="subtitle ellipsis">涵盖全国70多家高端酒店多家高端酒店多家高端酒店</text>
			<view class="discount">
				<discount-label type="sm">6期免息</discount-label>
				<discount-label type="sm">领150减10</discount-label>
			</view>
			<view class="price">
				<com-price :price="item.discountPrice" :oldPrice="item.marketPrice"></com-price>
			</view>
		</view>
	</view>
</template>

<script>
	import discountLabel from './discount-label.vue'
	export default {
		name: 'listCell',
		props:{
			item: '',
		},
		data() {
			return {
				
			};
		},
		components: {
			discountLabel
		},
		methods:{
			detail(projectId){
				uni.navigateTo({
					url: `../detail/detail?id=`+projectId
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	$gap-dis: 16rpx;
.list-cell {
	background: $uni-bg-color;
	border-radius: 12rpx;
	width: 686rpx;
	height: 256rpx;
	padding: 32rpx 24rpx;
	margin-bottom: $gap-dis;
	.img {
		width: 240rpx;
		height: 192rpx;
		flex: 0 0 auto;
		border-radius: 6rpx;
		margin-right: 24rpx;
	}
	.des {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		.title {
			font-size: $uni-font-size-lg;
			color: $uni-font-color-goods;
			font-weight: bold;
			margin-bottom: $gap-dis;
		}
		.subtitle {
			font-size: 26rpx;
			color: $uni-font-color-goods;
			margin-bottom: $gap-dis;
		}
		.price {
			margin-top: $gap-dis;
		}
		
	}
}
</style>
