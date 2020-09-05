<template>
	<view class="giftHome">
		<view class="membermsbBox">
		    <view class="memberTips Flex-sb">
		        <view class="aboutName">
		            <text class="giftNtitle">专属特权</text>
					<text class="giftTip">续超级会员，享超值好礼</text>
		        </view>
				<view class="iconMember"></view>
		    </view>
		</view>
		<view class="Flex-sb titleBox">
		    <text class="giftType">选择会员套餐</text>
		    <!-- <text class="gifttip">特权说明<text class="icon font_family icon-shuoming"></text></text> -->
		</view>
		<com-scroll :contentStye="{background: '#fff'}">
			<view class="Flex-fs memberMsgBox">
				<view class="memberMsgList" :class="membercurron == index? 'curron':'' " v-for="(item ,index) in membertype" :key="index" @tap="channgeType(index)">
					<view class="memberName">{{item.cardType}}</view>
					<view class="memberGift">{{item.salesTitle}}</view>
					<view class="memberMoney">¥<text>{{item.realPrice}}</text></view>
					<view class="memberMoney2">¥ {{item.markPrice}}</view>
					<text class="memberListTips">超值</text>
				</view>
			</view>
		</com-scroll>
		
		<view class="Flex-sb titleBox">
		    <text class="giftType">会员专享权益</text>
		</view>
		 <view class="productmsg">
			<view class="iconBox" style="margin-right:.3rem;">
				<text class="iconMsg"></text>
				<text class="productNameType">会员专享价<text>低于市场价不止5折</text></text>
			</view>

			<view class="iconBox" style="margin-left:.3rem;">
				<text class="iconMsg"></text>
				<text class="productNameType">爆款优先享<text>爆款商品提前抢</text></text>
			</view>
			<view style="clear:both; width:100%;"></view>
			<view class="iconBox">
				<text class="iconMsg"></text>
				<text class="productNameType">七天保价<text>购物享七天保价</text></text>
			</view>

			<view class="iconBox">
				<text class="iconMsg"></text>
				<text class="productNameType">免费福利<text>餐饮享5折优惠</text></text>
			</view>
			<view class="iconBox">
				<text class="iconMsg"></text>
				<text class="productNameType">专属客服<text>急速处理 贴心服务</text></text>
			</view>
		</view>
		<view class="Flex-sb titleBox">
		    <text class="giftType">年度会员6大福利</text>
		</view>
		<view class="membergoodList">
			<view class="membergoodListMsg" v-for="(item2,index) in membercouponList" :key="index" >     
				<view class="Flex-sb NumerMsg" v-if="item2.vipGiftType == 0">
					<view class="coupuonName">{{item2.content}} {{item2.times}}<text>次</text></view>
					<view class="couponMoney" ><text>超值</text> {{item2.realPrice ? item2.realPrice :'0'}}<text>元</text> </view>
				</view>
				<view class="Flex-sb NumerMsg" v-else>
					<view class="coupuonName">{{item2.content}}</view>
					<view class="couponMoney">送{{item2.realPrice ? item2.realPrice :'0'}}<text>元</text>*{{item2.times ? item2.times :'0'}}<text>张</text></view>
				</view>
			</view>
			<com-nodata v-if="membercouponList && membercouponList.length == 0"></com-nodata>
		</view>
		
		<view class="barHeight"></view>
		<view class="memberpayBox">
			<view class="memberpayBtn" @tap = "buyMemberType" >立即支付{{membertypeprice}}</view>
		</view>
	</view>
</template>

<script>
	import checkLoginFun from '../../common/util.js'
	let Base64 = require('js-base64').Base64
	export default {
		data() {
			return {
				title: '权益',
				membertype:[], //会员权益类型
				membercurron:0, //选择权益类型
				membercouponList:[], //会员配置的优惠券
				membertypeprice:[], //会员权益价格
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				preLeft: 0,
				wrapWidth: 0,
				indicateW: 25,
			}
		},
		onLoad() {
			this.getMemberTypeData()
			
		},
		mounted() {
			this.$nextTick(() => {
				let view = uni.createSelectorQuery().in(this).select(".memberMsgBox")
				view.boundingClientRect((obj) => {
					// console.log('scroll-----', obj)
					this.wrapWidth = obj.width;
				}).exec()
			})
		},
		methods: {
			//会员权益类型
			getMemberTypeData(){
				let params = {
					"channel":"NWSH"
				}
				this.$goodsApi.getMemberType(params).then(res => {
					this.membertype = res.result;
					this.membertypeprice = res.result[this.membercurron].realPrice
					this.getMemberCouponData(res.result[this.membercurron].id)
				});
			},
			channgeType(id){
				this.membercurron = id
				this.membertypeprice = this.membertype[this.membercurron].realPrice
				this.getMemberCouponData(this.membertype[this.membercurron].id)
			},
			scroll(e) {
				let detail = e.detail;
				let scrollDis = detail.scrollWidth - this.wrapWidth;
				let pre = detail.scrollLeft / (scrollDis * 2);
				this.preLeft = pre * 100 + '%';
			},
			//会员权益配置的优惠券
			getMemberCouponData(id){
				let that = this
				let params = id.toString()
				that.$memberApi.getSvipDataCoupon(params).then(res => {
					that.membercouponList = res.result
				})
			},
			//会员权益下单
			buyMemberType(){
					checkLoginFun.checkLogin(location.href,(value)=>{
						if(value){
							let acid = uni.getStorageSync("USERDATA").acid
								let params = {
									"acId":acid, 
									"acChannel":"NWSH",
									"vipCardId":this.membertype[this.membercurron].id
								}
							this.$orderApi.creMemberType(params).then(res => {
								if(1 === res.status && 0 === res.realMoney){
									uni.showModal({
									    title: '友情提示',
									    content: '您已领取免费会员权益，请勿重复领取',
									    success: function (res) {
									        if (res.confirm) {
									            console.log('用户点击确定');
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
									}else{
										let payobject = {
											"acId": res.acid,
											"amount": res.realMoney,
											"body": this.membertype[this.membercurron].cardType,
											"curcode": "CNY",
											"goodsName": this.membertype[this.membercurron].cardType,
											"mbId": uni.getStorageSync("USERDATA").mbid,
											"merchantId": 1585818018424,
											"orderId": res.id,
											"payMethod": 3,
											"paymentType": "会员权益单",
											"source": res.channel,
										}
										this.$orderApi.payMemberType(payobject).then(suc =>{
											window.location.href = suc.result.mwebUrl + '?channel='+Base64.encode('NWSH')+'&params='+ Base64.encode(encodeURIComponent(suc.result.params)) + '&stages=show'
										})
									}
								
							})
						}
					})
			},
			scrolltoupper(e) {
			},
			scrolltolower(e) {
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.giftHome {background: $uni-bg-color; padding-bottom:$uni-padding-30;
		.membermsbBox{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/blackground@2x.png) left top no-repeat; background-size: 100%; height: 272rpx;
			.memberTips{width: 80%; margin: 0 auto; padding:$uni-padding-30 $uni-padding-10;
				.aboutName{flex: 1; 
					.giftNtitle{font-size:$uni-font-size-40; display:block;color: #ffe197; padding-bottom:$uni-padding-20;}
					.giftTip{color: $uni-text-color-inverse;}
					}
				.iconMember{width:100rpx; height:200rpx; background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/img@2x.png) 50% no-repeat; background-size: 100%;}
			}
		}
		.titleBox{margin: 0 $uni-margin-30; padding: 0;
			.giftType{font-size:$uni-font-size-lg; flex: 1;}
			.gifttip{padding-top:$uni-padding-10; vertical-align: middle; margin-bottom: 3px; margin-left: 3px;}
		}
		.memberMsgBox{margin:0 $uni-margin-30 $uni-margin-30 $uni-margin-30; padding-top:$uni-padding-20; white-space: nowrap; width:92%; box-sizing:border-box; overflow-y: hidden;
			.memberMsgList{border: solid 1rpx #FAFAFA; position: relative; margin: 0 $uni-margin-10; text-align: center; border-radius: $uni-border-radius-base; padding: $uni-padding-20 0; background: #FAFAFA; display: inline-block; color:#442403; width:300rpx;
			.memberName{font-weight: bold; cursor: pointer; font-size:$uni-font-size-lg;}
			.memberGift{line-height: 42rpx; font-size:$uni-font-size-sm; padding: $uni-padding-10; white-space: nowrap; }
			.memberMoney{color: #FF4926;text{font-size: $uni-font-size-40; margin-left:$uni-margin-10;}}
			.memberMoney2{padding-top: $uni-padding-20; color: $uni-text-color-grey; text-decoration: line-through;}
			.memberListTips{display: block; width: 100rpx; height:68rpx; line-height:68rpx; text-align: left; padding-left:$uni-padding-10; position: absolute; left: 0; top: 0; background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/memberListTips.png) left top no-repeat; background-size: 100%; color: #fff; font-size:$uni-font-size-sm;}
		}
			.memberMsgList.curron{border: solid 1rpx #FF974C; background: rgba(255, 252, 211, 0.6);}
			.memberMsgList:first-child{margin-left:none;}
		}
		.scroll-indicate {
			width: 50rpx;
			height: 6rpx;
			position: absolute;
			bottom: 10rpx;
			left: 50%;
			border-radius: 3rpx;
			transform: translateX(-50%);
			background:rgba(0,0,0,0.15);
			.indicate {
				width: 50%;
				height: 100%;
				border-radius: 3rpx;
				position: relative;
				transition: all 0.1s;
				background: #EB2613;
			}
			
			
		}
		.productmsg{margin: $uni-padding-30; display: flex; justify-content:center;flex-direction: row; flex-wrap: wrap;border: solid 1rpx #FAFAFA;  background:#FAFAFA; border-radius: $uni-border-radius-base; padding-bottom:$uni-padding-20;
			.iconBox{width: 33.3%; margin: $uni-margin-20 0; text-align: center;
				.iconMsg{width:96rpx; height: 96rpx; display: block; margin: 0 auto;}
			}
			.iconBox:nth-of-type(1) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-hotel.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(2) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-food.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(4) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-product.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(5) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-tea.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(6) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-sport.png) center no-repeat; background-size: 100%;}
			.productNameType{padding-top:$uni-padding-10; text{font-weight: normal;display: block; white-space: nowrap; font-size:$uni-font-size-sm; padding-top:$uni-padding-10; color:$uni-text-color-grey;}
			}
		}
		.membergoodList{ padding: 0 $uni-padding-30;
			.NumerMsg{
				.coupuonName{padding-left: $uni-padding-20; font-size: $uni-font-size-lg;}
				.couponMoney{padding-right: $uni-padding-30; font-size:38rpx;
					text{font-size: $uni-font-size-lg; margin:0 $uni-margin-10;}
				}
			}			
		}
		.membergoodListMsg{background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/01@2x.png) left top no-repeat; height: 144rpx; line-height: 144rpx; background-size: 100%; margin: $uni-margin-20 0; padding-left:120rpx; }
		.membergoodListMsg:nth-of-type(1){background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/01@2x.png) left top no-repeat; background-size: 100%;}
		.membergoodListMsg:nth-of-type(2){background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/02@2x.png) left top no-repeat; background-size: 100%;}
		.membergoodListMsg:nth-of-type(3){background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/03@2x.png) left top no-repeat; background-size: 100%;}
		.membergoodListMsg:nth-of-type(4){background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/04@2x.png) left top no-repeat; background-size: 100%;}
		.membergoodListMsg:nth-of-type(5){background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/05@2x.png) left top no-repeat; background-size: 100%;}
		.membergoodListMsg:nth-of-type(6){background:url(https://cdn.colourfulchina.com/nwsh/static/images/gift/06@2x.png) left top no-repeat; background-size: 100%;}
		.barHeight{height: 130rpx;}
		.memberpayBox{position: fixed; width: 100%; left:0; bottom:91rpx; height:120rpx; background: $uni-bg-color; border-bottom:solid 1rpx rgba(0,0,0,.2);  box-shadow: inset 0rpx 15rpx 10rpx -15rpx  rgba(0,0,0,.1);
			.memberpayBtn{width: 80%; margin:0 auto; background: linear-gradient(to left, #fd1708, #f56817); height:80rpx; margin-top:20rpx; line-height: 80rpx; border-radius:40rpx; text-align: center; color:$uni-text-color-inverse; font-size:$uni-font-size-lg;}
		}
		
	}
</style>
