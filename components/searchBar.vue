<template>
	<view class="search-bar Flex-cen" :style="{background: barBg, width: width + 'rpx', ...barStyle}" @click="barClick">
		<image class="search-icon" src="https://cdn.colourfulchina.com/nwsh/static/icons/search.png" mode=""></image>
		<input type="text"  class="search-input" @input="inputChange" :placeholder="placeholder" :disabled="disabled" confirm-type="search" :focus="focus"/>
		<button type="default" @click="search" v-if="showBtn">搜索</button>
	</view>
</template>

<script>
	export default {
		name: 'searchBar',
		model: {
		    prop: 'value',
		    event: 'input'
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			barBg: {
				type: String,
				default: '#fff',
			},
			width: {
				type: Number | String,
				default: 686
			},
			focus: {
				type: Boolean,
				default: false
			},
			barStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			showBtn: {
				type: Boolean,
				default: true
			}

		},
		data() {
			return {
				text: ''
			};
		},
		methods: {
			barClick() {
				this.$emit('click')
			},
			inputChange(e) {
				this.text = e.target.value
				this.$emit('input', e.target.value)
			},
			search() {
				this.$emit('search', this.text)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$bar-bg: #fff;
	.search-bar {
		height: 64rpx;
		flex: 0 0 auto;
		background: $bar-bg;
		padding: 0 22rpx;
		border-radius: 35rpx;
		text-align: left;
		.search-icon {
			width: 27rpx;
			height: 27rpx;
			margin-right: 10rpx;
		}
		.search-input {
			height: 100%;
			flex: 1;
		}
	}

</style>
