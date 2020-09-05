<template>
   <view class="setHome">
	   <view class="personMsglistbox">
		   <view class="item">
			   <view class="title">设置交易密码</view>
			   <input placeholder="请输入交易密码" placeholder-class="ploaderstyle" />
		   </view>
		   <view class="item">
			   <view class="title">确认交易密码</view>
			   <input placeholder="请再次输入交易密码" placeholder-class="ploaderstyle" />
		   </view>
	   </view>
	   <view class="Flex-BtnBox addressBtnBox">
	   	<button class="Flex-Btn-lg" @tap="goNext">确认提交</button>
	   </view>
	   
	   
   </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			goNext(){
				uni.navigateTo({
					url:'./stages'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.setHome{
		.personMsglistbox{background: $uni-bg-color; padding:$uni-padding-20 $uni-padding-30;
			.item{border-bottom: solid 1rpx $uni-border-color; padding:$uni-padding-30 0; color:$uni-text-color;
				.title{padding-bottom: $uni-padding-20;}
				input{color: $uni-text-color;}
				.ploaderstyle{font-size:26rpx; color:$uni-text-color-placeholder;}
			}
			.itemCurron{color:$uni-text-color-title}
			.icon{font-size: $uni-font-size-sm;}
			.item:last-child{border-bottom: none;}
		}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
