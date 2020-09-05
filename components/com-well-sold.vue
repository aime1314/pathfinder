<template>
	<view class="hot-sell-content">
		<view class="hot-item" v-if="objectList.length > 0">
			<view class="Flex-sb" @click="detail(objectList[0].projectId)">
				<image :src="objectList[0].projectUrl" class="img" mode="widthFix" v-if="objectList[0].projectUrl"></image>
				<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="scaleToFill" v-else></image>
				<view class="des">
					<view class="title ellipsis">
						{{objectList[0].projectName}}
					</view>
					<view class="subtitle ellipsis">
						{{objectList[0].projectName}}
					</view>
					<view class="discount-wrap">
						<discount-label type="sm">6期免息</discount-label>
						<discount-label type="sm">领179减10</discount-label>
					</view>
					<com-price :price="objectList[0].discountPrice" :oldPrice="objectList[0].marketPrice"></com-price>
					
				</view>
			</view>
			<view v-if="showAction" class="action Flex-cen">
				<view class="btn Flex-cen" @click="action">
					立即购买
				</view>
			</view>
		</view>
		<view class="other-item" v-if="!showAction">
			<view class="item" v-if="objectList.length > 1" @click="detail(objectList[1].projectId)">
				<image :src="objectList[1].projectUrl" class="img" mode="widthFix" v-if="objectList[0].projectUrl"></image>
				<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="scaleToFill" v-else></image>	
				
				<view class="right">
					<view class="title two-ellipsis">
						<text>{{objectList[1].projectName}}</text>
					</view>
					<com-price :price="objectList[1].discountPrice"></com-price>
				</view>
				
			</view>
			<view class="item" v-if="objectList.length > 2" @click="detail(objectList[2].projectId)">
				<image :src="objectList[1].projectUrl" class="img" mode="widthFix" v-if="objectList[0].projectUrl"></image>
				<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="scaleToFill" v-else></image>
				<view class="right">
					<view class="title two-ellipsis">
						<text>{{objectList[2].projectName}}</text>
					</view>
					
					<com-price :price="objectList[2].discountPrice"></com-price>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import discountLabel from './discount-label.vue'
	export default {
		name: 'comWell-sold',
		props: {
			showAction: {
				type: Boolean,
				default: false,
			},
			objectList: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
			};
		},
		components: {
			discountLabel
		},
		methods: {
			action() {
				this.$emit('action')
			},
			detail(projectId){
				uni.navigateTo({
					url: `../detail/detail?id=`+projectId
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	$titleSize: 28rpx;
	$subtitleSize: 24rpx;
	$mr-dis: 24rpx;
	.hot-sell-content {
		background: #fff;
		.hot-item {
			background: url(https://cdn.colourfulchina.com/nwsh/static/images/hot-sell-bg.png) 0 0 / 100% 100% no-repeat;
			padding: $uni-padding-20  $uni-padding-30 $uni-padding-20 $uni-padding-30;
			.img {
				width: 160rpx;
				height: 160rpx;
				flex: 0 0 auto;
				margin-right: $mr-dis;
			}

			.des {
				flex: 1 0 auto;
				overflow: hidden;
				width: 448rpx;
				.title {
					font-size: $titleSize;
					font-weight: bold;
					color: $uni-font-color-goods;
				}
				.subtitle {
					font-size: $subtitleSize;
				}
				.discount-wrap {
					margin-top: $uni-margin-10;
					margin-bottom: $uni-margin-20;
				}
			}
		}

		.action {
			margin-top: $uni-margin-20;
			.btn {
				width: 360rpx;
				height: 70rpx;
				border: 1rpx solid $uni-color-price;
				border-radius: 40rpx;
				color: $uni-color-price;
				font-size: 30rpx;
			}
		}
		.other-item {
			border-top: 1rpx dashed $uni-border-color-dashed;
			display: flex;
			background: $uni-bg-color;
			margin: 0 30rpx;
			.item {
				width: 50%;
				flex: 0 0 auto;
				// height: 206rpx;
				padding:$uni-padding-20 0;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;
				&:last-child {
					margin-right: 0;
				}
				.right {
					flex: 1 0 auto;
					.title {
						font-size: $titleSize;
						color: $uni-font-color-goods;
						width: 154rpx;
						margin-bottom: 20rpx;
					}
				}
				.img {
					width: 136rpx;
					height: 136rpx;
					flex: 0 0 auto;
					margin-right: 16rpx;
				}
			}
		}
	}
</style>
