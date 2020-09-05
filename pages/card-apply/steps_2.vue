<template>
   <view class="step2Home">
	   <view class="u-stepsBox stepMsgbox">
			<u-steps :current="current" :list="steps" :mode="mode" :icon="icon"></u-steps>
	   </view>
	   <view class="stepMSgtip">
		   为了风控审核及贷后管理，请填写 2 位近 6 个月内的常用联系人
	   </view>
	   <view class="titleBox">联系人1</view>
	   <view class="personMsglistbox">
		   <view class="item">
			   <view class="title">手机号码</view>
			   <input placeholder="请输入联系人的常用手机号" placeholder-class="ploaderstyle" />
		   </view>
		   <view class="item">
			   <view class="title">真实姓名</view>
			   <input placeholder="请输入联系人姓名" placeholder-class="ploaderstyle" />
		   </view>
		   <view class="item">
			   <view class="title">关系</view>
			   <view class="Flex-sb" @tap="selecttypeFun(1)">
				   <text :class="relation == '请选择与联系人的关系'?'text':'itemCurron'">{{relation}}</text>
				   <text class="icon font_family icon-tiaozhuan"></text>
			   </view>
		   </view>
	   </view>
	   <view class="titleBox">联系人2</view>
	   <view class="personMsglistbox">
	   		   <view class="item">
	   			   <view class="title">手机号码</view>
	   			   <input placeholder="请输入联系人的常用手机号" placeholder-class="ploaderstyle" />
	   		   </view>
	   		   <view class="item">
	   			   <view class="title">真实姓名</view>
	   			   <input placeholder="请输入联系人姓名" placeholder-class="ploaderstyle" />
	   		   </view>
	   		   <view class="item">
	   			   <view class="title">关系</view>
	   			   <view class="Flex-sb" @tap="selecttypeFun(2)">
	   				   <text :class="relation2 =='请选择与联系人的关系'?'text':'itemCurron'">{{relation2}}</text>
	   				   <text class="icon font_family icon-tiaozhuan"></text>
	   			   </view>
	   		   </view>
	   </view>
	   <view class="Flex-BtnBox addressBtnBox">
	   	<button class="Flex-Btn-lg" @tap="goNext">下一步</button>
	   </view>
	   
	   <u-picker
	   	:mode="mode2"
	   	v-model="show"
	   	@confirm="confirm"
	   	:defaultSelector="defaultSelector"
	   	:range="range"
	   	:range-key="rangKey"
	   	@columnchange="columnchange"
	   ></u-picker>
	   
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
				relation:'请选择与联系人的关系',
				relation2:'请选择与联系人的关系',
				show:false,
				rangKey: 'name',
				mode2: 'selector',
				range:['夫妻','父子/女','朋友','其他'],
				defaultSelector: [0],
				currontype:0,
			}
		},
		onLoad() {
			this.stepChange(1)
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
			
			selecttypeFun(index){
				this.currontype = index
				this.show = true
			},
			confirm(e) {
				if(this.currontype == 1){
					this.relation = this.range[e[0]]
				}else{
					this.relation2 = this.range[e[0]]
				}
			},
			
			goNext(){
				uni.navigateTo({
					url:'./steps_3'
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
		.titleBox{padding:$uni-padding-30; color:$uni-text-color-grey}
		.personMsglistbox{background: $uni-bg-color; padding:0 $uni-padding-30;
			.item{border-bottom: solid 1rpx $uni-border-color; padding:$uni-padding-30 0; color:$uni-text-color;
				.text{color: $uni-text-color-placeholder;}
				.title{padding-bottom: $uni-padding-20;}
				input{color: $uni-text-color;}
				.ploaderstyle{font-size:26rpx; color:$uni-text-color-placeholder;}
				.itemCurron{color:$uni-text-color-title}
				.icon{font-size: $uni-font-size-sm; color:$uni-text-color-grey;}
			}
			.item:last-child{border-bottom: none;}
		}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
