<template>
	<view class="plate-title" :style="{'margin-bottom': mb + 'rpx'}">
		 <text class="title">{{title}}</text>
		 <text class="subtitle">{{subtitle}}</text>
	</view>
</template>

<script>
	export default {
		name: 'comPlate',
		props: {
			title: String,
			subtitle: String,
			mb: {
				type: Number | String,
				default: 32
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.plate-title {
	display: inline-block;
	.title {
		font-size: 36rpx;
		color: $uni-text-color-title;
		margin-right: $uni-margin-20;
		font-family: PingFangSC-Medium;
	}
	.subtitle {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-subtitle;
	}
}
</style>
