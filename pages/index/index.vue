<template>
	<com-layout @scroll="pageScroll" :navBg="navBg" @scrollBottom="scrollBottom">
		<template v-slot:nav-left>
			<view class=""></view>
		</template>
		<template v-slot:nav-center>
			<view class="search-wrap" @click="goSearchPage">
				<searchBar :showBtn="false" :disabled="true" placeholder="品质好货低价买，省钱省心" :barStyle="barStyle"/>
			</view>
		</template>
		<template v-slot:nav-right>
			<!-- <image src="https://cdn.colourfulchina.com/nwsh/static/icons/msg.png" class="message" mode="aspectFit"></image> -->
		</template>
		<view class="index-page">
			<view class="banner-wrap">
				<banner :bannerList="bannerList"></banner>
			</view>
			<view class="page-content">
				<view class="wrap">
					<com-scroll :showIndicate="true">
						<com-menu :menus="scrollMenus" @itemClick="menuClick"></com-menu>
					</com-scroll>

					<view class="credit-wrap" @tap="goCardApply">
						<com-credit></com-credit>
					</view>

					<!-- <com-scroll>
					 	<com-active :list="bannerList"></com-active>
					 </com-scroll> -->

					<view class="hot-sell-wrap">
						<com-plate title="热销榜单"></com-plate>
						<com-well-sold :objectList="objectList"></com-well-sold>
					</view>
					
					<view class="youdao-wrap" @tap="goyoudao">
						<com-youdao></com-youdao>
					</view>
					<view class="categary-tabs">
						<com-plate title="猜你喜欢" subtitle=" "></com-plate>
						<!-- <u-sticky bg-color="transparent" @fixed="tabFixed">
							<com-tabs :list="typeList" @tabChange="tabChange"></com-tabs>
						</u-sticky> -->
					</view>
					<com-sticky @isFixed="tabFixed"> 
							<com-tabs :list="typeList" :isCelling="tabIsCelling" @tabChange="tabChange" :tabWrapStyle="{padding: '0 30rpx', background: tabBg}"></com-tabs>
					</com-sticky>
					<view class="water-wrap">
						<com-waterfall :list="contentList">
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
			<com-loadmore :status="loadingStatus"></com-loadmore>
		</view>
	</com-layout>
</template>

<script>
	import searchBar from '../../components/searchBar.vue'
	import banner from '../../components/banner.vue'
	import goodsItem from '../../components/goods-item.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				title: '首页',
				bannerList: [],
				scrollMenus: [],
				objectList: [], //首页接口返回的所有商品列表
				contentList: [],//猜你喜欢展示的商品列表
				typeList: [{
					"title": '自助餐'
				}, {
					"title": '下午茶'
				}, {
					"title": '住宿'
				}, {
					"title": '卡券'
				}],
				bottomGoods: [],
				navBg: '#F91546',
				barStyle: {},
				tabBg: '',
				scrollTop: 0,
				tabIsCelling: false,
				loadingStatus: 'loading'
			}
		},
		components: {
			searchBar,
			banner,
			goodsItem
		},
		computed: {
			...mapState(['goodsData', 'userMsg', 'channel'])
		},
		onLoad() {
			// this.loadData();
			// this.getObjectData()
			
		},
		onReady() {
			this.loadData();
			this.getObjectData()
		},
		methods: {
			pageScroll(e) {
				let detail = e.detail;
				if (detail.scrollTop > 50) {
					this.navBg = '#fff';
					this.barStyle = {
						border: '1rpx solid #EB2613'
					}
				} else {
					this.navBg = '#F91546';
					this.barStyle = {
					}
				}
			},
			scrollBottom() {
				setTimeout(() => {
					this.loadingStatus = 'nomore'
				}, 2000)
				console.log('bottom')
			},
			tabFixed(value) {
				if (value) {
					this.tabBg = '#fff'
					this.tabIsCelling = true;
				} else {
					this.tabBg = 'transparent'
					this.tabIsCelling = false;
				}
			},
			goSearchPage() {
				uni.navigateTo({
					url: '../search/search',
				})
			},
			menuClick(index, item) {
				if(item.title == '极融卡'){
					uni.switchTab({
						url: '/pages/card/card'
					})
				}else{
					uni.navigateTo({
						url: '../category/category?typeItems=' + encodeURIComponent(JSON.stringify(item.items)) + '&typeName=' + encodeURIComponent(JSON.stringify(item.title))
					})
				}
				
			},
			tabChange(index, item) {
				console.log(index, item);
				this.contentList = [];
				let tmpArr = [];
				if(index == 0){
					tmpArr = this.objectList;
				}else{
					let tempList = this.objectList.filter((ob)=>{
					var temp = false;
					item.items.map((ty)=>{
						if(ob.projectId == ty){
							temp = true;
							}
						})
					return temp;
					});
					tmpArr = JSON.parse(JSON.stringify(tempList));
				}
				setTimeout(() => {
					this.contentList = tmpArr;
				}, 200)
			},
			goodsClick(item) {
				uni.navigateTo({
					url: `../detail/detail?id=${item.projectId}`
				})
			},
			goyoudao(){
				window.location.href = 'http://m.jiayin95.com/wx/wealthDetail'
			},
			//获取商品信息
			getObjectData() {
				let params = {
					"acChannel": "NWSH",
					"sticket": ""
				}
				this.$goodsApi.getGoodsList(params).then(res => {
					this.objectList = res.obj.list;
					this.contentList = JSON.parse(JSON.stringify(this.objectList));
				});
			},
			//获取首页banner图
			getBanner() {
				let params = {
					"acChannel": "NWSH"
				}
				this.$goodsApi.getProjectBannerList(params).then(res => {
					if (res.code == 100 && res.result) {
						res.result.map(a => {
							let obj = {
								src: a.imgUrl,
								jumpUrl:a.jumpUrl
							}
							this.bannerList.push(obj)
						})
					}
				});
			},
			//获取首页type页
			getModuleList() {
				let tempJr = {
					title: '极融卡',
					src: 'https://cdn.colourfulchina.com/nwsh/static/icons/card.png',
				}
				let tempAll = {
					title: '全部'
				}
				let tmpArr = [tempJr];
				let tempAllArr = [tempAll];
				let moduleReq = {
					"ChannelModulePrjList": "NWSH",
					"acChannel": "NWSH"
				}
				let tmpObj = {
					自助餐: 'https://cdn.colourfulchina.com/nwsh/static/icons/buffet.png',
					下午茶: 'https://cdn.colourfulchina.com/nwsh/static/icons/tea.png',
					单杯茶饮: 'https://cdn.colourfulchina.com/nwsh/static/icons/drink.png',
					卡券: 'https://cdn.colourfulchina.com/nwsh/static/icons/gift.png',
					定制套餐: 'https://cdn.colourfulchina.com/nwsh/static/icons/setmen.png',
				}
				this.$goodsApi.getProjectModuleList(moduleReq).then(res => {
					if (res) {
						res.map(a => {
							for (var key in a) {
								let obj = {
									title: key,
									src: tmpObj[key],
									items: a[key]
								}
								tmpArr.push(obj);
								tempAllArr.push(obj);
							}
						})
					}
					this.scrollMenus = tmpArr;
					this.typeList = tempAllArr;
				})
			},
			loadData() {
				this.getBanner();
				this.getModuleList();
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
	$padding: 32rpx;

	.message {
		width: 48rpx;
		height: 48rpx;
	}

	.search-wrap {
		padding: 0 $padding;
		margin: 0 auto;
	}
	.ext-wrap {
		padding: 0 $padding;
	}
	.index-page {
		height: 100%;
		background: #F91546;

		.banner-wrap {
			z-index: 1;
			padding: 0 $padding;
			position: relative;
			bottom: -70rpx;
			margin-top: -70rpx;
		}
		.page-content {
			position: relative;
			padding-top: 102rpx;
			// border-radius: 30rpx;
			background: $uni-bg-color-grey;
			.wrap {
				// padding: 0 $padding;

				.credit-wrap {
					margin: $padding auto;
					@extend .ext-wrap;
				}

				.hot-sell-wrap {
					// margin-top: $uni-margin-30;
					margin-bottom: 32rpx;
					@extend .ext-wrap;
				}
				.youdao-wrap {
					@extend .ext-wrap;
				}
				.categary-tabs {
					margin-top: $uni-margin-30;
					@extend .ext-wrap;
				}
				.water-wrap {
					@extend .ext-wrap;
				}
			}
		}
	}
</style>
