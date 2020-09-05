<template>
	<view class="giftshowHome">
		<view class="memberMsgBox">
			<view class="Flex-fs">
				<image class="u-skeleton-circle photo" src="https://cdn.colourfulchina.com/nwsh/static/images/user@2x.png"></image>
				<view class="loginMsgBox">
					<view>{{userObject.mobile}}</view>
					<view class="memberTip">累积节省 1200 元</view>
				</view>
			</view>
			<view class="memberDateBox">
				<view class="membericon"><image src="https://cdn.colourfulchina.com/nwsh/static/images/memberpic.png" mode="widthFix" style="width: 310rpx;"></image></view>
				<view class="Flex-sb membergoBtnBox">
					<view>2020-07-09到期</view>
					<!-- <u-button>立即续费</u-button> -->
				</view>
			</view>
		</view>
		<view style="height: 160rpx;">
			
		</view>
		<view class="Flex-fs titleBox">
		    <text class="giftType">会员专享权益</text>
		</view>
		<scroll-view class="menus" scroll-x="true" @scroll="scroll" scroll-left="120">
			<view class="Flex-fs productmsg">
				<view class="iconBox">
					<text class="iconMsg"></text>
					<text class="productNameType">会员专享价<text>低于市场价不止5折</text></text>
				</view>
				<view class="iconBox">
					<text class="iconMsg"></text>
					<text class="productNameType">爆款优先享<text>爆款商品提前抢</text></text>
				</view>
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
		</scroll-view>
		
		<view class="memberConBox">
			<view class="Flex-fs titleBox">
			    <text class="giftType">会员专属优惠券</text>
			</view>
			<view class="Flex-fs conponListBox">
				<view class="Flex-sb conponListMsg">
					<view class="couponMsg">¥<text>20</text> x2<view class="coupontype">自助餐抵用券</view></view>
					<view class="couponstatus">立即领取</view>
				</view>
				
				<view class="Flex-sb conponListMsg">
					<view class="couponMsg">¥<text>20</text> x2<view class="coupontype">自助餐抵用券</view></view>
					<view class="couponstatus">立即领取</view>
				</view>
				
				
			</view>
		</view>
		
		
		<view class="grey-bg-content">
			 <!-- <com-sticky :scrollTop="scrollTop" @isFixed="tabFixed">
			 		<com-tabs :list="typeList" @tabChange="tabChange" :tabWrapStyle="{padding: '0 30rpx', background: tabBg}"></com-tabs>
			 </com-sticky> -->
			 
			 <com-waterfall :list="objectList">
				 <template v-slot:left="{item, index}">
					 <goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
				 </template>
				 <template v-slot:right="{item, index}">
					 <goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
				 </template>
			 </com-waterfall>
		</view>
		
	</view>
</template>

<script>
	let Base64 = require('js-base64').Base64;
	import goodsItem from '../../components/goods-item.vue'
	export default {
		data() {
			return {
				title: '会员权益',
				objectList:[], //商品列表
				userObject:{}, //用户信息
				typeList: [{"title": '猜你喜欢'},{"title":'化妆品'},{"title":'手机'},{"title":'电脑'}],
				tabBg:'',//tab样式
				scrollTop: 0,
			}
		},
		onLoad() {
			this.getObjectData()
			this.userObject = uni.getStorageSync("USERDATA")
		},
		components:{
			goodsItem
		},
		methods: {
			//获取商品信息
			getObjectData(){
				let params={
					"acChannel":"NWSH",
					"sticket":""
				}
				this.$goodsApi.getGoodsList(params).then(res => {
					this.objectList = res.obj.list;
				});
			},
			//详情
			goodsClick(item) {
				uni.navigateTo({
					url: `../detail/detail?id=${item.projectId}`
				})
			},
			tabFixed(value) {
				if (value) {
					this.tabBg = '#f8f8f8'
				} else {
					this.tabBg = 'transparent'
				}
			},
			tabChange(index, item) {
				console.log(index, item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.giftshowHome{background: $uni-bg-color; padding-bottom:$uni-padding-30;
		.memberMsgBox{background: linear-gradient(to right , #78736f, #272020); padding: 50rpx $uni-padding-30 0 $uni-padding-30; height:300rpx;
			.photo{width: 100rpx;height:100rpx;border-radius: $uni-border-radius-circle;}
			.loginMsgBox{padding-left: $uni-padding-30; flex: 1; color:$uni-text-color-inverse; font-size:$uni-font-size-lg;
				.memberTip{padding-top:$uni-padding-10; color:#ccc; font-size:$uni-font-size-sm;}
			}
			.memberDateBox{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/bg-3@2x.png) left top no-repeat; background-size: 100%; width: 100%; height:237rpx; position: relative; bottom:-30rpx; padding-top:$uni-padding-20;
				.membericon{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/vip@2x.png) 30rpx 30rpx no-repeat; background-size: 56rpx;  padding:$uni-padding-30 100rpx $uni-padding-20 100rpx; font-size:$uni-font-size-40;}
				.membergoBtnBox{padding:$uni-padding-10 $uni-padding-30; margin:0 $uni-margin-10;
					button{height:70rpx; line-height:70rpx; border-radius: 35rpx; border:none; background:#4b2c0c; color:$uni-text-color-inverse;}
				}
			}
		}
		.titleBox{margin: 0 $uni-margin-30; padding: 0;
			.giftType{font-size:$uni-font-size-lg; flex: 1; color:#4b2c0c;}
			.gifttip{padding-right:40rpx; padding-top:$uni-padding-10;  vertical-align: middle; margin-bottom: 3px; margin-left: 3px;}
		}
		.productmsg{padding:$uni-padding-30; width: auto; overflow-x: scroll; cursor: pointer; margin:0 $uni-margin-30;
			.iconBox{width: 230rpx; margin: 0 $uni-margin-20; text-align: center;
				.iconMsg{width:96rpx; height: 96rpx; display: block; margin: 0 auto;}
			}
			.iconBox:nth-of-type(1) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-hotel.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(2) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-food.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(3) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-product.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(4) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-tea.png) center no-repeat; background-size: 100%;}
			.iconBox:nth-of-type(5) .iconMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/icon-sport.png) center no-repeat; background-size: 100%;}
			.productNameType{padding-top:$uni-padding-10; color:#4b2c0c; font-weight: bold; text{font-weight: normal;display: block; white-space: nowrap; font-size:$uni-font-size-sm; padding-top:$uni-padding-10; color:#aa805a;}
			}
		}
		.memberConBox{border-top:solid 20rpx #F8F8F8; padding:$uni-padding-30 0;}
		.conponListBox{padding: $uni-padding-30  $uni-padding-30 0  $uni-padding-30; width: auto; overflow-x: scroll; 
			.conponListMsg{background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/couponbg.png) left center no-repeat; margin:0 $uni-margin-20; width: 260rpx; box-sizing: content-box; height:145rpx; background-size: 100%; padding:$uni-padding-20;
				.couponMsg{color: #4b2c0c; flex: 1;
					text{font-size:$uni-font-size-40; margin-left:$uni-margin-10; margin-right:$uni-margin-20;}
					.coupontype{ padding:$uni-padding-10 0;}
				}
				.couponstatus{width:30rpx; line-height: 32rpx;}
			}
		}
		.grey-bg-content {background: $uni-bg-color;padding:0 $uni-padding-30 $uni-padding-30 $uni-padding-30;border-top:solid 20rpx #F8F8F8;
			.categary-tabs {margin-top: $uni-margin-30;}
		}
	}
</style>
