<template>
	<view class="search">
		<view class="wrap Flex-sb">
			<com-plate :title="title" :fontSize="32"></com-plate>
			<view class="img-wrap">
				<slot name="icon">
				</slot>
			</view>
		</view>
		<view class="search-list" v-if="list">
			<view class="item Flex-cen" v-for="(item, index) in list" :key="index" @click="itemClick(index,item)">
				<text>{{item}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'searchWrap',
		props: {
			title: String,
			list: Array
		},
		data() {
			return {
				
			}
		},
		methods: {
			itemClick(index, item) {
				this.$emit('itemClick', index, item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search { padding:$uni-padding-10 0;
		.wrap {
			.img-wrap {
				width: 32rpx;
				height: 32rpx; 
				.icon{color:$uni-text-color-grey;font-size:30rpx; }
			}
		}
		.search-list {
			.item {
				display: inline-block;
				padding: 0 $uni-padding-20;
				height: 40rpx;
				background: #f4f4f4;
				border-radius: 20rpx;
				font-size: $uni-font-size-base;
				color: $uni-font-color-goods;
				margin-right: $uni-margin-20;
				margin-bottom: $uni-margin-20;
			}
		}
	}
</style>
