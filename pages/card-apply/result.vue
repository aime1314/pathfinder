<template>
	<view class="statusHome">
		<view class="resultHome" v-if="waitStatus">
			<view class="resultMsgBox">
				<view class="word">审核中</view>
				<view class="tips">审核中，请耐心等待…</view>
			</view>
			<view class="resultListBox">
				<view class="Flex-sb listMsgBox">
					<view class="titleName">申请时间</view>
					<view>2020-07-13  16:30:24</view>
				</view>
				<view class="Flex-sb listMsgBox">
					<view class="titleName">分期期数</view>
					<view>12期</view>
				</view>
				<view class="Flex-sb listMsgBox">
					<view class="titleName">还款账号</view>
					<view>招商银行 (****)</view>
				</view>
			</view>
		</view>
		
		
		<view class="result2Home" v-if="sucStatus">
			<view class="resultMsgBox">
				<view class="word">申请成功</view>
				<view class="tips">快用极速卡去支付吧</view>
			</view>
			<view class="Flex-box Flex-sb sucmsgbox">
				<view>卡号</view>
				<view>9274853692723 <!--<text>复制</text> --></view>
			</view>
			<view class="Flex-sb paybussiness">
				<view>
					<image src="https://cdn.colourfulchina.com/nwsh/static/icons/share-alipay.png" mode="widthFix"></image>
					绑定支付宝</view>
				<view>
					<a href="weixin://dl/wallet"><image src="https://cdn.colourfulchina.com/nwsh/static/icons/share-wechat.png" mode="widthFix"></image>
					绑定微信支付</a></view>
			</view>
			<view class="Flex-BtnBox addressBtnBox">
				<button class="Flex-Btn-lg" @tap="goCard">我知道了</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data() {
				return {
					waitStatus:true,
					sucStatus:false, //默认选择
					timer:null
				}
			},
			components: {
				
			},
			onLoad() {
				var millisecond = 5
				this.timer = setInterval(() => {
					millisecond = millisecond-1
					if(millisecond <= 0){
						this.waitStatus = false
						this.sucStatus = true
						clearInterval(this.timer)
					}
				},1000)
			},
			methods: {
				//结果
				statuscheannel(){
					this.waitStatus = false
					this.sucStatus = true
				},
				goCard(){
					uni.switchTab({
						url:'/pages/card/card'
					})
				},
			}
		}
	</script>

<style lang="scss" scoped>
	.statusHome{
		.resultHome{background: url(https://cdn.colourfulchina.com/nwsh/static/images/card/wait.png) left top no-repeat; background-size: 100%; padding:$uni-padding-30;
			.resultMsgBox{padding:$uni-padding-30; color:$uni-text-color-inverse; background: url(https://cdn.colourfulchina.com/nwsh/static/images/card/icon_wait.png) right center no-repeat; background-size: 120rpx;
				.word{font-size: $uni-font-size-40; padding-bottom:$uni-padding-10;}
			}
			.resultListBox{background: url(https://cdn.colourfulchina.com/nwsh/static/images/card/cardmsgbg.png) left top no-repeat; background-size: 100%; margin-top:$uni-margin-30; padding:$uni-padding-20 $uni-padding-30;
				.listMsgBox{margin:$uni-margin-20 $uni-margin-20; padding:$uni-padding-20 0; border-bottom:solid 1rpx $uni-border-color; color:$uni-text-color-grey;
					.titleName{color: $uni-text-color;}
				}
				.listMsgBox:last-child{border:none;}
			}
		}
		
		.result2Home{background: url(https://cdn.colourfulchina.com/nwsh/static/images/card/suc.png) left top no-repeat; background-size: 100%; padding:$uni-padding-30;
			.resultMsgBox{padding:$uni-padding-30; margin-top:$uni-margin-30; color:$uni-text-color-inverse; background: url(https://cdn.colourfulchina.com/nwsh/static/images/card/icon_suc.png) right center no-repeat; background-size: 120rpx;
				.word{font-size: $uni-font-size-40; padding-bottom:$uni-padding-10;}
			}
			.sucmsgbox{margin-top:45rpx; padding:$uni-padding-30 $uni-padding-30;
				text{margin-left:$uni-margin-10;}
			}
			.paybussiness{padding:$uni-padding-10 $uni-padding-10;
				view{background: $uni-bg-color; flex:1; text-align: center; padding:$uni-padding-30 0; margin:0 $uni-margin-20;
					image{width: 30%; margin:$uni-margin-10 auto; border-radius: $uni-border-radius-base;}
				}
				a{color: $uni-text-color; text-decoration: none;}
			}
		}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
