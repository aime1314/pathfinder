<template>
	<view class="swiper-wrap">
		<u-swiper class="swiper" @click="swiperClick" :border-radius="borderRadius" :height="swiperHeight" :list="bannerList" @change="change" name="src" interval="4000" v-bind="$attrs"></u-swiper>
	</view>
</template>

<script>
	export default {
		name: 'banner',
		props: {
			bannerList: {
				type: Array,
				default: () => {
					return []
				}
			},
			swiperHeight: {
				type: Number | String,
				default: 300
			},
			borderRadius: {
				type: String | Number,
				default: 12
			}
		},
		data() {
			return {
				bannerIndex: 0,
			};
		},
		methods: {
			change(index) {
			},
			swiperClick(index) {
				this.$emit('bannerClick', index);
				uni.navigateTo({
					url:this.bannerList[index].jumpUrl
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-wrap {
		z-index: 9;
		position: relative;
		img {
			width: 690rpx;
			height: 300rpx;
		}
	}
</style>