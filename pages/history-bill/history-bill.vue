<template>
	<com-layout :showNav="false">
		<view class="history-list">
			<view class="item" v-for="(item,index) in 5" :key="index">
				<view class="title">
					<text>201{{index}}年</text>
				</view>
				<view class="list Flex-sb" v-for="(litme,lindex) in 5" :key="lindex" @click="goHistoryBill">
					<view class="left">
						<text class="text">{{lindex + 1}}月账单</text>
						<text class="status">已还清</text>
					</view>
					<view class="right">
						<text>6789</text>
					</view>
					<!-- <u-icon class="flag" name="arrow-right" color="#909399" size="28"></u-icon> -->
					<com-icon name="icon-tiaozhuan"></com-icon>
				</view>
			</view>
		</view>
	</com-layout>
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(params) {
			console.log(params)
		},
		methods: {
			goHistoryBill() {
				uni.navigateTo({
					url: '/pages/history-bill/history-bill?type=123'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.history-list {
	padding: $uni-padding-30;
	.item {
		// padding: $uni-padding-20;
		background: $uni-bg-color;
		align-items: center;
		margin-bottom: $uni-margin-30;
		&:last-child {
			margin-bottom: 0;
		}
		.title {
			font-size: $uni-font-size-lg;
			color: #606266;
			border-bottom: 1rpx solid #E3E3E3;
			padding: $uni-padding-20;
		}
		.list {
			color: #303133;
			padding: $uni-padding-20;
			border-bottom: 1rpx solid #E3E3E3;
			&:last-child {
				border-bottom: none;
			}
			.left {
				flex: 1 0 auto;
				display: flex;
				flex-direction: column;
				.text {
					font-size: $uni-font-size-lg;
				}
				.status {
					font-size: $uni-font-size-sm;
					color: #909399;
				}
			}
			.right {
				font-size: $uni-font-size-40;
			}
		}
	}
}
</style>
