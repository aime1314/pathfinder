<template>
	<view>
	<view class="giftHome" v-for="(item,index) in mygiftList" :key="index">
		<template>
			<gift-item :gift="item"></gift-item>
		</template>
	</view>
	<com-nodata v-if="mygiftList && mygiftList.length == 0"></com-nodata>
	</view>
</template>
<script>
	import giftItem from '../../../components/gift-item.vue';
	export default {
		data() {
			return {
				title: '我的权益',
				mygiftList:[]
			}
		},
		onLoad() {
		   let userData = uni.getStorageSync("USERDATA");
		   if(!userData){
			    uni.navigateTo({
			    	url:'/pages/auth/login'
			    })
		   }
		   this.getmembergiftList(userData.acId)
		},
		components:{
			giftItem
		},
		props: {
			imgUrl: {
				type: String,
				default: '',
			},
			projectName:{
				type:String
			},
			gift: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods: {
			getmembergiftList(acid) {
				let params={
					"acChannel":"KWX",
					"memberId":acid,
					"statusList":[-1,3,4,5,7,8,9]
				}
				this.$memberApi.getMemberGift(params).then(res => {
					if(res.ok==0){
						this.mygiftList = res.obj.list;
					}else{
						uni.showToast({title: "获取数据失败",icon: 'none',duration: 1500})
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.giftHome{ padding-top:$uni-padding-30;
		
	}
</style>
