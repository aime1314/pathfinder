<template>
	<view class="not-pass">
		<view class="wrap">
			<com-plate title="热销商品"></com-plate>
			<com-hot-sale></com-hot-sale>
		</view>
		<view class="wrap">
			<com-plate title="猜你喜欢"></com-plate>
			<com-waterfall :list="[]">
				<template v-slot:left="{item, index}">
					<goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
				</template>
				<template v-slot:right="{item, index}">
					<goodsItem :goods="item" @itemClick="goodsClick"></goodsItem>
				</template>
			</com-waterfall>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'notPass',
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.not-pass {
		.wrap {
		margin-top: $uni-margin-30;
			
		}
	}
</style>
