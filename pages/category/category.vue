<template>
	<com-layout :navBg="navBg" backArrowColor="#1D1F29" @scrollBottom="scrollBottom" :showLoadmore="true" :loadingStatus="status">
		<template v-slot:nav-center>
			<view class="search-wrap" @click="goSearch">
				<searchBar placeholder="品质好货低价买，省钱省心" width="650" disabled   @search="search" :showBtn="false"/>
			</view>
		</template>

		<template v-slot:nav-right>
			<!-- <image src="https://cdn.colourfulchina.com/nwsh/static/icons/msg.png" class="message" mode="aspectFit"></image> -->
		</template>
		<view class="category-page" :style="{background: contentBg}">
			<view class="gap-wrap">
				<banner :bannerList="list" mode="none" :swiperHeight="250"></banner>
			</view>
			<!-- <view class="wrap">
				<com-plate title="热销爆款"></com-plate>
				<com-well-sold :showAction="true"></com-well-sold>
			</view> -->
			<view class="gap-wrap">
				<view class="wrap">
					<com-plate title="热销爆款" subtitle="限量抢购中"></com-plate>
					<com-scroll :contentStye="{background: '#fff'}">
						<com-hot-sale :contentList="baseList"></com-hot-sale>
					</com-scroll>
				</view>
			</view>
			
			<view class="gap-wrap" v-if="type === '住宿'">
				<view class="hotal-list">
					<com-plate title="为你推荐"></com-plate>
					<com-waterfall :list="baseList">
						<template v-slot:left="{item, index}">
							<goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
						</template>
						<template v-slot:right="{item, index}">
							<goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
						</template>
					</com-waterfall>
				</view>
			</view>
			<view class="afternoon-list" v-else>
				<view class="gap-wrap">
					<com-plate title="超值套餐" mb="0"></com-plate>
				</view>
				
				<com-sticky  @isFixed="tabFixed">
					<com-filtrate :bg="tabBg" @filter="sortPrice"></com-filtrate>
				</com-sticky>
				<view class="list">
					<list-cell v-for="(item, index) in contentList" :key="index" :item="item"></list-cell>
				</view>
			</view>
		</view>
	</com-layout>
</template>
<script>
	import banner from '../../components/banner.vue'
	import searchBar from '../../components/searchBar.vue'
	import listCell from '@/components/list-cell-type-list.vue'
	import goodsItem from '@/components/goods-item.vue'
	export default {
		data() {
			return {
				list: [{src: 'https://cdn.colourfulchina.com/nwsh/static/images/demo-cc.png'}],
				status: 'loadmore',
				type: '',
				navBg: '',
				contentBg: '',
				contentList: [],
				baseList: [],
				scrollTop: 0,
				tabBg: '',
			};
		},
		props: {
			
		},
		onLoad: function(option){
			let typeName = JSON.parse(decodeURIComponent(option.typeName));
			this.type = typeName;
			let typeItems = JSON.parse(decodeURIComponent(option.typeItems));
			let params = {
				"acChannel": "NWSH",
				"sticket": ""
			}
			this.$goodsApi.getGoodsList(params).then(res => {
				let objectList = res.obj.list;
				this.contentList = objectList.filter((ob)=>{
					var temp = false;
					typeItems.map((ty)=>{
						if(ob.projectId == ty){
							temp = true;
						}
					})
					return temp;
				});
				this.baseList = JSON.parse(JSON.stringify(this.contentList));
			});
			//type类型对应的banner
			if(this.type == '自助餐'){
				this.list = [{src:"https://cdn.colourfulchina.com/nwsh/static/images/demo-buffet.png"}]
			}
			if(this.type == '下午茶'){
				this.list = [{src:"https://cdn.colourfulchina.com/nwsh/static/images/demo-tea.png"}];
			}
			if(this.type == '单杯茶饮'){
				this.list = [{src:"https://cdn.colourfulchina.com/nwsh/static/images/demo-drink.png"}];
			}
			if(this.type == '卡券'){
				this.list = [{src:"https://cdn.colourfulchina.com/nwsh/static/images/demo-coupon.png"}];
			}
		},
		computed: {
			bgStr() {
				switch (this.type) {
					case '自助餐':
						return 'url(https://cdn.colourfulchina.com/nwsh/static/images/bg-buffer@2x.png)';
					case '下午茶':
						return 'url(https://cdn.colourfulchina.com/nwsh/static/images/bg-afternoon-tea@2x.png)';
					case '单杯茶饮':
						return 'url(https://cdn.colourfulchina.com/nwsh/static/images/bg-hotel@2x.png)';
					default:
						return 'url(https://cdn.colourfulchina.com/nwsh/static/images/bg-hotel@2x.png)'
				}
			}
		},
		mounted() {
			this.navBg = `${this.bgStr} 0 0rpx / 100% 320px no-repeat`;
			this.contentBg = `${this.bgStr} 0 -48rpx / 100% 270rpx no-repeat`;
		},
		components: {
			banner,
			searchBar,
			listCell,
			goodsItem
		},
		methods: {
			tabFixed(value) {
				if (value) {
					this.tabBg = '#f8f8f8'
				} else {
					this.tabBg = 'transparent'
				}
			},
			scrollBottom() {
				this.status = 'loading';
				setTimeout(() => {
					this.status = 'loadmore'
				}, 2000)
			},
			search(text){
				if(this.baseList && this.baseList.length > 0 && text && text !='undefined'){
					this.contentList = this.baseList.filter(a=>(a.projectName.indexOf(text) > -1 || a.projectId == text))
				}
				if(text == '' || text =='undefined'){
					this.contentList = this.baseList;
				}
			},
			sortPrice(type){
				this.contentList.sort(this.compare('discountPrice',type))
			},
			compare(prop,type){
				return function(a,b){
					var value1 = a[prop];
					var value2 = b[prop];
					if(type == 'desc'){
						return value2 - value1;
					}else if(type == 'asc'){
						return value1 - value2;
					}
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrap {
		padding-left: 70rpx;
	}

	.message {
		width: 56rpx;
		height: 56rpx;
	}

	.gap-wrap {
		padding: 0 32rpx;
	}
	.category-page {
		padding: 20rpx 0;
		.wrap {
			margin-top: $uni-margin-30;
			background: #fff;
			width: 685rpx;
			// height: 420rpx;
			padding: 32rpx 24rpx;
			border-radius: 12rpx;
		}
	}
	.hotal-list {
		margin-top: $uni-margin-30;
	}

	.afternoon-list {
		margin-top: $uni-margin-30;
		.list {
			padding: 0 32rpx;
		}
	}
</style>
