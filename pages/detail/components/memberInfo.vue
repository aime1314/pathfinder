<template>
	<view class="member-info">
		<view class="item" v-for="(item, index) in list" :key="index">
			<text>{{item.title}}</text>
			<view class="right">
				<text class="des" @tap="goToBankCard">{{item.text}}</text>
				<com-icon name="icon-tiaozhuan" color="#603308"></com-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'memberInfo',
		props: {
			list: {
				type: Array,
				default: () => {
					return [{title: '会员省¥200，再送¥279红包', text: '立即开卡'}]
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			//离开开卡
			goToBankCard(){
				uni.switchTab({
					//"立即开卡"页面完成后切换
					url: '/pages/gift/gift'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.member-info {
	.item {
		color: #603308;
		font-size: $uni-font-size-base;
		width:690rpx;
		height:70rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 $uni-padding-20;
		background:linear-gradient(90deg,rgba(251,239,229,1) 0%,rgba(224,195,162,1) 100%);
		border-radius:8rpx;
		.right {
			.des {
			}
		}
	}
}
</style>
