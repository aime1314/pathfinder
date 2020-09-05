<template>
	<view class="user-setting-addressList">
		<view  class="Flex-box" v-for="(item, index) in consigneeInfoList" :key="index">
			<view class="Flex-sb contantMsg" @tap="goBack(item.id)">
				<view>{{item.fullname}}</view>
				<view>{{item.mobile.substring(0,4-1)+'****'+item.mobile.substring(6+1)}}</view>
			</view>
			<view  class="Flex-fs addressMsg"  @tap="goBack(item.id)">
				<view :class="item.defaultAddress == 0 ? 'tip' :'tip2'" v-if="item.tag || item.defaultAddress == 0 "><text>{{item.defaultAddress == 0 ? '默认' :item.tag}}</text></view>
				<view class="addressShow">{{item.province}}{{item.city}}{{item.district}}{{item.fullAddress}}</view>
			</view>
			<view  class="Flex-sb addsetMsg" @tap="goUpdateAddress(item.id)">
				<view>
					&nbsp;
				</view>
				<view><text class="icon font_family icon-bianji"></text>编辑</view>
			</view>
		</view>
		<com-nodata v-if="consigneeInfoList && consigneeInfoList.length == 0"></com-nodata>
		
		
		<view class="Flex-BtnBox addressBtnBox">
			<button class="Flex-Btn-lg" @tap="goAddressnew">+ 新建收货地址</button>
		</view>
		
		

	</view>
</template>

<script>
	let Base64 = require('js-base64').Base64;
	export default {
		data() {
			return {
				title: '选择地址',
				consigneeInfoList:[],
				acid:'',
				backUrl:''
			}
		},
		onLoad(e) {
			this.acid = e.id;
			if(!this.acid){
				this.acid = uni.getStorageSync("USERDATA").acid+"";
			}
			this.backUrl = e.backUrl;
			this.getConsigneeInfoList();
		},
		methods: {
			goAddressnew(){
				uni.navigateTo({
					url: "/pages/user/setting/addressnew?acid="+this.acid
				});
			},
			//修改地址
			goUpdateAddress(id){
				uni.navigateTo({
					url: "/pages/user/setting/editAddress?id="+Base64.encode(id)+"&acid="+this.acid
				});
			},
			
			//获取用户收货地址列表
			getConsigneeInfoList(){
				this.$memberApi.getConsigneeInfoList(this.acid).then(res => {
					if(res && res.result && res.code === 100){
						this.consigneeInfoList = res.result
					}
				});
			},
			goBack(id){
				if(this.backUrl){
					uni.navigateTo({
						url:this.backUrl+"?addressId="+id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-setting-addressList{ padding-top:$uni-padding-30;
		.contantMsg{padding-bottom: $uni-padding-20;}
		.addressMsg{align-items:initial; align-content: initial;  padding-bottom:$uni-padding-10;
			.tip{width:120rpx; text-align: left; font-size:$uni-font-size-sm;
				text{display: inline-block; text-align: center; background: $uni-bg-color-them; color:$uni-text-color-inverse; width: 50rpx; height:42rpx; line-height: 42rpx; padding:0 $uni-padding-20; border-radius:21rpx;}
			}
			.tip2{width:120rpx; text-align: left; font-size:$uni-font-size-sm;
				text{display: inline-block; text-align: center; background: #333333; color:$uni-text-color-inverse; width: 50rpx; height:42rpx; line-height: 42rpx; padding:0 $uni-padding-20; border-radius:21rpx;}
			}
			.addressShow{flex: 1; line-height: 42rpx;}
		}
		.addsetMsg{padding-top: $uni-padding-20; border-top:solid .01rpx $uni-border-color; margin:0;
			.icon{margin-right:$uni-margin-10; color:$uni-text-color-them;}
			.icon2{margin-right:$uni-margin-10; color:$uni-text-color-grey;}
		}
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
