<template>
   <view class="stepHome">
	   <view class="u-stepsBox stepMsgbox">
			<u-steps :current="current" :list="steps" :mode="mode" :icon="icon"></u-steps>
	   </view>
	   <view class="stepMSgtip">
		   为满足风控审核及信息披露要求，请填写真实、有效、完整的信息，以免影响借款结果
	   </view>
	   <view class="titleBox">个人资料</view>
	   <view class="personMsglistbox">
		   <view class="Flex-sb item" @tap="selecttypeFun(1)">
			   <view :class="education=='请选择学历信息'?'':'itemCurron'">{{education}}</view>
			   <text class="icon font_family icon-tiaozhuan"></text>
		   </view>
		   <view class="Flex-sb item" @tap="selecttypeFun(2)">
			   <view :class="address=='请选择居住地址'?'':'itemCurron'">{{address}}</view>
			   <text class="icon font_family icon-tiaozhuan"></text>
		   </view>
		   <view class="Flex-sb item" @tap="selecttypeFun(3)">
			   <view :class="marriage=='请选择婚姻状况'?'':'itemCurron'">{{marriage}}</view>
			   <text class="icon font_family icon-tiaozhuan"></text>
		   </view>
	   </view>
	   <view class="titleBox">工作资料</view>
	   <view class="personMsglistbox">
		   <view class="Flex-sb item"  @tap="selecttypeFun(4)">
			   <view :class="job=='请选择工作性质'?'':'itemCurron'">{{job}}</view>
			   <text class="icon font_family icon-tiaozhuan"></text>
		   </view>
		   <view class="Flex-sb item"  @tap="selecttypeFun(5)">
			   <view :class="industry=='请选择行业属性'?'':'itemCurron'">{{industry}}</view>
			   <text class="icon font_family icon-tiaozhuan"></text>
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
				education:'请选择学历信息',
				address:'请选择居住地址',
				marriage:'请选择婚姻状况',
				job:'请选择工作性质',
				industry:'请选择行业属性',
				show:false,
				rangKey: 'name',
				mode2: 'selector',
				range:[],
				defaultSelector: [0],
				currontype:0,
			}
		},
		onLoad() {
			this.stepChange(0)
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
				if(index == 1){
					this.mode2 = 'selector'
					this.range = ['大专','本科','研究生','其他']
				}else if(index == 2){
					this.mode2 = 'region'
				}else if(index == 3){
					this.mode2 = 'selector'
					this.range = ['已婚','未婚','保密']
				}else if(index == 4){
					this.mode2 = 'selector'
					this.range = ['自由职业','全职','其他']
				}else if(index == 5){
					this.mode2 = 'selector'
					this.range = ['私企','国营','事业单位','其他']
				}
			},
			confirm(e) {
				if(this.currontype == 1){
					this.education = this.range[e[0]]
				}else if(this.currontype == 2){
					this.address = e.province.label + '-' + e.city.label + '-' + e.area.label
				}else if(this.currontype == 3){
					this.marriage = this.range[e[0]]
				}else if(this.currontype == 4){
					this.job = this.range[e[0]]
				}else if(this.currontype == 5){
					this.industry = this.range[e[0]]
				}	
			},
			goNext(){
				uni.navigateTo({
					url:'./steps_2'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.stepHome{
		.stepMsgbox{background: $uni-bg-color; padding:$uni-padding-30;}
		.u-stepsBox{margin: 0;}
		.stepMSgtip{color: #B88739; background: #FEF8F1;padding:$uni-padding-20 $uni-padding-30; font-size:$uni-font-size-sm;}
		.titleBox{padding:$uni-padding-30;}
		.personMsglistbox{background: $uni-bg-color; padding:0 $uni-padding-30;
			.item{border-bottom: solid 1rpx $uni-border-color; padding:$uni-padding-30 0; color:$uni-text-color-grey;}
			.itemCurron{color:$uni-text-color-title}
			.icon{font-size: $uni-font-size-sm;}
			.item:last-child{border-bottom: none;}
		}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
