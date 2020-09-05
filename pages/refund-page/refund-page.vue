<template>
	<com-layout :showNav="false">
		<view class="list">
			<view class="item" v-for="(dayItem, dayIndex) in 6" :key="dayIndex">
				<view class="item-title">
					<text>2020年0{{dayIndex + 1}}月</text>
				</view>
				<view class="content Flex-sb" v-for="(item, index) in 3" :key="item">
					<view class="left">
						<text class="des ellipsis">资生堂 安热小金瓶防晒霜安安热小金瓶防晒霜安20pp</text>
						<text class="type">退款</text>
					</view>
					<view class="right">
						<text class="restore">已恢复额度</text>
						<text class="money">+145.00</text>
					</view>
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
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		color: #303133;
		padding: $uni-padding-30 40rpx;
		.item {
			font-size: $uni-font-size-lg;
			margin-bottom: $uni-margin-30;
			border-radius: $uni-border-radius-base;
			&:last-child {
				margin-bottom: 0;
			}

			.item-title {
				color: #85858E;
				padding: $uni-padding-20 26rpx;
			}

			.content {
				font-size: $uni-font-size-base;
				margin-bottom: $uni-margin-20;
				height: 145rpx;
			}

			.left {
				height: 100%;
				flex: 1 0 auto;
				width: 480rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				background: $uni-bg-color;
				padding-left: $uni-padding-20;
				.des {
					margin-bottom: $uni-margin-10;
				}

				.type {
					color: #303133;
					font-size: $uni-font-size-lg;
				}
			}

			.right {
				height: 100%;
				flex: 1 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: $uni-bg-color;
				.restore {
					color: #EB2512;
					margin-bottom: $uni-margin-10;
				}
				.money {
					font-size: 38rpx;
				}

				
			}
		}
	}
</style>
