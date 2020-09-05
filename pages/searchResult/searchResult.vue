<template>
	<com-layout navBg="#fff" backArrowColor="#1D1F29" @scrollBottom="scrollBottom" :showLoadmore="true" :loadingStatus="status">
		<template v-slot:nav-center>
			<view class="search-wrap">
				<searchBar placeholder="品质好货低价买，省钱省心" v-model="searchText" barBg="#EDEDED" width="650" @search="search" />
			</view>
		</template>

		<template v-slot:nav-right>
			<!-- <view class="icon font_family icon-xiaoxi" style="font-size: 50rpx; color: #999;"></view> -->
		</template>

		<view class="search-result-page">
			<u-sticky offset-top="0">
				<com-filtrate @filter="sortPrice"></com-filtrate>
			</u-sticky>
			<view class="list">
				<list-cell v-for="(item, index) in searchList" :key="index" :item="item"></list-cell>
			</view>
		</view>
	</com-layout>
</template>

<script>
	import searchBar from '../../components/searchBar.vue'
	import listCell from '@/components/list-cell-search.vue'
	export default {
		data() {
			return {
				searchText: '',
				status: 'loadmore',
				text:'',
				searchList: [],
			};
		},
		components: {
			searchBar,
			listCell
		},
		onLoad(e){
			this.text = e.text
			this.showData(this.text)
		},
		methods: {
			scrollBottom() {
				//nomore
				this.status = 'loading'
				setTimeout(() => {
					this.status = 'loadmore'
				}, 2000)
			},
			showData(data) {
				let params={
					"acChannel":"NWSH",
					"nameOrId": data == 'undefined' ? '':data
				}
				this.$goodsApi.selectPrjListByParams(params).then(res => {
					if(res.code == 100 && res.result){
						this.searchList = res.result
					}
				});
			},
			search(text) {
				this.showData(text)
			},
			sortPrice(type){
				this.searchList.sort(this.compare('discountPrice',type))
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
		}
	}
</script>

<style lang="scss" scoped>
	.message {
		width: 56rpx;
		height: 56rpx;
	}

	.search-wrap {
		padding-left: 70rpx;
	}

	.search-result-page {
		.list {
			padding: $uni-padding-20 $uni-padding-30;
		}
	}
</style>
