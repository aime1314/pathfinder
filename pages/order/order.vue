<template>
	<view class="orderhome">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" bar-width="50"  gutter="100" show-bar="false" showBar=""></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="{height:swiperHeight+'rpx'}">
			<swiper-item  class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y style="width: 100%;" @scrolltolower="onreachBottom"  >
				<view v-for="(item,index) in orderlist" :key="index">
						<orderItem :orderlist = "item"  :current="current"> </orderItem>
				</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<com-nodata v-if="orderlist && orderlist.length == 0"></com-nodata>
	</view>
</template>

<script>
	import orderItem from '../../components/order-item.vue'
	export default {
		data() {
			return {
				title: '我的订单',
				list: [{
					name: '全部订单'
				},{
					name: '待付款',
				}, {
					name: '已付款'
				},  {
					name: '已取消'
				}],
				orderlist:[],
				acChannel:'',
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				swiperHeight:'', // swip高度
				
			}
		},
		components:{
			orderItem,
		},		
		onLoad(option) {
			let _this = this;
			_this.$data.current = option.current;
			_this.$data.acChannel = option.acChannel;
			_this.$data.swiperCurrent = option.current;
			
			this.$data.current = option.current;
			this.$data.swiperCurrent = option.current;
		},
		created() {
			this.getAllOrder(this.$data.current);
		},
		onPullDownRefresh(){
			this.getAllOrder(this.$data.current);
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.$data.orderlist =[];
				this.$data.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let current = e.detail.current;
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
				let index = e.detail.current;
				
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.$data.swiperCurrent = current;
				this.$data.current = current;
				this.getAllOrder(current);
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			
			getAllOrder(current){
				var tempList  = [];
				//[0,1,2, 3, 4, 5, 7, 8, 9]
				if (current == 0 ) {
				tempList=[0,1,2, 3, 4, 5, 7, 8, 9];	
				}
				if (current == 1 ) {
				tempList=[0];
				}
				// if (current == 2 ) {
				// 	tempList=[6];
				// }
				if (current == 2 ) {
						tempList=[1,2];
				}
				if (current == 3 ) {
					tempList=[3,7,8,9];
				}
				var params ={acChannel: this.$data.acChannel,statusList: tempList};
				// if(this.$data.orderlist.length === 0 ){
					this.$orderApi.frontendSalesOrderList(params).then(res => {
						if(res && res.ok === 0){
							// this.changeOrderList(current,res.obj.list);
							this.$data.orderlist = res.obj.list;
							// setTimeout(function(){
							this.$data.swiperHeight = res.obj.list ? res.obj.list.length * (300 + 40):'' 
							// },10) ;
						}
					});
			},
			changeOrderList(current,orderList){
				if(orderList.length === 0 ){
					orderList = this.$data.orderlist;
				}
				var tempList  = [];
				orderList.forEach(function(o) {
					if (current == 0 && o.status === 0) {
						tempList.push(o);
					}
					if (current == 1 &&  (o.status === 1 || o.status === 2)) {
						tempList.push(o);
					}
					if (current == 2 &&  (o.status === 3 || o.status === 9 || o.status === 8 || o.status === 7)) {
						tempList.push(o);
					}
					if (current == 3 &&  (o.status === 4 || o.status === 5)) {
						tempList.push(o);
					}
					if (current == 4 &&  (o.status === 6)) {
						tempList.push(o);
					}
				});
				this.$data.orderlist = tempList;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderhome{ padding-top:$uni-padding-20;
	}
</style>
