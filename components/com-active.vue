<template>
	<view class="actives">
		<view class="item" v-for="(item, index) in list" :key="index" @click="itemClick(index, item)">
			<image :src="item.src" mode="widthFix" class="img"></image>
			<text class="title">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comActive',
		props: {
			list: Array
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.actives {
	margin: 0 auto;
	.item {
		display: inline-block;
		margin-right: $uni-margin-20;
		width: 612rpx;
		height: 226rpx;
		box-shadow:0 0 12rpx 0 rgba(0,0,0,0.08);
		border-radius: 10rpx;
		overflow: hidden;
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
