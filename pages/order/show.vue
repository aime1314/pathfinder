<template>
	<view class="ordershowhome">
		<!-- <view class="Flex-sb orderstatusMsgBox">
			<view class="orderstatus-time">
				卖家已发货
				<text>暂无物流信息跟踪</text>
			</view>
			<view class="orderstatus-icon">
				<text></text>
			</view>
		</view> -->
		<!-- <view class="Flex-box logMsglistBox">
			<view class="orderMsglistShow">
				<view class="tagsMsg">【上海市】您的快件已签收：已签收，如有问题请电联快递员：王君快：187 8648 …</view>
				<view class="tagsTime">2020-06-19 10:12:28</view>
			</view>
			<view class="orderMsglistShow">
				<view class="contacts">韩士嘉 187****2844</view>
				<view class="address">上海市浦东新区杨高南路328号由由世纪广场1号楼18层</view>
			</view>
		</view> -->
		<view class="Flex-box orderMsgshowBox">
			<view class="Flex-sb orderMsgTime">
				<view>
					{{order.createTime}}
				</view>
				<view class="orderchannel ">
					<text v-if="order.status ==0 ">待付款</text>
					<text v-else-if="order.status == 1 || order.status == 2">已付款</text>
					<text v-else-if="order.status == 6">使用中</text>
					<text v-else-if="order.status == 3 || order.status === 9 || order.status === 8 || order.status === 7">已取消</text>
					<text v-else-if="order.status == 4||order.status == 5">售后/退款</text>
				</view>
			</view>
			<view class="orderMsgAbout Flex-sb" @tap="goodsClick(order.projectId)">
				<view class="orderImg">
					<u-image :src="order.imgUrl"  mode="widthFix" :fade="true" duration="450"
					 border-radius="10"></u-image>
				</view>
				<view class="orerName">
					<view class="orerName-title"> {{order.projectName}}</view>
					<view class="orerName-tip">{{order.projectName}}</view>
				</view>
				<view class="orderNumber">
					<view class="orderNumber-money">¥ {{order.salePrice}}</view>
					<view class="orderNumber-size">x 1</view>
				</view>
			</view>

			<view class="orderStatus titleSize">
				<text v-if="order.status == 3 || order.status === 9 || order.status === 8 || order.status === 7">交易关闭</text>
				<text v-if="order.status == 4">退款中</text>
				<!-- <text>立即支付</text><text>立即评论</text><text>退货</text> -->
			</view>
			<view class="Flex-sb orderMsgTime">
				<view>
					商品总价
				</view>
				<view>¥ {{order.salePrice}}</view>
			</view>
			<view class="Flex-sb orderMsgTime">
				<view>
					期数
				</view>
				<view>0期</view>
			</view>
			<view class="Flex-sb orderMsgTime">
				<view>运费（快递）</view>
				<view>¥0.00</view>
			</view>
			<view class="Flex-sb orderMsgTime">
				<view>店铺优惠</view>
				<view>¥0.00</view>
			</view>

			<view class="orderlistNumber ">
				<view class="titleBox">订单详情</view>
				<view class="Flex-sb orderlistNumbershow titleSize">
					<view>订单号：{{order.salesOrderId}}</view>
					<!-- <view @tap="copyShaneUrl(order.salesOrderId)" class="orderchannel">复制</view> -->
				</view>
				<view class="orderlistNumbershow titleSize">
					<view v-if="order.createTime">订单时间：{{order.createTime}}</view>
					<view v-if="order.payMethod == 'wxjs'">支付方式：微信支付</view>
					<view v-if="order.payMethod == ''">支付方式：未支付</view>
					<view v-if="order.payTime">付款时间：{{order.payTime}}</view>
					
					<!-- <view>发货时间：2020-05-15 16:34:20</view> -->
				</view>
			</view>
		</view>
		<view style="height: 100rpx;">&nbsp;</view>
		<orderbar v-if="showOrderBar" :orderstatus = "order.status" :order="order"  ></orderbar>
	</view>
</template>

<script>
	import orderbar from '../../components/orderbar.vue'
	export default {
		data() {
			return {
				title: '订单详情',
				order: {},
				saleOrderId: '',
			}
		},
		computed: {
			showOrderBar() {
				let hiddenBarList = [3, 7, 8, 9];
				return !hiddenBarList.includes(this.order.status)
			}
		},
		components: {

		},
		onLoad(option) {
			this.saleOrderId = option.id;
			this.detail(this.saleOrderId);
		},
		components: {
			orderbar
		},
		methods: {		
			tabsChange(index) {
				this.$data.swiperCurrent = index;
				this.getAllOrder(index);
			},
			detail(orderId) {
				var params = {
					"salesOrderId": orderId
				};
				this.$orderApi.salesOrderDetail(params).then(res => {
					if (res && res.ok === 0) {
						this.$data.order = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						})
					}
				});
			},
			copyShaneUrl(shareLink){
			   uni.setClipboardData({
			       data: shareLink,
			       success: function () {
			       },
				   fail:function(){
					   
				   },
			   });
			
			},
			goodsClick(projectId) {
				uni.navigateTo({
					url: `../detail/detail?id=${projectId}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ordershowhome {
		padding: $uni-padding-30;
		background: url(https://cdn.colourfulchina.com/nwsh/static/images/orderbg.png) left top no-repeat;
		background-size: 100%;

		.orderstatusMsgBox {
			color: $uni-text-color-inverse;

			.orderstatus-time {
				font-size: $uni-font-size-40;
				padding-left: $uni-padding-30;

				text {
					display: block;
					font-size: $uni-font-size-lg;
					padding-top: $uni-padding-20;
					padding-bottom: $uni-padding-20;
				}
			}

			.orderstatus-icon {
				text {
					display: block;
					margin: 0 auto;
					background: url(https://cdn.colourfulchina.com/nwsh/static/icons/ordercar.png) left center no-repeat;
					background-size: 150rpx;
					width: 200rpx;
					height: 120rpx;
				}
			}
		}
		.titleSize{
				font-size:24rpx;
			}
		.logMsglistBox {
			padding: $uni-padding-30;
			margin: 0;
			margin-top: $uni-margin-30;
			line-height: 38rpx;

			.orderMsglistShow {
				margin-bottom: $uni-margin-30;
				border-bottom: solid 1rpx $uni-border-color;
				padding-bottom: $uni-padding-30;

				.tagsMsg {
					color: #317EEF;
				}

				.tagsTime {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					padding-top: $uni-padding-10;
				}

				.contacts {
					color: $uni-text-color;
					padding-bottom: $uni-padding-10;
				}

				.address {
					color: $uni-text-color;
				}
			}

			.orderMsglistShow:first-child {
				padding-left: 90rpx;
				background: url(https://cdn.colourfulchina.com/nwsh/static/icons/orderstatus.png) left center no-repeat;
				background-size: 70rpx;
			}

			.orderMsglistShow:last-child {
				padding-left: 90rpx;
				background: url(https://cdn.colourfulchina.com/nwsh/static/icons/ordervist.png) left center no-repeat;
				background-size: 70rpx;
				border-bottom: none;
				padding-bottom: 0;
				margin-bottom: 0;
			}
		}

		.orderMsglistBox:last-child {
			padding-bottom: none;
		}

		.orderMsgshowBox {
			margin: $uni-margin-30 0;

			.orderMsgBox {
				display: flex;
				flex-wrap: wrap;
			}

			.orderMsgTime {
				color: $uni-text-color-grey;
				line-height: 52rpx;
				padding-bottom: $uni-padding-10;

				.orderchannel {
					color: $uni-text-color-them;
				}
			}

			.orderMsgAbout {
				.orderImg {
					width: 140rpx;
				}

				.orerName {
					flex: 1;
					padding: 0 $uni-padding-20;

					.orerName-title {
						padding-bottom: $uni-padding-10;
					}

					.orerName-tip {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
				}

				.orderNumber {
					width: 120rpx;
					text-align: right;
				}
			}

			.orderStatus {
				text-align: right;
				padding-top: $uni-padding-10;
				padding-bottom: $uni-padding-20;

				text {
					display: inline-block;
					border: solid 1rpx $uni-bg-color-them;
					color: $uni-text-color-them;
					padding: 0 $uni-padding-20;
					border-radius: 19rpx;
					margin: 0 $uni-margin-10;
					height: 38rpx;
				}

				text:last-child {
					margin-right: 0;
				}
			}
		}

		.orderlistNumber {
			border-top: solid 1rpx $uni-border-color;
			margin-top: $uni-margin-30;
			padding-top: $uni-padding-30;

			.titleBox {
				font-size: $uni-font-size-lg;
				padding-bottom: $uni-padding-10;
			}

			.orderlistNumbershow {
				line-height: 52rpx;
			}
		}
	}
</style>
