<template>
	<com-layout :showNav="false" :showLoadmore="true" :loadingStatus="status" @scrollBottom="scrollBottom">
		<view class="more-products">
			<list-cell :item="item" v-for="(item, index) in hotelList" :key="index"></list-cell>
		</view>

	</com-layout>
</template>

<script>
	import listCell from '@/components/list-cell.vue'
	export default {
		data() {
			return {
				status: 'loadmore',
				hotelList:[]
			};
		},
		components: {
			listCell
		},
		onLoad(e) {
			this.hotelList = JSON.parse(decodeURIComponent(e.allhotels))
		},
		methods: {
			scrollBottom() {
				//nomore
				this.status = 'loading'
				setTimeout(() => {
					this.status = 'loadmore'
				}, 2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.more-products {
		padding: $uni-padding-20 $uni-padding-30;
	}
</style>
