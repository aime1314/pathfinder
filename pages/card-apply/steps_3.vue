<template>
   <view class="step2Home">
	   <view class="u-stepsBox stepMsgbox">
			<u-steps :current="current" :list="steps" :mode="mode" :icon="icon"></u-steps>
	   </view>
	   <view class="stepMSgtip">
		   请填写储蓄卡，用于银行卡身份认证
	   </view>
	   <view class="titleBox">认证收款卡</view>
	   <view class="personMsglistbox">
		   <view class="item">
			   <view class="title">持卡人姓名</view>
			   <input placeholder="请输入持卡人姓名" placeholder-class="ploaderstyle" />
		   </view>
		   <view class="item">
			   <view class="title">身份证号</view>
			   <input placeholder="请输入持卡人身份证号" placeholder-class="ploaderstyle" />
		   </view>
		   <view class="item">
			   <view class="title">银行卡预留手机号</view>
			   <input placeholder="请输入银行卡预留手机号" placeholder-class="ploaderstyle" />
		   </view>
		   <view class="item">
			   <view class="title">银行卡号</view>
			   <input placeholder="请输入银行卡号" placeholder-class="ploaderstyle" />
		   </view>
	   </view>
	   <view class="Flex-BtnBox addressBtnBox">
	   	<button class="Flex-Btn-lg" @tap="goNext">下一步</button>
	   </view>
	   
	   
   </view>
</template>

<script>
	export default {
		data() {
			return {
				steps: [{
					name: '基本资料认证'
				}, {
					name: '联系人认证'
				}, {
					name: '储蓄卡认证'
				},],
				current: 0,
				icon: 'checkmark',
				mode: 'number',
				education:'',
				address:'',
				marriage:'',
				job:'',
				industry:''
			}
		},
		onLoad() {
			this.stepChange(2)
		},
		methods: {
			modeChange(index) {
				this.mode = index == 0 ? 'number' : 'dot';
			},
			stepChange(index) {
				this.current = index == 0 ? 0 : index == 1 ? 1 : index == 2 ? 2 : 3;
			},
			iconChange(index) {
				this.icon = index == 0 ? 'checkmark' : 'map-fill';
			},
			goNext(){
				uni.navigateTo({
					url:'./set'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.step2Home{
		.stepMsgbox{background: $uni-bg-color; padding:$uni-padding-30;}
		.u-stepsBox{margin: 0;}
		.stepMSgtip{color: #B88739; background: #FEF8F1;padding:$uni-padding-20 $uni-padding-30; font-size:$uni-font-size-sm;}
		.titleBox{padding:$uni-padding-30;}
		.personMsglistbox{background: $uni-bg-color; padding:0 $uni-padding-30;
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
