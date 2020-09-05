<template>
	<view class="memberMsgBox Flex-fs">
		<view class="memberMsgList" :class="membercurron == index? 'curron':'' " v-for="(item ,index) in membertype" :key="index" @tap="channgeType(index)">
			<view class="memberName">{{item.cardType}}</view>
			<view class="memberGift">{{item.salesTitle}}</view>
			<view class="memberMoney">¥<text>{{item.realPrice}}</text></view>
			<view class="memberMoney2">¥ {{item.markPrice}}</view>
			<text class="memberListTips">超值</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MemberType',
		props: {
			membertype: {
				type: Array,
				default: () => {
					return []
				}
			},
			channgeType:{},
			membercurron:{}
		},
		data() {
			return {
				loadingImg: '',
				errorImg: ''
			};
		},
		components: {
			
		},
		methods:{
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.memberMsgBox{width: auto; overflow-x: scroll; margin:0 $uni-margin-30 $uni-margin-30 $uni-margin-30; padding-top:$uni-padding-20;
		.memberMsgList{border: solid 1rpx #FAFAFA; position: relative; margin: 0 $uni-margin-10; text-align: center; border-radius: $uni-border-radius-base; padding: $uni-padding-20 0; background: #FAFAFA;
		.memberName{font-weight: bold; cursor: pointer; font-size:$uni-font-size-lg;}
		.memberGift{color:$uni-text-color-grey; line-height: 42rpx; font-size:$uni-font-size-sm; padding: $uni-padding-10; white-space: nowrap; }
		.memberMoney{color: #FF4926;text{font-size: $uni-font-size-40; margin-left:$uni-margin-10;}}
		.memberMoney2{padding-top: $uni-padding-20; color: $uni-text-color-grey; text-decoration: line-through;}
		.memberListTips{display: block; width: 100rpx; height:68rpx; line-height:68rpx; text-align: left; padding-left:$uni-padding-10; position: absolute; left: 0; top: 0; background: url(https://cdn.colourfulchina.com/nwsh/static/images/gift/memberListTips.png) left top no-repeat; background-size: 100%; color: #fff; font-size:$uni-font-size-sm;}
	}
		.memberMsgList.curron{border: solid 1rpx #FF974C; background: rgba(255, 252, 211, 0.6);}
		.memberMsgList:first-child{margin-left:none;}
	}
</style>
