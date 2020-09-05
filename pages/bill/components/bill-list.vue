<template>
	<view class="bill-list-wrap">
		<view class="card-view">
			<text>待还金额（元）</text>
			<text class="num">200000.00</text>
			<text>最后还款日5月20日</text>
		</view>
		<scroll-view scroll-y  class="scroll-wrap" @scrolltolower="reachBottom">
			<view class="bill-list">
				<view class="list">
					<!-- <com-sticky> -->
						<view class="list-title">
							<text>本月账单明细共13笔</text>
						</view>
					<!-- </com-sticky> -->
					<view class="day" v-for="(dayItem, dayIndex) in 10" :key="dayIndex">
						<view class="day-title">
							<text>5月1{{dayIndex}}日</text>
						</view>
						<view class="content Flex-sb" v-for="(item, index) in 3" :key="item">
							<view class="left">
								<text class="des ellipsis">资生堂 安热小金瓶防晒霜安安热小金瓶防晒霜安20pp</text>
								<text class="type">化妆品</text>
							</view>
							<view class="right">
								<text class="money">145.00</text>
								<text class="installment">3期/24期</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<com-loadmore :status="loadStatus"></com-loadmore>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'billList',
		props: {
			loadStatus: {
				type: String,
				default: 'loadmore'
			}
		},
		data() {
			return {

			}
		},
		methods: {
			reachBottom() {
				this.$emit('reachBottom')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bill-list-wrap {
		height: 100%;
		padding-top: 30rpx;
		padding-bottom: 5rpx;
		.card-view {
			width: 690rpx;
			height: 322rpx;
			margin: 0 auto;
			padding: 50rpx 44rpx;
			display: flex;
			flex-direction: column;
			font-size: $uni-font-size-base;
			color: #7E4A3D;
			background: url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg-g.png) 0 0/100% 100% no-repeat;
			.num {
				font-size: 80rpx;
			}
		}
		
		.scroll-wrap {
			margin-top: 16rpx;
			height: calc(100% - 322rpx - 16rpx);
		}
	}
	.bill-list {
		padding: 0 32rpx;
		.list {
			color: #303133;
			// background: #fff;
			.list-title {
				font-size: $uni-font-size-base;
				background: #fff;
				padding: 10rpx 26rpx;
				// margin-bottom: $uni-margin-30;
			}
			.day {
				font-size: $uni-font-size-lg;
				background: $uni-bg-color;
				margin-bottom: $uni-margin-30;
				&:last-child {
					margin-bottom: 0;
				}
				.day-title {
					color: #85858E;
					border-bottom: 1rpx solid #F0F0F0;
					padding: $uni-padding-30 26rpx;
				}
				.content {
					padding: $uni-padding-20 $uni-padding-30;
					border-bottom: 1rpx solid #F0F0F0;
				}
				.left {
					flex: 1 0 auto;
					width: 480rpx;
					display: flex;
					flex-direction: column;
					.des {
						margin-bottom: $uni-margin-10;
					}
					.type {
						color: #85858E;
						font-size: $uni-font-size-sm;
					}
				}
				.right {
					flex: 0 0 auto;
					display: flex;
					margin-left: $uni-margin-20;
					flex-direction: column;
					align-items: center;
					.money {
						margin-bottom: $uni-margin-10;
					}
					.installment {
						font-size: $uni-font-size-sm;
					}
				}
			}
		}
	}
</style>
