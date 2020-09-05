<template>
	<com-layout :showNav="false" navBg="transparent" backArrowColor="#1D1F29" backBg="url(https://cdn.colourfulchina.com/nwsh/static/icons/Oval.png) 0 0 / 60rpx 60rpx no-repeat">
		<!--  -->
		<com-nav navBg="transparent">
			<template #nav-left>
				<navigator open-type="navigateBack" class="back Flex-cen">
					<com-icon name="icon-fanhui" color="#1D1F29" size="28"></com-icon>
				</navigator>
			</template>
			<template #nav-right>
				<view class="share Flex-cen">
					<com-icon name="icon-fenxiang" color="#1D1F29" size="28" @click="showShareFun"></com-icon>
				</view>
			</template>
		</com-nav>


		<banner :bannerList="imageList" swiperHeight="400" mode="number" indicator-pos="bottomRight" :autoplay="false"
		 :border-radius="0"></banner>
		<view class="detail-page">

			<product-des :goodsInfo="goodsInfo" @getCoupon="showCouponFun" :installmentList="installmentList"></product-des>
			
			<interest-free-item></interest-free-item>
			
			<view class="para-list">
				<view class="item Flex-sb" @click="showProduct = false">
					<text class="title">选择</text>
					<text class="content ellipsis">{{goodsInfo.projectName}}</text>
					<!-- <com-icon class="flag" name="icon-tiaozhuan" color="#909399" size="28"></com-icon> -->
				</view>
				<view class="item Flex-sb" @click="showPara = true">
					<text class="title">参数</text>
					<text class="content ellipsis">商品类别，有效期，不适用时段</text>
					<com-icon class="flag" name="icon-tiaozhuan" color="#909399" size="28"></com-icon>
				</view>
				<view class="item Flex-sb" @click="showService = true">
					<text class="title">服务</text>
					<text class="content ellipsis">{{this.goodsInfo.refundInstruction}}放心购、平台全品类券、分期付款</text>
					<com-icon class="flag" name="icon-tiaozhuan" color="#909399" size="28"></com-icon>
				</view>
			</view>
			<!-- 适用酒店 -->
			<view class="hotel-wrap" v-if="showHotelList && showHotelList.length>0">
				<view class="top Flex-sb" @click="checkMore">
					<text class="title">适用酒店</text>
					<text class="more">更多酒店</text>
					<com-icon name="icon-tiaozhuan" color="#909399"></com-icon>
				</view>
				<com-scroll :contentStye="{background: '#fff'}">
					<view class="item" v-for="(item, index) in showHotelList" :key="index">
						<!-- <image class="img" src="https://cdn.colourfulchina.com/nwsh/static/bank/01040000.png" mode="widthFix"></image> -->
						<image class="img" :src = "item.hotelImg" mode="scaleToFill"></image>
						<view class="text two-ellipsis">
							{{item.showName}}
						</view>
					</view>
					<text class="check-more" @click="checkMore">查看更多</text>
				</com-scroll>
			</view>

			<com-sticky>
				<view class="tabs">
					<view :class="['item', {active: tabIndex === 0}]" @click="tabIndex = 0">商品介绍</view>
					<view :class="['item', {active: tabIndex === 1}]" @click="tabIndex = 1">使用规则</view>
					<!-- <view :class="['item', {active: tabIndex === 2}]" @click="tabIndex = 2">商品推荐</view> -->
				</view>
			</com-sticky>

			<view :class="[tabClass]">
				<!-- <rich-text :nodes="tabContnet" v-if="tabIndex !== 2"></rich-text> -->
				<rich-text :nodes="goodsIntroduce" image-menu-prevent="true" v-if="tabIndex == 0" >
					<!-- <image :src="goodsIntroduce"></image> -->
				</rich-text>
				<rich-text :nodes="tabContnet" v-if="tabIndex == 1"></rich-text>
				<view v-else-if="tabIndex == 2" class="">
					<view class="title Flex-cen">
						<text class="line"></text>
						<text class="text">猜你喜欢</text>
						<text class="line"></text>
					</view>
					<com-waterfall :list="imageList">
						<template v-slot:left="{item, index}">
							<goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
						</template>
						<template v-slot:right="{item, index}">
							<goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
						</template>
					</com-waterfall>
				</view>
			</view>
		</view>
	</view>

		<com-bottom rText="立即购买" @confirm="goBuy">
			<template v-slot:left>
				<view class="bottom-left Flex-cen">
					<view class="item">
						<com-icon name="icon-kefu" size="44"></com-icon>
						<text class="text" @click="callPhone">联系客服</text>
					</view>
					<view class="item"  @click="collectAction">
						<com-icon :name="collectFlag?'icon-yishoucang':'icon-shoucang'" size="44" :class="collectFlag?'curron':''"></com-icon>
						<text class="text">{{collectMsg}}</text>
					</view>
				</view>
			</template>
		</com-bottom>
		<!-- <view class="page-bottom">
			<view class="">
				<image src="https://cdn.colourfulchina.com/nwsh/static/icons/kf-img.png" mode="aspectFit"></image>
			</view>
			<view class="">
				<button type="default">立即购买</button>
			</view>
		</view> -->
		<com-popup :visable.sync="showService" height="680rpx" title="服务" @confirm="showService = false">
			<service-item></service-item>
		</com-popup>
		<com-popup :visable.sync="showProduct" height="800rpx" @confirm="showProduct = false">
			<product-select-item :goodsInfo="goodsInfo"></product-select-item>
		</com-popup>
		<com-popup :visable.sync="showPara" height="680rpx" title="规格参数" @confirm="showPara = false">
			<para-item></para-item>
		</com-popup>
		<com-popup :visable.sync="showCoupon" height="667rpx" title="优惠券" @confirm="showCoupon = false">
			<coupon-item></coupon-item>
		</com-popup>

		<com-popup :visable.sync="showShare" height="439rpx" title="分享至" :showBottom="false">
			<share-item @cancel="showShare = false"></share-item>
		</com-popup>
	</com-layout>
</template>

<script>
	import banner from '../../components/banner.vue'
	import productDes from './components/productDes.vue'
	import stagingWrap from './components/stagingWrap.vue'
	import shareItem from './components/shareItem.vue'
	import interestFreeItem from './components/interestFreeItem.vue'
	import couponItem from './components/couponItem.vue'
	import serviceItem from './components/serviceItem.vue'
	import productSelectItem from './components/productSelectItem.vue'
	import paraItem from './components/paraItem.vue'
	import goodsItem from '@/components/goods-item.vue'
	import checkLoginFun from '../../common/util.js'
	export default {
		data() {
			return {
				productId: '',
				showShare: false,
				showCoupon: false,
				imageList: [],
				showService: false,
				showProduct: false,
				showPara: false,
				goodsInfo:{} ,//商品详细信息
				tabIndex: 0,
				tabContnet: '',
				showHotelList:[], //当前页展示的酒店列表
				allHotelList:[] ,//所有酒店列表,
				goodsIntroduce:'',
				collectFlag:false,//是否已收藏，
				collectMsg:'添加收藏',
				installmentList:[]
			};
		},
		computed: {
			tabClass() {
				switch (this.tabIndex) {
					case 0:
						return 'tab0';
					case 1:
						return 'tab1';
					case 2:
						return 'tab2';
					default:
						return 'tab0';
				}
			}
		},
		components: {
			banner,
			productDes,
			stagingWrap,
			shareItem,
			interestFreeItem,
			couponItem,
			serviceItem,
			productSelectItem,
			paraItem,
			goodsItem
		},
		onLoad(obj) {
			this.productId = obj.id;
			this.checkProductCollectStatus();
		},
		created() {
			this.getGoodsInfoByGoodsId();
		},
		methods: {
			// loadData() {
			// 	for (let i = 0; i < 10; i++) {
			// 		let obj = {
			// 			title: 'test',
			// 			src: "https://cdn.colourfulchina.com/2020/03/11/goods/pic/C7310123145E15DA.jpg"
			// 		}
			// 		this.imageList.push(obj);

			// 	}
			// },
			showShareFun() {
				this.showShare = true;
				console.log('890', this.showShare)
			},
			showCouponFun() {
				this.showCoupon = true;
				console.log(this.showCoupon)
			},
			// 分期 更改
			stagingChange(index, item) {
				console.log(index, item)
			},
			
			//获取商品详情
			getGoodsInfoByGoodsId(){
				console.log(this.productId)
				let params={
					acChannel: 'NWSH',
					projectId:this.productId
				}
				this.$goodsApi.getGoodsDetail(params).then(res => {
					if(res.ok == 0 && JSON.stringify(res.obj) != "{}"){
						this.goodsInfo = res.obj
						//使用细则
						this.tabContnet = res.obj.globalInstruction
						//轮播图
						if(res.obj.projectUrlList !== undefined && res.obj.projectUrlList.length > 0){
							for (let i = 0; i < res.obj.projectUrlList.length; i++) {
								let img = {
									title: 'test',
									src: res.obj.projectUrlList[i]
								}
								this.imageList.push(img);
								console.log(this.imageList)
							}
						}else{
							this.imageList = [{"title":"test","src":"https://cdn.colourfulchina.com/nwsh/static/images/default.png"}]
						}
						//酒店列表:默认项目下只包一个产品组
						let productList = res.obj.prjGroupList[0].goodsList;
						
						if(productList !== undefined && productList.length > 0){
							for (var i = 0; i < productList.length; i++) {
								let hotel = {
									goodsId:productList[i].goodsId,
									showName:productList[i].hotel +" " + productList[i].name,
									hotelImg:productList[i].url,
									hotelAddress:productList[i].address
								}
								this.allHotelList.push(hotel)
							}
							if(this.allHotelList.length > 4){
								this.showHotelList = this.allHotelList.slice(0,4)
							}else{
								this.showHotelList = this.allHotelList
							}
						}
						//图文介绍
						if(res.obj.richInfo){
							let imgs = res.obj.richInfo.split(",");
							let str = "<div>";
							if(imgs.length > 0){
								for (var i = 0; i < imgs.length; i++) {
									str = str + '<img class="info-img" src ="' +imgs[i] + '"</>'
								}
								str = str + "</div>"
								this.goodsIntroduce = str
							}
						}
						
						//计算分期: 目前商品接口不支持分期费率和 期数,这两个参数先模拟
						// let obj = this.installment(res.obj.discountPrice,6,0.01)
						this.installment(res.obj.discountPrice,3,0.005);
						this.installment(res.obj.discountPrice,6,0.01);
						this.installment(res.obj.discountPrice,12,0.02);
						this.installment(res.obj.discountPrice,24,0.03);
					}
				});
			},
			installment:function(installmentMoney,periods,taxRate){
				let params={
					installmentMoney: installmentMoney,
					periods:periods,
					taxRate:taxRate
				}
				this.$goodsApi.installment(params).then(res => {
					if(res.code === 100 && res.msg === 'ok'){
						if(res.result != undefined && res.result){
							let installment = {
								monthMoney:res.result.monthMoney,
								periods:res.result.periods
							}
							this.installmentList.push(installment)
							this.installmentList.sort(function(i1,i2){
								return i1.periods - i2.periods;
							})
						}
					}
				});
			},
			goBuy() {
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						uni.navigateTo({
							url: '/pages/orderConfirm/orderConfirm?productId='+this.productId
						})
					}
				})
			},
			checkMore() {
				uni.navigateTo({
					url: '/pages/moreProducts/moreProducts?allhotels=' + encodeURIComponent(JSON.stringify(this.allHotelList))
				})
			},
			//拨打客服电话
			callPhone(){
				window.location.href = 'tel://4006368008'
			},
			// 收藏
			collectAction() {
				//先校验用户是否登录
				checkLoginFun.checkLogin(location.href,(value)=>{
					if(value){
						let acid = uni.getStorageSync("USERDATA").acid
						if(acid != undefined && acid != null && acid != ''){
							let params={
								userId: acid,
								goodsId:this.productId
							}
							this.$goodsApi.productCollect(params).then(res => {
								if(res.code === 100 && res.msg === 'ok'){
									if(res.result != undefined && res.result){
										this.collectFlag = !this.collectFlag;
										this.collectMsg = this.collectMsg == '添加收藏'? '取消收藏' : '添加收藏'				
									}
								}
							});
						}
					}
				})
			},
			//查询商品收藏状态
			checkProductCollectStatus(){
				let acid = uni.getStorageSync("USERDATA").acid
				if(acid == undefined || acid == null || acid == ''){
					this.collectFlag = false;
					this.collectMsg = '添加收藏';
				}else{
					let params={
						userId: acid,
						goodsId:this.productId
					}
					this.$goodsApi.checkProductCollectStatus(params).then(res => {
						if(res.code === 100 && res.msg === 'ok'){
							if(res.result != undefined){
								if(!res.result){
									//未收藏
									this.collectFlag = false;
									this.collectMsg = "添加收藏";
								}else{
									//已经收藏
									this.collectFlag = true;
									this.collectMsg = "取消收藏";
								}
							}
						
						}
					});
				}	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back {
		width: 60rpx;
		height: 60rpx;
		background: url(https://cdn.colourfulchina.com/nwsh/static/icons/Oval.png) 0 0 / 60rpx 60rpx no-repeat;
	}

	.share {
		width: 60rpx;
		height: 60rpx;
		background: url(https://cdn.colourfulchina.com/nwsh/static/icons/Oval.png) 0 0 / 60rpx 60rpx no-repeat;

		.img {
			width: 33rpx;
			height: 34rpx;
		}
	}

	.bottom-left {
		width: 375rpx;
		height: 100%;
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			margin-right: 80rpx;
			&:last-child {
				margin-right: 0;
			}
			.curron{color: $uni-text-color-them;}
		}
		.img {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 8rpx;
		}

		.text {
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
		}
	}

	.detail-page {
		// padding: 0 $uni-padding-30;
		margin-bottom: 94rpx;
		.para-list {
			padding: $uni-padding-30;
			background: $uni-bg-color;
			margin-bottom: 16rpx;
			.item {
				margin-bottom: $uni-margin-20;

				.title {
					font-size: 30rpx;
					color: $uni-text-color-des;
					flex: 0 0 auto;
				}

				.content {
					flex: 1 1 auto;
					margin-left: $uni-margin-30;
					margin-right: $uni-margin-10;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
				}

				.flag {
					flex: 0 0 auto;
				}
			}
		}

		.hotel-wrap {
			background: $uni-bg-color;
			padding: $uni-padding-30;
			font-size: 22rpx;
			color: $uni-font-color-goods;
			margin-bottom: 16rpx;
			.top {
				margin-bottom: $uni-margin-20;

				.title {
					font-size: 30rpx;
					flex: 1 0 auto;
				}

				.more {
					font-size: $uni-font-size-sm;
					margin-right: $uni-margin-10;
				}
			}

			.item {
				width: 240rpx;
				background: #f4f4f4;
				white-space: pre-wrap;
				display: inline-block;
				border-radius: 8rpx;
				margin-right: $uni-margin-20;
				overflow: hidden;
				&:last-child {
					margin-right: 0;
				}

				.img {
					width: 100%;
					height: 160rpx;
				}

				.text {
					width: 100%;
					padding: 0 $uni-padding-10;
					margin: 20rpx 0;
					text-align: center;
				}
			}

			.check-more {
				display: inline-block;
				position: relative;
				top: -130rpx;
			}
		}

		.tabs {
			display: flex;
			justify-content: center;
			background: $uni-bg-color;
			padding: $uni-padding-20 0;

			.item {
				margin-right: 160rpx;
				font-size: $uni-font-size-sm;
				color: $uni-font-color-goods;
				position: relative;

				&:last-child {
					margin-right: 0;
				}
			}

			.active {
				color: $uni-color-price;
			}

			// .active::after {
			// 	content: '';
			// 	width: 40rpx;
			// 	height: 6rpx;
			// 	border-radius: 2rpx;
			// 	position: absolute;
			// 	background: $uni-color-price;
			// 	bottom: -10rpx;
			// 	left: 50%;
			// 	transform: translateX(-50%);
			// }
		}

		.tab0 {
			/deep/ .info-img {
				max-width: 100%;
			}
		}

		.tab1 {
			padding: 0 $uni-padding-30 $uni-padding-20;
			background: $uni-bg-color;
		}

		.tab2 {
			padding: 0 $uni-padding-30;

			.title {
				color: $uni-color-price;
				text-align: center;
				margin-top: $uni-margin-30;

				.text {
					margin: 0 $uni-margin-20;
				}

				.line {
					height: 2rpx;
					width: 40rpx;
					background: linear-gradient(to right, $uni-color-price, rgba($color: $uni-color-price, $alpha: 0.2));

					&:first-child {
						transform: rotateY(180deg);
					}
				}
			}
		}
	}
</style>
