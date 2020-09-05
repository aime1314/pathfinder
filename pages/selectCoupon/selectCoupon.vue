<template>
	<com-layout :showNav="false">
		<view class="coupon-list">
			<u-radio-group v-model="selectedItem" :wrap="true"  active-color="#EB2613" @change="selectChange">
				<view class="item Flex-sb" v-for="(item, index) in this.cpnVoucherList" :key="index">
					<view class="left">
						<text class="price-wrap">¥<text class="price">{{item.worth}}</text></text>
						<text class="">{{item.note}}</text>
					</view>
					<view class="center">
						<text>{{item.name}}</text>
						<text class="time">有效期: {{item.bindTime | formatDate}} - {{item.experTime | formatDate}}</text>
					</view>
					<view class="right">
						<u-radio shape="circle" :name="index"></u-radio>
					</view>
				</view>
			</u-radio-group>
		</view>
		<com-bottom rText="确认使用" @confirm="confirm">
			<template v-slot:left>
				<view class="b-left Flex-cen">
					<text>已选择{{selectCount}}张，可抵扣</text>
					<text>¥{{selectWorth}}</text>
				</view>
			</template>
		</com-bottom>
	</com-layout>
</template>

<script>
	import { formatDate } from '../../common/utils/date.js'
	export default {
		data() {
			return {
				selectedItem: '-1',
				addressId:0,
				productId:0,
				backUrl:"",
				cpnVoucherList:[],
				selectWorth:'0',
				selectCount:0,
				cpnVourcherId:-1
			};
		},
		 filters: {
		    formatDate(time) {
		      let date = new Date(time)
		      return formatDate(date, 'yyyy-MM-dd')
		    }
		  },
		onLoad(data) {
			this.addressId = data.addressId;
			this.productId = data.productId;
			this.backUrl = data.backUrl;
			this.getMemCpnVoucherInfoList();
		},
		methods: {
			selectChange(e) {
				if(this.selectedItem>=0){
					this.selectCount =1;
					this.selectWorth = this.cpnVoucherList[this.selectedItem].worth;
					this.cpnVourcherId  =this.cpnVoucherList[this.selectedItem].voucherNum;
				}else{
					this.selectCount =0;
					this.selectWorth='0';
					this.cpnVourcherId = -1;
				}
				
			},
			// 确认使用
			confirm() {
				uni.navigateTo({
					url: this.backUrl+'?productId='+this.productId+"&addressId="+this.addressId+"&cpnVourcherId="+this.cpnVourcherId,
				})
			},
			//获取用户优惠券列表
			getMemCpnVoucherInfoList() {
				let params = {
					acId:  uni.getStorageSync("USERDATA").acid
				}
				this.$couponApi.getMemCpnVoucherList(params).then(res => {
					if (res && res.result) {
						this.cpnVoucherList = res.result;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.coupon-list {
	padding-top: $uni-padding-30;
	margin-bottom: 94rpx;
	.item {
		width:686rpx;
		height:196rpx;
		margin: 0 auto;
		padding: 0 $uni-padding-20;
		box-shadow:0px 2rpx 12rpx 0px rgba(216,223,240,1);
		border-radius:12rpx 8rpx 8rpx 8rpx;
		background: $uni-bg-color;
		margin-bottom: $uni-margin-20;
		.left {
			flex: 0 0 auto;
			font-size: 22rpx;
			color: #606266;
			width: 160rpx;
			text-align: center;
			.price-wrap{
				display: block; color:$uni-text-color-them; font-size:$uni-font-size-base;
				.price{font-size: $uni-font-size-40; margin:0 5rpx;}
			}
		}
		.center {
			flex: 1 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30rpx;
			color: $uni-text-color;
			text-align: left;
			.time {
				font-size: 22rpx;
				color: #606266;
				margin-top: $uni-margin-10;
			}
		}
		.right{width: 60rpx;}
	}
}
	.b-left {
		width: 375rpx;
		height: 100%;
		font-size: $uni-font-size-base;
		color: #878787;
		.num {
			font-size: $uni-font-size-lg;
			color: $uni-color-price;
		}
	}
</style>
