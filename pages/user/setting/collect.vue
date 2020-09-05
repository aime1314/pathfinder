<template>
	<view class="collectHome">
		<!-- <view class="Flex-sb">
			<view>全部商品（15）</view>
			<view>管理</view>
		</view> -->
	<!-- 	<view class="Flex-sb">
			<view><text class="icon font_family icon-weixuanzhong"></text> 全选</view>
			<view>完成</view>
		</view> -->
		<view class="Flex-sb collectListBox" v-for="(item, index) in list" :key="index">
			<!-- <view class="icon font_family icon-weixuanzhong" @click="change"></view> -->
			<image :src="item.productUrl" mode="widthFix" class="collectpic" @click="goToDetail(item.projectId)"></image>
			<view class="collistListmsg" @click="goToDetail(item.projectId)">
				<text class="title">{{item.productName}}</text>
				<text class="titletip">{{item.projectSubhead}}</text>
				<!-- <view class="staglist"><text>6期免息</text></view> -->
				
				<view class="money"><text class="readyprice"><text>¥</text>{{item.discountPrice}}</text><text class="markprice">¥{{item.marketPrice}}</text></view>
			</view>
			<view @click="cancelCollect(item.projectId)"><text class="icon font_family icon-shanchu" ></text></view>
		</view>
		
		<!-- <view class="Flex-sb managecollectBox">
			<view>已选 1 个商品</view>
			<view><text class="icon font_family icon-shanchu"></text> 取消收藏</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			
		};
	},
	onLoad() {
		this.selectProductCollectList(); //查询用户商品收藏列表
	},
	methods: {
		
		selectProductCollectList(){
			let acid = uni.getStorageSync("USERDATA").acid
			if(acid != undefined && acid != null && acid != ''){
				let params={
					userId: acid
				}
				this.$goodsApi.productCollectList(params).then(res => {
					if(res.code === 100 && res.msg === 'ok'){
						if(res.result != undefined && res.result){
							for (var i = 0; i < res.result.length; i++) {
								this.getGoodsInfoByGoodsId(res.result[i].productId);
							}
						}
					}
				});
			}
		},
		
		getGoodsInfoByGoodsId(productId){
			let params={
				acChannel: 'NWSH',
				projectId:productId
			}
			this.$goodsApi.getGoodsDetail(params).then(res => {
				if(res.ok == 0 && JSON.stringify(res.obj) != "{}"){
					let url = "https://cdn.colourfulchina.com/nwsh/static/images/default.png";
					if(res.obj.projectUrlList != undefined && res.obj.projectUrlList.length > 0){
						url = res.obj.projectUrlList[0]
					}
					let product = {
						"productName":res.obj.projectName,
						"productUrl":url,
						"discountPrice":res.obj.discountPrice,
						"marketPrice":res.obj.marketPrice,
						"projectSubhead":res.obj.projectSubhead,
						"projectId":productId,
					}	
					this.list.push(product)
				}
			});
		},
		//跳转到商品详情页
		goToDetail(projectId){
			uni.navigateTo({
				url: `../../detail/detail?id=${projectId}`
			})
		},
		//取消收藏
		cancelCollect(productId){
			let acid = uni.getStorageSync("USERDATA").acid
			if(acid != undefined && acid != null && acid != ''){
				let params={
					userId: acid,
					goodsId:productId
				}
				this.$goodsApi.productCollect(params).then(res => {
					if(res.code === 100 && res.msg === 'ok'){
						if(res.result != undefined && res.result){
							this.list = []
							this.selectProductCollectList()		
						}
					}
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	page{background: $uni-bg-color;}
	.collectHome{padding: $uni-padding-30 16rpx; margin:0;
		.collectListBox{padding:$uni-padding-30 0;
			.icon{width: 40rpx; text-align: left;}
			.collectpic{width:180rpx; margin:0 $uni-margin-20;}
			.collistListmsg{flex: 1;
				.title{display: block; font-size:$uni-font-size-base;}
				.titletip{color: $uni-text-color-grey; font-size:$uni-font-size-sm; display:block; padding:$uni-padding-10 0;}
				.staglist{padding:0 0 $uni-padding-10 0; font-size:$uni-font-size-sm;
					text{display: inline-block; margin-right:$uni-margin-20; background: rgba(255, 240, 224, 1); color:rgba(161, 106, 59, 1); padding:0 10rpx; border-radius: $uni-border-radius-lg;}
				}
				.money{padding-top:$uni-padding-10;
					.readyprice{margin-right: $uni-margin-10; color:$uni-text-color-them; display:inline-block; font-size:36rpx;
						text{font-size: $uni-font-size-sm;}
					}
					.markprice{color:$uni-text-color-grey; text-decoration: line-through;}
				}
				
			}
		}
		.collectListBox:last-child{padding-bottom:none;}
		.managecollectBox{position: fixed; width: 100%; left:0; bottom: 0; height:100rpx; line-height: 100rpx; background: $uni-bg-color-grey; padding:0 $uni-padding-30}
	}
</style>
