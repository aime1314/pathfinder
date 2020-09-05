<template>
	<view class="addbackcardHome">
		<view class="Flex-box">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" class="itemListType" prop="name"><u-input v-model="form.name" placeholder="请输入真实姓名" /></u-form-item>
				<u-form-item label="身份证号" prop="cardnumber"><u-input v-model="form.cardnumber" placeholder="请输入身份证号" /></u-form-item>
				<u-form-item label="银行卡号" prop="bankcardnumber" ><u-input v-model="form.bankcardnumber" placeholder="请输入银行卡号" /></u-form-item>
				<!-- <u-form-item label="CVC码" prop="safenumber" ><u-input v-model="form.safenumber"  placeholder="请输入银行号最后三位"  /></u-form-item>
				<u-form-item label="有效期至" prop="datenumber" ><u-input v-model="form.datenumber" placeholder="请输入有效期"  /></u-form-item> -->
				<u-form-item label="手机号" prop="mobile" ><u-input v-model="form.mobile" placeholder="请输入手机号" /></u-form-item>
				<u-form-item label="验证码" prop="smscode"><u-input v-model="form.smscode"  placeholder="请输入验证码" /><view class="smsCode">获取验证码</view></u-form-item>
				<u-form-item label="设为默认" style="padding:0"><u-switch slot="right" v-model="switchVal" style="position: relative; margin-top: 20rpx;"></u-switch></u-form-item>
				
			</u-form>
			
		</view>
		<u-picker v-model="show" mode="region" :params="params"></u-picker>
		
		<view class="Flex-BtnBox addressBtnBox">
			<button class="Flex-Btn-lg" @tap="submit">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '新增地址',  //标题
				form: {
					name:'',//收货人
					mobile:'' ,//收货人手机
					cardnumber:'',//身份证号
					bankcardnumber:'',//银行卡号
					safenumber:'',//最后三位数
					datenumber:'', //有效期
					smscode:'',//验证码
					defualt:''//设为默认地址
				}, //表单提交
				switchVal:false,  //默认地址
				show: false,  //区域选择
				params: {
					province: true,  //省
					city: true,  //市
					area: true  //区
				},
				props:{
					
				},
				rules: {  //规则
					name: [
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change'
						},
						{
							required: true,
							message: '请输入姓名',
							trigger: ['blur', 'change']
						}
					]
				},
			}
		},
		onLoad() {

		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
				uni.navigateTo({
					url: "/pages/user/bankcard/bankcard"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "uview-ui/index.scss";
	.addbackcardHome{ padding-top:$uni-padding-30;
		.smsCode{border:solid 1rpx $uni-border-color; height:42rpx; line-height: 42rpx; border-radius: 21rpx; width: 180rpx; margin-left: $uni-margin-20; text-align: center; color:$uni-text-color-grey; box-shadow: none;}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
