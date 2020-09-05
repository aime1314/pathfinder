<template>
	<view class="giftHome">
			<couponItem :userCoupons="userCoupons" ></couponItem>
	</view>
</template>

<script>
	import couponItem from '../../../components/coupon-item.vue';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				title: '我的权益',
				userCoupons:'',//我的优惠券
			}
		},
		onLoad() {

		},
		components:{
			couponItem
		},
		methods: {
			
		},
		
		computed: {
			...mapState(['couponsList'])  
		}, 
		onLoad(){
			//用户未使用抵用券列表
			this.userCoupons = this.couponsList
			
		}
	}
</script>

<style lang="scss" scoped>
	.couponHome{
		padding-top:$uni-padding-30;
	}
</style>
