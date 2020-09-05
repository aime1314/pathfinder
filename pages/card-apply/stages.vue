<template>
	<view class="stagesHome">
		<view class="Flex-fs MsgBox">
			<view class="stageMsgBox" :class="curron== 0? 'curron':''" @tap="setStages(0)">
				<view class="stageMsg-date">12期</view>
				最低消费：12元
				<view class="icon font_family icon-fit"></view>
			</view>
			<view class="stageMsgBox" :class="curron== 1? 'curron':''"  @tap="setStages(1)">
				<view class="stageMsg-date">9期</view>
				最低消费：8元
				<view class="icon font_family icon-fit"></view>
			</view>
			<view class="stageMsgBox" :class="curron== 2? 'curron':''" @tap="setStages(2)">
				<view class="stageMsg-date">6期</view>
				最低消费：6元
				<view class="icon font_family icon-fit"></view>
			</view>
			<view class="stageMsgBox" :class="curron== 3? 'curron':''" @tap="setStages(3)">
				<view class="stageMsg-date">3期</view>
				最低消费：4元
				<view class="icon font_family icon-fit"></view>
			</view>
		</view>
		<view class="Flex-sb MsgBox">
			<view class="stageSizeTitle">分期利率</view>
			<view class="stageSize">2.7 %</view>
		</view>
		<view class="Flex-BtnBox addressBtnBox">
			<button class="Flex-Btn-lg" @tap="goResult">提交审核</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
			data() {
				return {
					curron:0, //默认选择
				}
			},
			components: {
				
			},
			onLoad() {
	
			},
			methods: {
				//选择分期
				setStages(id){
					this.curron = id
				},
				//结果
				goResult(){
					uni.navigateTo({
						url:'./result'
					})
				},
			}
		}
	</script>

<style lang="scss" scoped>
	.stagesHome{
		.MsgBox{background: $uni-bg-color; padding:$uni-padding-20 $uni-padding-30; flex-wrap: wrap;
			.stageMsgBox{width:47%; margin:15rpx; padding:$uni-padding-30; background: $uni-bg-color-grey; border-radius:$uni-border-radius-lg; border:solid 1rpx $uni-bg-color-grey;  color:$uni-text-color-grey; position: relative;
				.stageMsg-date{font-size: $uni-font-size-40; padding-bottom:$uni-padding-10;  color:$uni-text-color;}
				.icon{display: none; position: absolute; top:50%; right:30rpx; transform: translateY(-100%);}
			}
			.stageMsgBox.curron{background: rgba(235, 38, 19, 0.1); border:solid 1rpx rgba(235, 38, 19, 0.2); color:rgba(235, 38, 19, 1); 
				.stageMsg-date{font-size: $uni-font-size-40; padding-bottom:$uni-padding-10;  color:rgba(235, 38, 19, 1);}
			}
			.stageMsgBox.curron{.icon{display: block; font-size:$uni-font-size-40;}}
			.stageMsgBox:nth-child(odd){margin-left:0}
			.stageMsgBox:nth-child(even){margin-right:0}
			.stageSizeTitle{}
			.stageSize{padding-bottom: $uni-padding-20; color:$uni-text-color-grey; padding-right:$uni-padding-30;}
		}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
		
	}
</style>
