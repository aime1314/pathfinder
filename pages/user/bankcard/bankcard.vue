<template>
	<view class="bankCardHome">
		<template>
			<backcarditem :bankcard = "bankcard"></backcarditem>
		</template>

		<view class="Flex-BtnBox addressBtnBox">
			<button class="Flex-Btn-lg" @tap="goAddressnew">添加银行卡</button>
		</view>
		
		

	</view>
</template>

<script>
	import backcarditem from '../../../components/bankcarditem.vue'
	export default {
		data() {
			return {
				title: '银行卡管理',
				bankcard:[
					{"name":"招商银行","type":"信用卡","class":"CMB","number":"6214 **** **** 5229","pic":"https://cdn.colourfulchina.com/nwsh/static/bank/default.png"},
					{"name":"农业银行","type":"储蓄卡","class":"ABC","number":"6214 **** **** 5229","pic":"https://cdn.colourfulchina.com/nwsh/static/bank/default.png"},
					{"name":"建设银行","type":"信用卡","class":"CCB","number":"6214 **** **** 5229","pic":"https://cdn.colourfulchina.com/nwsh/static/bank/default.png"},
				]
			}
		},
		onLoad() {

		},
		components:{
			backcarditem
		},
		methods: {
			goAddressnew(){
				uni.navigateTo({
					url: "/pages/user/bankcard/backcardadd"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bankCardHome{ padding-top:$uni-padding-30;
		.addressBtnBox{button{margin: 0 $uni-margin-30; width: inherit;}}
	}
</style>
