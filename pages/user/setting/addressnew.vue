<template>
	<view class="user-setting-addressNew">
		<view class="Flex-box">
			<u-form :model="formdata" :rules="rules" ref="uForm">
				<u-form-item label="收货人" class="itemListType" prop="name"><u-input v-model="formdata.name" placeholder="请输入收货人姓名"/></u-form-item>
				<u-form-item label="手机号码" prop="mobile" ><u-input v-model="formdata.mobile" placeholder="请输入手机号码" /></u-form-item>
				<u-form-item label="所在地区" prop="region" label-width="150">
					<u-input  type="select" :select-open="pickerShow" v-model="formdata.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
				</u-form-item>
				<u-form-item label="详细地址" prop="address"><u-input v-model="formdata.address" placeholder="请输入详细地址" /></u-form-item>
				<u-form-item label="标签">
					<view>
						<view class="Flex-fs addressTag">
							<button 
								v-for="(item,index) in array"
								:key="index"
								:type="pickerIndex == index ? 'primary':'default'" 
								:data-index="index"
								@tap="onSelectType"
							>{{item}}</button>
						</view>
						
						<view class="Flex-fs addressTag">
							<!-- //自定义标签 -->
							<text @click="userDefinedTag" v-show="userDefinedTagShow">+</text>
							<input placeholder="请输入标签(不超过5个字)" placeholder-style="font-size:26rpx;" maxlength="5" v-model="tag" @input = "onKeyInput" v-show="editDefinedTagShow"/>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="默认"  style="padding:0"><u-switch slot="right" v-model="switchVal" style="position: relative; margin-top: 20rpx;"></u-switch></u-form-item>
				
			</u-form>
			
		</view>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		
		<view class="Flex-BtnBox addressBtnBox">
			<button class="Flex-Btn-lg" @tap="submit">保存并使用</button>
		</view>
	</view>
</template>

<script>
	let Base64 = require('js-base64').Base64;
	export default {
		data() {
			return {
				title: '新增地址',  //标题
				array:['家','公司','学校'],
				pickerIndex:10,
				formdata: {
					name:'',//收货人
					mobile:'' ,//收货人手机
					area:'',//省市区
					address:'',//详细地址
					tag:'',//地址标签
					defualt:'',//设为默认地址,
					acid:''
				}, //表单提交
				switchVal:false,  //默认地址
				pickerShow: false,  //区域选择
				id:'', //收货地址id
				userDefinedTagShow:true,
				editDefinedTagShow:false,
				backUrl:'',//跳转地址
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
		onLoad(e) {
			if(e.id !== undefined && e.id !== ''){
				this.id = Base64.decode(e.id)
				//获取收货地址信息
				this.getConsigneeInfo(this.id)
			}
			this.acid = e.acid
			if(!this.acid){
				this.acid = uni.getStorageSync("USERDATA").acid+"";
			}
			this.backUrl = e.backUrl;
			
		},
		methods: {
			// 选择地区回调
			regionConfirm(e) {
				console.log(e)
				this.formdata.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			submit() {
				let data = this.formdata;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if(this.id !== undefined && this.id !== ''){
							//修改
							this.updateAddress(data)
						}else{
							//新增
							this.addAddress(data)
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			//新增地址
			addAddress(data){
				let params={
					userId: this.acid,
					"fullname":data.name,
					"mobile":data.mobile,
					"province": data.region ? data.region.split("-")[0] : '',//省份
					"city":data.region ? data.region.split("-")[1] : '',
					"district":data.region ? data.region.split("-")[2] : '',//区
					"fullAddress":data.address,//详细地址
					"tag":this.tag,//标签
					"defaultAddress": '1' // 0:默认地址;1:非默认地址
				}
				this.$memberApi.addConsigneeInfo(params).then(res => {
					console.log(params)
					if(res && res.result && res.code === 100){
						//新增收货地址成功,返回地址列表页面
						if(this.backUrl){
							uni.navigateTo({
								url:this.backUrl
							})
						}else{
						this.goAddresslist()
						}
					}
				});
			},
			//修改地址
			updateAddress(data){
				let params={
					userId: this.acid,
					"fullname":data.name,
					"mobile":data.mobile,
					"province": data.region ? data.region.split("-")[0] : '',//省份
					"city":data.region ? data.region.split("-")[1] : '',
					"district":data.region ? data.region.split("-")[2] : '',//区
					"fullAddress":data.address,//详细地址
					"tag":this.tag,//标签
					"defaultAddress": this.switchVal?'0':'1' ,// 0:默认地址;1:非默认地址
					"id":this.id
				}
				this.$memberApi.updateConsigneeInfo(params).then(res => {
					console.log(params)
					if(res && res.result && res.code === 100){
						//修改收货地址成功,返回地址列表页面
						this.goAddresslist()
					}
				});
			},
			//获取收货地址信息
			getConsigneeInfo(id){
				this.$memberApi.getConsigneeInfo(id).then(res => {
					if(res && res.result && res.code === 100){
						console.log(res.result)
						this.formdata.name = res.result.fullname
						this.formdata.mobile = res.result.mobile.substring(0,4-1)+'****'+res.result.mobile.substring(6+1)
						this.formdata.area = res.result.province
						this.formdata.address = res.result.fullAddress
						this.switchVal = res.result.defaultAddress == '0'?true : false
					}
				});
			},
			//收货地址管理
			goAddresslist() {
				uni.navigateTo({
					url: "/pages/user/setting/addresslist?id="+this.acid
				});
			},
			onSelectType(e){
				this.editDefinedTagShow = false
				let index = e.currentTarget.dataset.index;
				index = parseInt(index,10);
				this.selectTag(index);
			},
			selectTag(index){
				this.pickerIndex = index;
				this.tag = this.array[index]
			},
			userDefinedTag(){
				this.pickerIndex = 10
				this.userDefinedTagShow = false
				this.editDefinedTagShow = !this.userDefinedTagShow
			},
			onKeyInput(event) {
				this.tag = event.target.value
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "uview-ui/index.scss";
	.user-setting-addressNew{ padding-top:$uni-padding-30;
		.addressTag{width: 100%;
			text{display: inline-block; background:rgba(235, 37, 18, .2); font-size:$uni-font-size-sm; margin:$uni-margin-10; color:$uni-text-color-them; padding:0 $uni-padding-20; height:38rpx; line-height: 38rpx; border-radius:19rpx; width: 50rpx; text-align: center;}
			button{display: inline-block; background:rgba(235, 37, 18, .2); font-size:$uni-font-size-sm; margin:$uni-margin-10; color:$uni-text-color-them; padding:0 $uni-padding-20; height:38rpx; line-height: 38rpx; border-radius:19rpx; text-align: center;}
			button[type='primary']{background:rgba(235, 37, 18, 1); color:$uni-text-color-inverse;}
			}
			input{margin-top: $uni-margin-20;}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
