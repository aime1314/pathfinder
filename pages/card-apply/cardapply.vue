<template>
	<view class="cardapplyHome">
		<view class="MsgBox">
			<view class="cardtitle">请拍摄并上传身份证</view>
			<view class="Flex-sb identityPic">
				<view class="picshow">
					<image src="https://cdn.colourfulchina.com/nwsh/static/images/card/card2.png" mode="widthFix"></image>
					身份证正面
				</view>
				<view class="picshow">
					<image src="https://cdn.colourfulchina.com/nwsh/static/images/card/card1.png" mode="widthFix"></image>
					身份证反面
				</view>
			</view>
		</view>
		<view class="cardMsgBoxtitle">请确认你的身份证号</view>
		<view class="MsgBox">
			<view class="Flex-sb cardmsgList">
				<view class="lableName">姓名</view>
				<view>韩敏</view>
			</view>
			<view class="Flex-sb cardmsgList">
				<view class="lableName">身份证号</view>
				<view>110102********888X</view>
			</view>
		</view>
		
		<view class="Flex-BtnBox addressBtnBox">
			<button class="Flex-Btn-lg" @tap="goStages">确认提交</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
			data() {
				return {
					
				}
			},
			components: {
				
			},
			onLoad() {
	
			},
			methods: {
				//设置分期
				goStages(){
					uni.navigateTo({
						url:'./steps'
					})
				},
			}
		}
	</script>
</script>

<style lang="scss" scoped>
	.cardapplyHome{
		.MsgBox{background: $uni-bg-color; padding:$uni-padding-20 $uni-padding-30;
			.identityPic{ text-align: center; padding:$uni-padding-10 0;}
			.picshow{flex: 1; margin:0 $uni-margin-20;
				image{display: block; margin:$uni-margin-20 0;}
			}
			.picshow:first-child{margin-left: 0;}
			.picshow:last-child{margin-right: 0;}
		}
		.cardtitle{padding-top:$uni-padding-20;}
		.cardMsgBoxtitle{padding:$uni-padding-30 $uni-padding-30; color:$uni-text-color-grey;}
		.cardmsgList{padding-bottom:$uni-padding-30; margin-bottom:$uni-margin-30; border-bottom:solid 1rpx $uni-border-color; color:$uni-text-color-grey;
			.lableName{color: $uni-text-color-title;}
		}
		.cardmsgList:last-child{ margin-bottom:0; padding-bottom:0; border-bottom:none;}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
