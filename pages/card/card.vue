<template>
	<com-layout :navBg="''" titleColor="#fff" :contentBg="''" :showNav="false">
		<template v-slot:nav-left>
			<view class=""></view>
		</template>
		<template v-slot:nav-center>
			<text>极融卡</text>
		</template>
		<template v-slot:nav-right>
			<image src="https://cdn.colourfulchina.com/nwsh/static/icons/msg.png" class="message" mode="aspectFit"></image>
		</template>
		<view class="card-page">
			<view class="top">
				<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/images/card-flag-w.png" mode="widthFix"></image>
				<text class="wel-card">欢迎激活极融卡服务</text>
				<text>极你所急，融我所需</text>
			</view>

			<view class="card-view">
				<view class="card-top Flex-sb">
					<view class="left Flex-cen">
						<image class="img" src="https://cdn.colourfulchina.com/nwsh/static/icons/card-flag-g.png" mode="widthFix"></image>
						<text>极融卡</text>
					</view>
					<view class="right Flex-cen">
						<text>GEERONG</text>
						<text class="servise">SERVISE</text>
					</view>
				</view>
				<!--  -->
				<view class="card-mid">
					<text class="mid-1">大富翁，你可借</text>
					<text class="mid-num"><text class="flag">¥</text> 2,400.00</text>
					<text class="mid-des">通用额度可用¥25,400.00，日利率0.05%</text>
				</view>

				<!-- 未申请 -->
				<!-- <view class="card-mid">
					<text class="not-applied">开卡领取50,000.00额度</text>
				</view> -->
				<view class="card-bottom Flex-cen" @tap="goCardApply">
					<text>免费开通查看额度</text>
				</view>
			</view>
			
			<!-- 已申请 -->
			<template v-if="true">
				<view class="wrap Flex-sb">
					<piece-item @click="goBill" src="https://cdn.colourfulchina.com/nwsh/static/icons/rmb-b.png" title="我的账单" num="300"></piece-item>
					<piece-item @click="goQuota" src="https://cdn.colourfulchina.com/nwsh/static/icons/rmb-r.png" title="我的额度" num="50000"></piece-item>
				</view>
				<view class="wrap">
					<image src="https://cdn.colourfulchina.com/nwsh/static/images/9.png" mode="widthFix"></image>
				</view>
				<view class="wrap">
					<com-plate title="分期免息"></com-plate>
					<com-scroll >
						<com-hot-sale  :contentList="contentList"></com-hot-sale>
					</com-scroll>
					
				</view>
			</template>

			<!-- 未申请 -->
			<not-applied v-if="false"></not-applied>

			<!-- 未通过 -->
			<not-pass v-if="false"></not-pass>
		</view>
	</com-layout>
</template>

<script>
	import goodsItem from '@/components/goods-item.vue'
	import pieceItem from './components/pieceItme.vue'
	import notApplied from './components/not-applied.vue'
	import notPass from './components/not-pass.vue'
	export default {
		data() {
			return {
				navBg: `url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 0 / 100% 675rpx no-repeat`,
				contentBg: `url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 -50px / 100% 725rpx no-repeat`,
				contentList: [],
			}
		},
		components: {
			goodsItem,
			pieceItem,
			notApplied,
			notPass
		},
		onLoad() {
			this.getObjectData()
		},
		methods: {
			//获取商品信息
			getObjectData() {
				let params = {
					"acChannel": "NWSH",
					"sticket": ""
				}
				this.$goodsApi.getGoodsList(params).then(res => {
					this.contentList = res.obj.list.slice(0,3);
				});
			},
			goBill() {
				uni.navigateTo({
					url: '/pages/bill/bill'
				})
			},
			goQuota() {
				uni.navigateTo({
					url: '/pages/card-quota/card-quota'
				})
			},
			//开通极融卡
			goCardApply() {
				uni.navigateTo({
					url: '/pages/card-apply/cardapply'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.card-page {
		padding: $uni-padding-20 $uni-padding-30;
		background: url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 0 / 100% 725rpx no-repeat;
		.top {
			color: #fff;
			display: flex;
			flex-direction: column;
			font-size: $uni-font-size-lg;
			margin-top: 35rpx;

			.img {
				width: 179rpx;
				height: 74rpx;
			}

			.wel-card {
				font-size: 54rpx;
				margin: $uni-margin-30 0 $uni-margin-20 0;
			}
		}

		.card-view {
			width: 690rpx;
			height: 396rpx;
			margin-top: 93rpx;
			background: url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg-g.png) 0 0 / 100% 100% no-repeat;
			color: #9D684E;
			padding: $uni-padding-30 40rpx;

			.card-top {
				align-items: center;

				.left {
					font-size: 42rpx;

					.img {
						width: 47rpx;
						height: 53rpx;
						margin-right: $uni-margin-20;
					}
				}

				.right {
					font-size: 30rpx;

					.servise {
						margin-left: $uni-margin-20;
						font-size: 30rpx;
					}
				}
			}

			.card-mid {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #7E4A3D;
				margin: $uni-margin-10 0;

				.mid-1 {
					font-size: 35rpx;
				}

				.mid-num {
					font-size: 60rpx;
					margin: $uni-margin-10 0;

					.flag {
						font-size: 50rpx;
					}
				}

				.mid-des {
					font-size: 22rpx;
				}

				.not-applied {
					font-size: 50rpx;
					margin: 70rpx 0 30rpx 0;
				}
			}

			.card-bottom {
				width: 580rpx;
				height: 82rpx;
				line-height: 82rpx;
				margin: 0 auto;
				color: #fff;
				font-size: 38rpx;
				border-radius: 45rpx;
				box-shadow: 0 1rpx 9rpx rgba($color: #A37161, $alpha: 0.3);
				background: linear-gradient(to right, rgba($color: #E1BB74, $alpha: 0.9), rgba($color: #CA9A4E, $alpha: 1));
			}
		}

		.wrap {
			margin-top: 30rpx;
		}
	}
</style>
