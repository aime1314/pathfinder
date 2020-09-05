<template>
	<view class="list-cell Flex-sb" @click="detail(item.projectId)">
		<image class="img" :src="item.homePageProjectImg" mode="widthFix" v-if="item.homePageProjectImg"></image>
		<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="widthFix" v-else></image>
		<view class="des">
			<text class="title">{{item.projectName}}</text>
			<text class="subtitle">涵盖全国70多家高端酒店</text>
			<view class="discount">
				<discount-label type="sm">6期免息</discount-label>
				<discount-label type="sm">领150减10</discount-label>
			</view>
			<view class="price">
				<text class="num">¥{{item.discountPrice}}</text>
				<text class="old-num">¥{{item.marketPrice}}</text>
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
.list-cell {
	background: $uni-bg-color;
	border-radius: 12rpx;
	width: 686rpx;
	height: 256rpx;
	padding: $uni-padding-30 $uni-padding-20;
	margin-bottom: $uni-margin-20;
	.img {
		width: 240rpx;
		height: 192rpx;
		flex: 0 0 auto;
		margin: $uni-margin-10 $uni-margin-20 $uni-margin-10 0;
	}
	.des {
		display: flex;
		flex: 1;
		flex-direction: column;
		.title {
			font-size: $uni-font-size-base;
			color: $uni-font-color-goods;
			margin-bottom: $uni-margin-10;
		}
		.subtitle {
			font-size: 26rpx;
			color: $uni-font-color-goods;
			margin-bottom: $uni-margin-10;
		}
		.price {
			margin-top: $uni-margin-20;
			.num {
				font-size: $uni-font-size-base;
				color: $uni-color-price;
				margin-right: 8rpx;
			}
			.old-num {
				text-decoration: line-through;
				color: #9D9D9E;
				font-size: 22rpx;
			}
		}
		
	}
}
</style>
