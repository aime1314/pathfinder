<template>
	<com-layout navBg="#fff" backArrowColor="#1D1F29">
		<!-- 	<template v-slot:nav-left>
			<view class=""></view>
		</template> -->
		<template v-slot:nav-center>
			<view class="search-wrap">
				<searchBar placeholder="品质好货低价买，省钱省心" :focus="true" v-model="searchText" @search="search" barBg="#EDEDED" width="650"/>
			</view>
		</template>
		<!-- <template v-slot:nav-right>
			<view class="action-btn" @click="actionFun">{{actionText}}</view>
		</template> -->

	<!-- 	<template v-slot:nav-right>
			<view class="icon font_family icon-xiaoxi" style="font-size: 50rpx; color: #999;"></view>
		</template> -->

		<view class="search-page">
			<search-wrap title="最近搜索" :list="latelySearchList" @itemClick="itemClick">
				<template v-slot:icon>
					<text  @click="deleteHistory" class="icon font_family icon-shanchu"></text>
				</template>
			</search-wrap>

			<search-wrap title="热门搜索" :list="hotSearchList" @itemClick="itemClick">
				<template v-slot:icon>
					<text  @click="refreshHot"  class="icon font_family icon-shuaxin"></text>
				</template>
			</search-wrap>
		</view>
	</com-layout>
</template>

<script>
	import searchBar from '../../components/searchBar.vue'
	import searchWrap from './components/searchWrap.vue'
	export default {
		data() {
			return {
				searchText: '',
				latelySearchList: [],
				hotSearchList: [],
				storeKey: 'searchList'
			}
		},
		components: {
			searchBar,
			searchWrap
		},
		mounted() {
			console.log('mounted')
		},
		onLoad() {
			this.loadData()
			uni.getStorage({
				key: this.storeKey,
				success: (res) => {
					this.latelySearchList = JSON.parse(res.data)
				}
			})
			console.log('onload')
		},
		computed: {
			actionText() {
				return this.searchText ? '搜索' : '取消';
			},
			action() {
				return this.searchText ? true : false;
			}
		},
		methods: {
			loadData() {},
			itemClick(index, item) {
				this.search(item);
				console.log(index, item)
			},
			actionFun() {
				// if (!this.action) {
				// 	uni.navigateBack()
				// 	return;
				// }
				if (!this.searchText) {
					return
				}
				if (!this.latelySearchList.includes(this.searchText.trim())) {
					this.latelySearchList.push(this.searchText);
				}
				uni.setStorage({
					key: this.storeKey,
					data: JSON.stringify(this.latelySearchList),
					success: () => {
						console.log('store ', this.searchText)
					}
				})

			},
			search(text) {
				this.actionFun()
				uni.navigateTo({
					url: '/pages/searchResult/searchResult?text='+text
				})
			},
			deleteHistory() {
				uni.removeStorage({
					key: this.storeKey,
					success: () => {
						this.latelySearchList = []
					}
				})
			},
			refreshHot() {

			}
		},
	}
</script>

<style lang="scss" scoped>
	.action-btn {
		color: #606266;
		font-size: $uni-font-size-base;
	}

	.message {
		width: 56rpx;
		height: 56rpx;
	}

	.search-wrap {
		padding-left: 70rpx;
	}

	.search-page {
		height: 100%;
		padding: $uni-padding-30;
		background: $uni-bg-color;
	}
</style>
