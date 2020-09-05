<template>
	<com-layout :navBg="navBg" titleColor="#fff">
		<template v-slot:nav-center>
			<text>我的账单</text>
		</template>
		<template v-slot:nav-right>
			<text class="right-action" @click="showPop = true">更多</text>
		</template>
		<view class="bill" :style="{'margin-bottom': current === 2 ? 0 : '94rpx', height:  current === 2 ? '100%' : 'calc(100% - 94rpx)'}">
			<view class="top">
				<text>总计待还：<text class="num">2,000.00元</text></text>
			</view>
			<view class="bill-tabs">
				<u-tabs-swiper ref="uTabs" active-color="#fff" inactive-color="#fff" :list="list" :current="current" @change="tabsChange"
				 :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<bill-list :loadStatus="loadStatus[0]"></bill-list>
				</swiper-item>
				<swiper-item class="swiper-item">
					<bill-list :loadStatus="loadStatus[1]"></bill-list>
				</swiper-item>
				<swiper-item class="swiper-item">
					<bill-list :loadStatus="loadStatus[2]"></bill-list>
				</swiper-item>
			</swiper>
		</view>
		<com-bottom v-if="current !== 2" :rText="actionText" @confirm="repayment"></com-bottom>

		<com-popup :visable.sync="showPop" :showBottom="false" :closeable="false">
			<view class="pop-list">
				<view class="item Flex-cen" @click="goHstoryBill">
					<text>历史账单</text>
				</view>
				<view class="item Flex-cen" @click="goRefund">
					<text>全部退款</text>
				</view>
				<view class="cancel Flex-cen" @click="showPop = false">
					<text>取消</text>
				</view>
			</view>
		</com-popup>

		<com-popup :visable.sync="showRefund" title="还款详情" confirmText="立即支付" @confirm="refundFun">
			<view class="refund-pop">
				<view class="top">
					<text><text class="flag">¥</text>2,000.00</text>
				</view>
				<view class="r-pop-con">
					<text class="deduction-type">扣款方式</text>
					<view class="bank pay-type Flex-sb" @click="changePayType(PAYTYPE.BANK)">
						<image class="flag" src="https://cdn.colourfulchina.com/nwsh/static/icons/bar_card.png" mode="widthFix"></image>
						<view class="content">
							<view class="title">
								<text>齐商银行 借记卡（7788）</text>
								<text class="suffix">默认</text>
							</view>
							<text class="des">如扣款失败 请选择其它方式</text>
						</view>
						<com-icon name="icon-tiaozhuan"></com-icon>
					</view>
					<view class="alipay Flex-sb pay-type" @click="changePayType(PAYTYPE.WXPAY)">
						<image class="flag" src="https://cdn.colourfulchina.com/nwsh/static/icons/bar_card.png" mode="widthFix"></image>
						<view class="content">
							<view class="title">
								<text>微信支付</text>
							</view>
							<text class="des">一次性支付全款</text>
						</view>
						<com-icon name="icon-xuanzhong" color="#EC2C21" size="40" v-if="pay_type === PAYTYPE.WXPAY"></com-icon>
						<com-icon name="icon-weixuanzhong" size="40" v-else></com-icon>
					</view>
					<view class="wxpay Flex-sb pay-type" @click="changePayType(PAYTYPE.ALIPAY)">
						<image class="flag" src="https://cdn.colourfulchina.com/nwsh/static/icons/bar_card.png" mode="widthFix"></image>
						<view class="content">
							<view class="title">
								<text>支付宝支付</text>
							</view>
							<text class="des">一次性支付全款</text>
						</view>
						<com-icon name="icon-xuanzhong" color="#EC2C21" size="40" v-if="pay_type === PAYTYPE.ALIPAY"></com-icon>
						<com-icon name="icon-weixuanzhong" size="40" v-else></com-icon>
					</view>
				</view>

			</view>
		</com-popup>
	</com-layout>
</template>

<script>
	import billList from './components/bill-list.vue'
	const PAYTYPE = {
		WXPAY: 'WXPAY',
		ALIPAY: 'ALIPAY',
		BANK: 'BANK'
	}
	export default {
		data() {
			return {
				navBg: `url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 0 / 100% 574rpx no-repeat`,
				contentBg: `url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 -50px / 100% 600rpx no-repeat`,
				list: [{
					name: '5月应还'
				}, {
					name: '6月应还'
				}, {
					name: '未入账'
				}],
				tabs: [],
				loadStatus: ['loadmore', 'loading', 'nomore'],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				showPop: false,
				showRefund: false,
				PAYTYPE,
				pay_type: ''
			};
		},
		computed: {
			actionText() {
				switch (this.current) {
					case 0:
						return '立即还款';
					case 1:
						return '提前还款';
					default:
						return '立即还款';
				}
			}
		},
		onReady() {
		},
		components: {
			billList
		},
		methods: {
			changePayType(type) {
				this.pay_type = type;
			},
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			},
			repayment() {
				this.showRefund = true;
				console.log('还款');
			},
			refundFun() {

			},
			goHstoryBill() {
				uni.navigateTo({
					url: '/pages/history-bill/history-bill'
				})
			},
			//全部退款
			goRefund() {
				uni.navigateTo({
					url: '/pages/refund-page/refund-page'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-list {

		// height: 329rpx;
		.item {
			height: 110rpx;
			font-size: $uni-font-size-lg;
			color: #303133;
		}

		.cancel {
			height: 95rpx;
			font-size: 36rpx;
			color: #2577E3;
		}
	}
	.right-action {
		color: #fff;
	}

	.refund-pop {
		.top {
			text-align: center;
			color: #303133;
			font-size: 80rpx;
			.flag {
				font-size: 60rpx;
			}
		}
		.r-pop-con {
			.deduction-type {
				font-size: $uni-font-size-lg;
				color: #909399;
				padding: 0 $uni-padding-30;
				margin: $uni-margin-20 0;
			}
			.pay-type {
				padding: 28rpx $uni-padding-30;
				border-bottom: 1rpx solid #D8D8D8;
				&:last-child {
					border-bottom: none;
				}
				.flag {
					width: 40rpx;
				}

				.content {
					flex: 1;
					margin-left: $uni-margin-20;
					.title {
						font-size: $uni-font-size-base;
						color: #444444;
					}
					.des {
						font-size: 20rpx;
						color: #EB2512;
					}
				}
			}
			.bank {
				.flag {
					width: 54rpx;
				}
				.content {
					.title {
						font-size: $uni-font-size-lg;
						.suffix {
							font-size: $uni-font-size-sm;
							color: #EB2512;
							border: 1rpx solid #EB2512;
						}
					}
					.des {
						font-size: $uni-font-size-base;
					}
				}
			}
		}
	}

	.bill {
		display: flex;
		flex-direction: column;
		height: calc(100% - 94rpx);
		width: 100%;
		background: url(https://cdn.colourfulchina.com/nwsh/static/images/card-bg.png) 0 -50px / 100% 600rpx no-repeat;
		.top {
			padding-top: $uni-padding-30;
			color: #fff;
			text-align: center;
			font-size: 32rpx;

			.num {
				font-size: 38rpx;
			}
		}

		.bill-tabs {
		}

		.swiper-box {
			flex: 1;
		}

		.swiper-item {
			// height: 100%;
		}


	}
</style>
