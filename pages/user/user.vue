<template>
	<view class="userhome u-skeleton">
		<view class="topBg">
			<view class="Flex-sb">
				<view class="loginMsgBox Flex-fs">
					<image class="u-skeleton-circle"  v-if="isLogin" src="https://cdn.colourfulchina.com/nwsh/static/images/user@2x.png"></image>
					<image class="u-skeleton-circle" v-else src="https://cdn.colourfulchina.com/nwsh/static/images/user@2x.png"  @tap="goLogin"></image>
					<view class="logintip" v-if="isLogin">
						<view class="">{{userObject.mbName}}</view>
						{{userObject.mobile}}
					</view>
					<view class="logintip" v-else  @tap="goLogin">
						<view class="">登录即享</view>
						免费申请额度，最高可得5万额度
					</view>
					
				</view>
				<view class="loginBtnBox">
					<view class="loginout" @tap="loginOut"  v-if="isLogin">退出</view>
					<!-- <view class="talknumBox">
						<view class="angleSign">2</view>
						<view class="icon font_family icon-xiaoxi"></view>
					</view> -->
				</view>
			</view>
			<view class="Flex-cen otherMsgBox">
				<!-- <view class="baseBox">
					<view>15</view>
					我的收藏
				</view>
				<view class="baseBox">
					<view>30</view>
					我的浏览
				</view>
				<view class="baseBox">
					<view>{{couponsCounts}}</view>
					优惠劵
				</view> -->
			</view>
		</view>
		<view class="Flex-sb cardBox u-skeleton-rect" @tap="goCardApply">
			<view class="cardName">
				<view>极融卡</view>
				开卡可领5万额度
			</view>
			<view class="cardbtnBox">
				<view>立即开通<text class="icon font_family icon-tiaozhuan"></text></view>
			</view>
		</view>
		<!-- <view class="Flex-box u-skeleton-rect">
			<view class="Flex-sb titleBox">
				<view class="titleName">我的订单</view>
				<view class="moreshow" @tap="goOrderlist(0)">全部订单 <text class="icon font_family icon-tiaozhuan"></text></view>

			</view>
			<view class="Flex-sb orderTypeBox">
				<view class="ordertypeMsg" @tap="goOrderlist(1)"><text class="icon font_family icon-daifukuan"></text>待付款<view
					 class="angleSign" v-if="unpay > 0">{{unpay}}</view>
				</view>
				<view class="ordertypeMsg" @tap="goOrderlist(2)"><text class="icon font_family icon-daifahuo"></text>已付款<view class="angleSign"
					 v-if="pay > 0">{{pay}}</view>
				</view>
				<view class="ordertypeMsg" @tap="goOrderlist(2)"><text class="icon font_family icon-daishouhuo"></text>使用中<view
					 class="angleSign" v-if="using > 0">{{using}}</view>
				</view>
				<view class="ordertypeMsg" @tap="goOrderlist(2)"><text class="icon font_family icon-lipintubiao"></text>已取消<view
					 class="angleSign" v-if="cancel > 0">{{cancel}}</view>
				</view>s
				<view class="ordertypeMsg" @tap="goOrderlist(3)"><text class="icon font_family icon-tuikuan"></text>售后/退款</view>
			</view>
		</view> -->

		<view class="Flex-box msgListType">
			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-wodequanyi"></view>
				<view class="Flex-sb msgListshow" @tap="goGiftlist">会员权益
					<view class="icon font_family icon-tiaozhuan"></view>
				</view>

			</view>
			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-dingdan"></view>
				<view class="Flex-sb msgListshow" @tap="goOrderlist(0)">我的订单
					<view class="icon font_family icon-tiaozhuan"></view>
				</view>
			</view>
			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-youhuiquan"></view>
				<view class="Flex-sb msgListshow" @tap="goCouponlist(0)">我的优惠券
					<view class="icon font_family icon-tiaozhuan"></view>
				</view>
			</view>
			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-shouhuodizhi"></view>
				<view class="Flex-sb msgListshow" @tap="goAddresslist">我的收获地址
					<view class="icon font_family icon-tiaozhuan"></view>
				</view>
			</view>
			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-yinhangka"></view>
				<view class="Flex-sb msgListshow" @tap="goBankcardlist">银行卡
					<view class="icon font_family icon-tiaozhuan"></view>
				</view>
			</view>

			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-wodeshoucang"></view>
				<view class="Flex-sb msgListshow" @tap="goCollect">我的收藏
					<view class="icon font_family icon-tiaozhuan"></view>
				</view>
			</view>
			<!-- <view class="Flex-fs msgListBox">
				<view class="icon font_family icon-anquan"></view>
				<view class="msgListshow">隐私与安全</view>
			</view>
			<view class="Flex-fs msgListBox">
				<view class="icon font_family icon-shezhi"></view>
				<view class="msgListshow">设置</view>
			</view> -->


		</view>

		<!--引用骨架屏组件-->
		<!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->

	</view>
</template>

<script>
	import checkLoginFun from '../../common/util.js'
	export default {
		data() {
			return {
				title: '个人中心',
				loading: true, // 是否显示骨架屏组件
				couponsCounts: 0, //用户券总数
				cpnVoucherList: [], //抵用券
				unpay: 0,
				pay: 0,
				cancel: 0,
				back: 0,
				using: 0,
				orderList: [],
				userObject: {},
				isLogin: false,
				acChannel: '',
			}
		},
		onLoad() {
			let userObjectN = uni.getStorageSync('USERDATA')
			if(userObjectN){
				this.userObject = userObjectN
				this.acChannel = userObjectN.acChannel;
				this.isLogin =true;
				this.getMemCpnVoucherInfoList();
			}
		},
		onShow(){
			
		},

		methods: {
			//登录
			goLogin() {
				uni.navigateTo({
					url: "/pages/auth/login?backurl="+location.href
				});
			},
			//我的权益
			goGiftlist() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: "/pages/gift/show"
						});
					}
				})
			},
			//收货地址管理
			goAddresslist() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: "/pages/user/setting/addresslist"
						});
					}
				})
			},
			//银行卡管理
			goBankcardlist() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: "/pages/user/bankcard/bankcard"
						});
					}
				})
			},
			//订单管理
			goOrderlist(current) {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: "/pages/order/order?current=" + current+"&acChannel="+this.acChannel,
						});
					}
				})
				
			},
			//开通极融卡
			goCardApply() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: '/pages/card-apply/cardapply'
						});
					}
				})
			},
			//收藏夹
			goCollect() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: '/pages/user/setting/collect'
						});
					}
				})
			},
			getOrderStaus() {
				var params = {
					acChannel: this.$data.acChannel,
					statusList: [0, 1, 2, 3, 4, 5, 7, 8, 9]
				};
				// 	this.loading = false;订单状态：0未支付，1已支付成功，2支付待确认，3已取消，4退款中，5已退款，6已预约，7已使用，8已过期,9已支付超时

				this.$orderApi.frontendSalesOrderList(params).then(res => {
					if (res && res.ok === 0) {
						var orderList = res.obj.list;
						this.$data.orderList = orderList;
						var unpay = 0;
						var pay = 0;
						var cancel = 0;
						var back = 0;
						var using = 0;
						orderList.forEach(function(o) {
							if (o.status === 0) {
								unpay = unpay + 1;
							}
							if (o.status === 1 || o.status === 2) {
								pay = pay + 1;
							}
							// if (o.status === 3 || o.status === 9 || o.status === 8 || o.status === 7) {
							// 	cancel = cancel + 1;
							// }
							if (o.status === 4 || o.status === 5) {
								back = back + 1;
							}
							if (o.status === 6) {
								using = using + 1;
							}
						});
						this.unpay = unpay;
						this.pay = pay;
						// this.cancel = cancel;
						this.back = back;
						this.using = using;
					}
				});
			},
			//我的优惠券
			goCouponlist() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: "/pages/user/coupon/coupon",
						
						});
					}
				})
			},
			//获取用户优惠券列表
			getMemCpnVoucherInfoList() {
				if (!this.userObject.acid) {
					return;
				}
				let params = {
					acId: this.userObject.acid
				}
				this.$couponApi.getMemCpnVoucherList(params).then(res => {
					if (res && res.result) {
						this.couponsCounts = res.result.length;
						this.cpnVoucherList = res.result;
						this.$store.commit("getCouponsList", this.cpnVoucherList)
						console.log(this.cpnVoucherList)
					}
				});
			},
			//退出登录
			loginOut(){
				uni.clearStorageSync()
				this.$store.commit("getUserInfo",'')
				this.isLogin = false
			}
		}
	}
</script>


<style lang="scss" scoped>
	.userhome {
		.topBg {
			background: $uni-bg-color-them url(https://cdn.colourfulchina.com/nwsh/static/images/user/usertopbg.png) right top no-repeat;
			background-size: 200rpx;
			padding-top: $uni-padding-30;
			position: relative;

			.loginMsgBox {
				flex: 1;
				padding-left: $uni-padding-30;
				color: $uni-text-color-inverse;

				image {
					width: 92rpx;
					height: 92rpx;
					border-radius: $uni-border-radius-circle;
				}

				.logintip {
					padding-left: $uni-padding-20;
					font-size: $uni-font-size-base;
					line-height: 52rpx;

					view {
						font-size: $uni-font-size-lg;
					}
				}
			}

			.loginBtnBox {
				width: 166rpx;
				padding-right: $uni-padding-30;
				text-align: right;
				.loginout{color: $uni-text-color-inverse;}
				button {
					background: $uni-bg-color;
					height: 52rpx;
					line-height: 52rpx;
					color: $uni-text-color-them;
					font-weight: bold;
					border-radius: 26rpx;
				}

				.talknumBox {
					display: inline-block;
					width: 48rpx;
					height: 48rpx;
					position: relative;

					.icon {
						color: $uni-text-color-inverse;
						font-size: 50rpx;
					}

					.angleSign {
						width: 38rpx;
						height: 38rpx;
						text-align: center;
						line-height: 32rpx;
						border-radius: $uni-border-radius-circle;
						background: $uni-bg-color;
						position: absolute;
						top: -15rpx;
						right: -15rpx;
						border: solid .01rpx $uni-text-color-them;
						color: $uni-text-color-them;
						font-size: $uni-font-size-sm;
					}
				}
			}
		}

		.otherMsgBox {
			text-align: center;
			color: $uni-text-color-inverse;
			height: 30rpx;

			.baseBox {
				margin: $uni-margin-30;
				padding: $uni-padding-20;

				view {
					font-size: $uni-font-size-40;
					padding: $uni-padding-10 0;
				}
			}
		}

		// .cardBox{background-image: linear-gradient(to right, #373976, #222853); height:100rpx; margin:0 $uni-margin-30; border-radius:$uni-border-radius-lg; position: relative;}
		.cardBox {
			background: url(https://cdn.colourfulchina.com/nwsh/static/images/user/userbg.png) left bottom no-repeat;
			background-size: 100%;
			overflow: hidden;
			height: 154rpx;
			margin-bottom: $uni-margin-30;
			position: relative;
			padding: 0 $uni-padding-30;
			color: $uni-text-color-card;

			.cardName {
				padding-left: $uni-padding-30;
				font-size: $uni-font-size-sm;
				line-height: 50rpx;

				view {
					font-size: $uni-font-size-lg;
					padding-left: 50rpx;
					background: url(https://cdn.colourfulchina.com/nwsh/static/images/user/card.png) left center no-repeat;
					background-size: 40rpx;
				}
			}

			.cardbtnBox {
				padding-right: $uni-padding-30;
				.icon{font-size: $uni-font-size-sm; margin-left:$uni-margin-10;}
			}
		}

		.titleBox {
			color: $uni-text-color;
			background: $uni-bg-color-grey;
			padding: $uni-padding-20 $uni-padding-20;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-sm;

			.titleName {
				font-size: $uni-font-size-base;
				font-weight: bold;
			}

			.moreshow {
				.icon {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					margin-left: $uni-margin-10;
				}
			}
		}

		.orderTypeBox {
			padding-top: $uni-padding-20;
			position: relative;

			.ordertypeMsg {
				margin: $uni-margin-10 $uni-margin-20;
				word-spacing: nowrap;
				text-align: center;
				font-size: $uni-font-size-sm;
				position: relative;
				color: $uni-text-color-grey;

				.icon {
					color: $uni-text-color-them;
					display: block;
					font-size: 50rpx;
					padding-bottom: $uni-padding-10;
				}

				.angleSign {
					width: 38rpx;
					height: 38rpx;
					text-align: center;
					line-height: 32rpx;
					border-radius: $uni-border-radius-circle;
					background: $uni-bg-color;
					position: absolute;
					top: -12rpx;
					right: -12rpx;
					border: solid .01rpx $uni-text-color-them;
					color: $uni-text-color-them;
					font-size: $uni-font-size-sm;
				}
			}
		}

		.msgListType {
			padding-right: 0;
			padding-top: $uni-padding-10;
			padding-bottom: $uni-padding-10;
		}

		.msgListBox {padding: 8rpx 0 8rpx $uni-padding-10;
			.icon {
				color: $uni-text-color-them;
				font-size: 50rpx;
				width: 70rpx;
				
			}

			.msgListshow {
				flex: 1;
				border-bottom: solid .01rpx $uni-border-color;
				padding: $uni-padding-20 0 $uni-padding-30 0;

				.icon {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					text-align: center;
				}
			}
		}

		.msgListBox:last-child {
			.msgListshow {
				border-bottom: none;
			}
		}

	}
</style>
