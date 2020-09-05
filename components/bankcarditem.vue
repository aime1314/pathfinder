<template>
	<view class="bankcardListBox">
		<view class="Flex-box Flex-fs" v-for="(item,index) in bankcard" :key="index" :class="item.class">
			<view class="bankPic"><view class="cardpic"><image :src="item.pic" mode="widthFix"></image></view></view>
			<view class="bankCardMsgBox">
				<view class="bankName">{{item.name}} <view class="bankCardType">{{item.type}}</view></view>
				<view class="backCardNumber">{{item.number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'bankcardlist',
		props: {
			bankcard: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.bankcardListBox{
		.bankPic{width: 100rpx; padding-right:$uni-padding-30; padding-top:15rpx;
			.cardpic{display: block; background: $uni-bg-color; width: 55rpx; height:55rpx; border-radius:50%; padding:6rpx;}
		}
		.bankCardMsgBox{flex: 1;
			.bankName,.backCardNumber{display: block;}
			.bankName{font-size: $uni-font-size-lg; font-weight: bold; padding-top:$uni-padding-20; display: inline-block;}
			.bankCardType{font-size: $uni-font-size-sm; font-weight: normal; margin-left:$uni-margin-30; display: inline-block;}
			.backCardNumber{font-size: $uni-font-size-40; padding:$uni-padding-30 0;}
		}
		.CMB{background: linear-gradient(to right, #E34131, #FF7366); color:$uni-text-color-inverse; align-items:initial;}
		.ABC{background: linear-gradient(to right, #35988d, #009988); color:$uni-text-color-inverse; align-items:initial;}
		.CCB{background: linear-gradient(to right, #0d409b, #2154b0); color:$uni-text-color-inverse; align-items:initial;}
	}
</style>
