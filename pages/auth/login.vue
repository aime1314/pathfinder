<template>
	<view class="loginHome">
		<view class="loginbanner">
			<view class="loginMsgBox">
				<view class="Flex-fs linebox">
					<view class="icon font_family icon-phone"></view>
					<view class="loginInput"><u-input v-model="phone" type="number" :customStyle="customstyle" placeholder="请输入手机号" class="telshow" :border= "false" maxlength="11" /></view>
				</view>
				<view class="Flex-fs linebox">
					<view class="icon font_family icon-lock"></view>
					<view class="Flex-fs loginInput">
						<u-input v-model="smscode" type="text" placeholder="验证码" :customStyle="customstyle" class="codeshow" :border= "false" maxlength="6" />
						<view class="sendcodeBox" :class="{active : !getCodeisWaiting}" @click="getCode()">{{getCodeText}}</view>
					</view>
				</view>
			</view>
			<view class="Flex-BtnBox addressBtnBox">
				<button class="Flex-Btn-lg" @tap="login">立即登录</button>
			</view>
			<view class="loginRulue">
			   <view>未注册用户登录后将自动创建客乐芙账号，</view>登录即表示您已同意<text>《客乐芙用户服务协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				title: '登录注册',
				openId: "", //微信
				unionId: "",
				userId: "",
				phone:'',//手机号
				smscode:'',//验证码
				getCodeText: "获取验证码",
				getCodeisWaiting: false,
				// #ifdef MP-WEIXIN
				type: 1,
				// #endif
				// #ifdef MP-ALIPAY
				type: 2,
				// #endif
				domainname: location.host.split(".")[1]+"."+location.host.split(".")[2], //一级域名
				customstyle:{"color":"#ffffff","font-size":"40rpx","letter-spacing":"5rpx"},
				backrullink:'', //返回原地址
			}
		},
		onLoad(e) {
			this.backrullink = e.backurl
		},
		methods: {
			// 获取验证码
			getCode() {
				let that = this
				if (that.getCodeisWaiting) return;
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phone))) {
					return uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
				}
				let config = {
					phone: that.phone
				}
				that.getCodeText = "发送中...";
				that.getCodeisWaiting = true;
				uni.request({
					url: that.$host+'/yangjian/exercise/createSmsCode?phone='+that.phone,
					method:"POST",
					headers: { 'Content-type': 'application/x-www-form-urlencoded' },
					success(res) {
						console.log(res);
						if(res.data.code == 100) {
							uni.showToast({
								title: "验证码已发送",
								icon: "none"
							});
							that.getCodeisFocus = true;
							that.setTimer();
						}else {
							uni.showToast({
								title: res.message,
								icon: "none"
							});
							that.getCodeText = "获取验证码";
							that.getCodeisWaiting = false;
						}
					}
				})
				
			},
			// 获取验证码倒计时
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeText = "获取验证码";
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
			
				}, 1000)
			},
			toggleRead() {
				this.isRead ? this.isRead = false : this.isRead = true;
			},
			login() {
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					return uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
				}
				if (this.smscode.length  == 0) {
					return uni.showToast({
						title: '请填写验证码',
						icon: "none"
					});
				}
				
				let config = {
					phone: this.phone,
					smsCode: this.smscode,
					channel:'NWSH',
					type: this.type,
					// #ifdef MP-WEIXIN
					openid: this.openId,
					unionid: this.unionId,
					nickName: JSON.parse(uni.getStorageSync("userInfo")).nickName || "",
					userPhoto: JSON.parse(uni.getStorageSync("userInfo")).avatar || "",
					// #endif
					// #ifdef MP-ALIPAY
					zfb_user_id: this.userId
					// #endif
				}
				this.$memberApi.login(config).then(res => {
					if(res.code == 100) {
						uni.setStorageSync("USERDATA", res.result);
						uni.setStorageSync("TOKEN", res.result.loginToken)
						this.$store.commit("getUserInfo", res.result)
						if(this.backrullink){
							// uni.navigateTo({
							// 	url:this.backrullink
							// })
							window.location.href = this.backrullink
						}else{
							uni.switchTab({
								url: "/pages/index/index"
							});
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loginHome {background: url(https://cdn.colourfulchina.com/nwsh/static/images/basebg.jpg) left top no-repeat; background-size: cover; position: absolute; width:100%; height:100%; left:0; top:0;
		.loginbanner{position: absolute; width: 100%; left:0; top:50%; transform: translateY(-50%);}
		.loginMsgBox {padding:$uni-padding-30; margin-bottom: $uni-margin-30;
			.linebox{padding:$uni-padding-20 0;}
			.icon{display: inline-block ; width: 62rpx; height:102rpx; text-align: center; line-height:102rpx; color:#eee; overflow: hidden; font-size:50rpx; text-align: left;}
			.loginInput{flex:1; border-bottom:solid 1rpx $uni-border-color; position: relative; padding-bottom:$uni-padding-10;}
			.telshow{margin: $uni-margin-20; padding:$uni-padding-20 0; font-size:$uni-font-size-lg; color:#FFFFFF;}
			.codeshow{margin: $uni-margin-20; padding:$uni-padding-20 0; font-size:$uni-font-size-lg;}
			.sendcodeBox{border: solid 1rpx #FFFFFF; padding: 0 $uni-padding-20; height:46rpx; line-height: 42rpx; border-radius:23rpx; color:$uni-text-color-inverse;}
		}
		.loginRulue{padding:$uni-padding-30; text-align: center; color:#F1F1F1; line-height: 46rpx; margin-top:$uni-margin-30;
			text{color: $uni-text-color-them;}
		}
	}
</style>
