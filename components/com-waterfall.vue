<template>
	<view class="waterfall-list">
		<u-waterfall v-model="waterfallList" ref="com-waterfall" :idKey="idKey" v-if="list.length">
			<template v-slot:left="{leftList}">
				<view class="goods-wrap left" v-for="(item, index) in leftList" :key="index">
					<slot name="left" v-bind="{item, index}"></slot>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="goods-wrap" v-for="(item, index) in rightList" :key="index">
					<slot name="right" v-bind="{item, index}"></slot>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			idKey: {
				type: String,
				default: 'projectId'
			}
		},
		watch: {
			list: {
				deep: true,
				handler(value, oValue) {
			
				this.waterfallList = value;
			}
			}
		},
		data() {
			return {
				waterfallList: []
			};
		},
	}
</script>

<style lang="scss" scoped>
.waterfall-list {
	padding: $uni-padding-30 0;
	// background: $uni-bg-color-grey;
	.left {
		margin-right: $uni-margin-20;
	}
	.goods-wrap {
		margin-bottom: $uni-margin-20;
		overflow: hidden;
		width: auto;
	}
}
</style>
