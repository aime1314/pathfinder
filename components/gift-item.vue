<template>
	<view class="Flex-box giftListBox">
		<image :src="gift.imgUrl" mode="widthFix" class="img"></image>
		<view class="objectMsgBox">
			<text class="object-title">{{gift.projectName}}</text>
			<text class="object-time">{{gift.endDate}}</text>
		</view>
		<view class="Flex-sb objectTypeBox" v-for="(item,index) in gift.projectGroupList" :key="index" v-slot="item,index">
			<view class="objectTypeList-pic"><image
			 mode="widthFix"></image></view>
			<view class="objectTypeList">
				<text class="objectTypeList-Name">{{item.title}}</text>
				<text class="objectTypeList-Number">{{item.times}}</text>
			</view>
			<view class="bookingStatus">
				<button v-show="item.times>0">立即预约</button>
			</view>
		</view>
	</view>
	</view>
	</template>

<script>
	export default {
		name: 'giftItem',
		props: {
			imgUrl: {
				type: String,
				default: '',
			},
			projectName:{
				type:String
			},
			endDate:{
				type:String,
				default:''
			},
			title:{
				type:String
			},
			times:{
				type:String
			},
			projectGroupList:
			{
				type: Object,
				default: () => {
					return {}
				}
			},
			gift: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components: {
		},
		data() {
			return {
				loadingImg: '',
				errorImg: ''
			};
		},
		onLoad() {
		}
	}
</script>

<style lang="scss" scoped>	
	.giftListBox{padding:0;
		.objectMsgBox{margin:$uni-margin-30 $uni-margin-30 $uni-margin-20 $uni-margin-30 ; border-bottom:solid 1rpx $uni-border-color;
			.object-title{font-weight: bold; display: block; font-size:$uni-font-size-base;}
			.object-time{color: $uni-text-color-grey; font-size:$uni-font-size-sm; display: block; padding:$uni-padding-10 0 $uni-padding-20 0;}
		}
		.objectTypeBox{padding:0 $uni-padding-30 $uni-padding-30 $uni-padding-30;
			.objectTypeList-pic{width: 55rpx;}
			.objectTypeList{flex: 1; padding-left: $uni-padding-20;
				.objectTypeList-Name{display: block;}
				.objectTypeList-Number{color: $uni-text-color-grey; font-size:$uni-font-size-sm; padding:$uni-padding-10 0;}
			}
			.bookingStatus{width: 160rpx;
				button{border:solid 1rpx $uni-bg-color-them; color:$uni-text-color-them; padding:0 $uni-padding-20; height:48rpx; line-height: 48rpx; border-radius:24rpx;}
			}
		}
	}
</style>
