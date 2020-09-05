<template>
	<com-layout :showNav="false">
		<view class="order-confirm">
			<!-- 没地址 -->
			<view class="address wrap" v-show="addressCount===0">
				<view class="content Flex-sb">
					<view class="icon font_family icon-dingwei"></view>
					<text class="text" @tap="goAddAddress()">请添加收货地址</text>
					<u-icon class="flag" name="arrow-right" color="#909399" size="28"></u-icon>
				</view>
			</view>
			<!-- 有地址 -->
			<view class="address wrap" v-if="addressCount>0" @click="goSelectAddress">
				<view class="content Flex-sb">
					<view class="icon font_family icon-dingwei"></view>
					<view class="text">
						<text class="name">{{address.fullname}}</text>
						<text class="phone">{{address.mobile.substring(0,3)}}****{{address.mobile.substring(7)}}</text>
					</view>
					<u-icon class="flag" name="arrow-right" color="#909399" size="28"></u-icon>
				</view>
				<view class="detail">
					<text>地址：{{address.province}} {{address.city}} {{address.district}}  {{address.fullAddress}} </text>
				</view>
			</view>

			<view class="product-wrap wrap">
				<view class="Flex-sb">
					<image class="img" :src="projectUrlList" mode="widthFix"></image>
					<view class="des">
						<text class="two-ellipsis title">{{goodsInfo.projectName}}</text>
						<view class="price Flex-sb">
							<text class="flag">¥</text>
							<text class="num">{{goodsInfo.discountPrice}}</text>
							<u-number-box :min="1" :max="1" v-model="pNum"></u-number-box>
						</view>
					</view>
				</view>
				<!-- <view class="">
					<textarea value="" placeholder="留言选填，我们会尽可能满足您的需求" auto-height/>
				</view> -->
			</view>
			
			<view class="wrap list-cell">
				<view class="cell Flex-sb">
					<text class="title">优惠券</text>
					<text v-show="couponsCounts==0">无可用</text>
					<text v-show="couponsCounts>0 && !cpnVoucherId"  @click="goSelectCoupon"><text style="color: #EB2613; margin-right: 5rpx; font-weight: bold;">{{couponsCounts}}</text>张可用</text>
					<text v-show="couponsCounts>0 && cpnVoucherId!=null  && cpnVoucherId" style="color: #EB2613; margin-right: 10rpx;" @click="goSelectCoupon">-&nbsp;{{cpnVoucher.worth}}元</text>
					<u-icon v-show="couponsCounts>0 " class="flag" name="arrow-right" color="#909399" size="28"></u-icon>
				</view>
				<!-- <view class="cell Flex-sb">
					<text class="title">运费</text>
					<text>包邮</text>
				</view>
				<view class="cell Flex-sb">
					<text class="title">开具发票</text>
					<u-icon class="flag" name="arrow-right" color="#909399" size="28"></u-icon>
				</view> -->
			</view>
		</view>
		<com-bottom rText="提交订单" @confirm="commitOrder">
			<template v-slot:left>
				<view class="total-num">
					<text class="num">共1件</text>
					<text class="money">合计：¥{{sumPrice}}</text>
				</view>
			</template>
		</com-bottom>
	</com-layout>
</template>

<script>
	import checkLoginFun from '../../common/util.js'
	import {mapState} from 'vuex'
	let Base64 = require('js-base64').Base64;
	export default {
		data() {
			return {
				pNum: 1,
				addressList:[],
				address:{},
				addressCount:0,
				cpnVoucherList:[],
				cpnVoucherId:"",
				couponsCounts:0,
				productId:0,
				goodsInfo:{},
				discountPrice:0,
				sumPrice:0,
				cpnVoucher:{},
				addressId:0,
				orderSource:'',// 订单来源，用来区分 APP/wap  &&   WECHAT   微信内或微信外
				projectUrlList:'',
			};
		},
		onLoad(data){
			let that = this
			that.$data.productId = data.productId;
			if(!that.$data.productId || that.$data.productId==0){
				that.$data.productId = that.myProductId;
			}
			this.$data.addressId = data.addressId;
			if(!this.$data.addressId){
				this.$data.addressId = that.myaddressId;
			}
			this.$data.cpnVoucherId = data.cpnVourcherId;
			if(!this.$data.cpnVoucherId){
				this.$data.cpnVoucherId = that.myCouponsId;
			}
			let userData = uni.getStorageSync("USERDATA");
			if(userData){
			if(!this.$data.addressId || this.$data.addressId<0){
			    that.getConsigneeInfoList(userData.acid)
			}
			else{
				that.getConsigneeInfo(this.addressId);
			}
			let ua = window.navigator.userAgent.toLowerCase()
			  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				  that.orderSource = "NWSH_WECHAT"
				  // return true
			  }else{
				  // 2.2微信外
				  that.orderSource = "NWSH_APP"
				  // return false
			  }
			//获取商品信息
			that.getGoodsInfoByGoodsId();
			}
		 },
		 computed: {
		 	...mapState(['myaddressId','myProductId','myCouponsId'])  
		 }, 
		methods: {
			//获取用户优惠券列表
			getMemCpnVoucherInfoList() {
				let params = {
					acId: uni.getStorageSync("USERDATA").acid
				}
				this.$couponApi.getMemCpnVoucherList(params).then(res => {
					if (res && res.result) {
						this.couponsCounts = res.result.length;
						this.cpnVoucherList = res.result;
						console.log(this.cpnVoucherList);
						if(this.$data.cpnVoucherId){
							this.cpnVoucherList.forEach((i, index)=>{
								if(i.voucherNum ==this.$data.cpnVoucherId ){
								this.cpnVoucher = i;
								this.sumPrice = this.sumPrice-this.cpnVoucher.worth;
								if(this.sumPrice<0){
									this.sumPrice=0;
								}
							}
							})
						}
					}
				});
			},
			//获取商品详情
			getGoodsInfoByGoodsId(){
				let params={
					acChannel: 'NWSH',
					projectId:this.productId
				}
				this.$goodsApi.getGoodsDetail(params).then(res => {
					if(res.ok == 0 && JSON.stringify(res.obj) != "{}"){
						this.goodsInfo = res.obj;
						this.projectUrlList = res.obj.projectUrlList?res.obj.projectUrlList[0]:"https://cdn.colourfulchina.com/nwsh/static/images/default.png";
						this.sumPrice=this.goodsInfo.discountPrice*this.pNum;
						//获取用户优惠券
						this.getMemCpnVoucherInfoList();
					}
				});
			},
			sumPriceMethod(){
				this.sumPrice=this.goodsInfo.discountPrice*this.pNum;
			},
			//获取用户收货地址列表
			getConsigneeInfoList(acid){
				this.$memberApi.getConsigneeInfoList(acid+"").then(res => {				
					if(res && res.result && res.code === 100){
						console.log("asdasdasdsad")
						this.addressCount = res.result.length;
						if(this.addressCount>0){
							this.addressList = res.result
							this.addressId = this.addressList[0].id;
							this.address = this.addressList[0];
						}
					}
				});
			},
			//获取用户收货地址
			getConsigneeInfo(addreId){
				this.$memberApi.getConsigneeInfo(addreId).then(res => {
					if(res && res.result && res.code === 100){
						this.addressCount=1;
						this.address = res.result;
					}
				});
			},
			//去添加地址
			goAddAddress(){
				this.$store.commit("getMyProductId",this.productId);
				this.$store.commit("getMyaddressId",this.addressId);
				this.$store.commit("getMyCouponsId",this.cpnVoucherId);
				uni.navigateTo({
					url:'/pages/user/setting/addressnew?backUrl=/pages/orderConfirm/orderConfirm'
				})
			},
			goSelectAddress(){
				this.$store.commit("getMyProductId",this.productId);
				this.$store.commit("getMyaddressId",this.addressId);
				this.$store.commit("getMyCouponsId",this.cpnVoucherId);
				uni.navigateTo({
					url:'/pages/user/setting/selectadresslist?backUrl=/pages/orderConfirm/orderConfirm'
				})
			},
			//选择优惠券
			goSelectCoupon() {
				this.$store.commit("getMyProductId",this.productId);
				this.$store.commit("getMyaddressId",this.addressId);
				this.$store.commit("getMyCouponsId",this.cpnVoucherId);
				uni.navigateTo({
					url: '/pages/selectCoupon/selectCoupon?productId='+this.productId+"&addressId="+this.addressId+"&backUrl=/pages/orderConfirm/orderConfirm",
				})
			},
			//提交订单
			commitOrder(){
				checkLoginFun.checkLogin(location.href)
				let params = {
						"acId":uni.getStorageSync("USERDATA").acid, 
						"acChannel":"NWSH",
						"realPrice": this.goodsInfo.discountPrice,
						"sourceId": null,
						"orderSource":this.orderSource,
						"uid": null,
						"projectId": this.productId,
						"couponsType":1,
						"couponsNum":!this.cpnVoucherId?null:this.cpnVoucherId
				}
				this.$orderApi.createOrder(params).then(res => {
					console.log(res)
					if(res.ok===-1  ){
						uni.showModal({
						    title: '友情提示',
						    content: res.msg,
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
						}else{
							//获取订单信息
							let getOrderDetail = {
								"acChannel": "NWSH",
								"salesOrderId": res.obj.salesOrderId
							}
							this.$orderApi.salesOrderDetail(getOrderDetail).then(suc =>{
								if(suc.ok===-1){
									uni.showModal({
									    title: '友情提示',
									    content: suc.msg,
									    success: function (res) {
									        if (res.confirm) {
									            console.log('用户点击确定');
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
								}else{
									//去支付
									let orderDetail = suc.obj;
									let payobject = {
										"acId": orderDetail.acid,
										"amount": orderDetail.salePrice,
										"body": orderDetail.projectName,
										"curcode": "CNY",
										"goodsName": orderDetail.projectName,
										"mbId": orderDetail.mbid,
										"merchantId": 1594693697379,
										"orderId": orderDetail.salesOrderId,
										"payMethod": 3,
										"paymentType": "会员权益单",
										"source": "NWSH",
									}
									this.$orderApi.payMemberType(payobject).then(suc =>{
										window.location.href = suc.result.mwebUrl + '?channel='+Base64.encode('NWSH')+'&params='+ Base64.encode(encodeURIComponent(suc.result.params)) + '&stages=show'
									})
								}
							});
							
						}
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.total-num {
		width: 375rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start; padding-left:$uni-padding-30;
		text-align: left;
		.num {
			font-size: $uni-font-size-base;
			color: #878787;
			margin-right: $uni-margin-20;
		}
		.money {
			font-size: $uni-font-size-lg;
			color: #EB2512;;
		}
	}
	.order-confirm {
		padding: $uni-padding-30;

		.wrap {
			background: $uni-bg-color;
			margin-bottom: $uni-margin-30;
			border-radius: 10rpx;
		}

		.address {
			padding: $uni-padding-30 $uni-padding-20;

			.content {
				font-size: 34rpx;
				color: #606266;
				.icon{color: $uni-text-color-them; font-size:$uni-font-size-40; padding-right:$uni-padding-10;}
				.img {
					width: 28rpx;
					height: 32rpx;
					margin-right: $uni-margin-20;
				}

				.text {
					flex: 1 1 auto;

					.name {}

					.phone {
						font-weight: bold;
						margin-left: $uni-margin-20;
					}
				}
			}

			.detail {
				color: #85858E;
				padding: 0 30rpx 0 46rpx;
				margin-top: $uni-margin-20;
			}
		}

		.product-wrap {
			padding: $uni-padding-30;
			.img {
				width: 180rpx;
				flex: 0 0 auto;
				margin-right: $uni-margin-20;
			}

			.des {
				flex: 1 1 auto;
				font-size: 26rpx;
				.title {
					font-size: $uni-font-size-lg;
				}
				.price {
					margin-top: $uni-margin-20;
					color: $uni-color-price;
					align-items: center;

					.flag {
						// font-size: 26rpx;
					}

					.num {
						flex: 1;
						font-size: 36rpx;
					}
				}
			}
		}
		.list-cell {
			font-size: $uni-font-size-base;
			color: $uni-font-color-goods;
			padding: 0 $uni-padding-20;
			.cell {
				border-bottom: 1rpx solid #E3E3E3;
				padding: $uni-padding-30 0;
				&:last-child {
					border: none;
				}
				.title {
					font-weight: bold;
					flex: 1 1 auto;
				}
			}
		}
	}
</style>
