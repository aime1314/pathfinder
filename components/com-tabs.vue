<template>
	<view class="tabs-wrap" :style="{...tabWrapStyle}" id="tabs-wrap">
		<u-tabs :class="['tabs-content', {celling: isCelling}]" ref="uTabs" :showBar="showBar" :current="current" :barStyle="barStyle" :active-item-style="activeItemStyle" v-on="$listeners" v-bind="$attrs" :list="list" :height="tabHeight" :font-size="fontSize" :name="prop" bg-color="transparent" :inactive-color="inactiveColor"  @change="tabsChange"  gutter="0"></u-tabs>
	</view>
</template>

<script>
	export default {
		name: 'comTabs',
		props: {
			showBar: {
				type: Boolean,
				default: false,
			},
			prop: {
				type: String,
				default: 'title'
			},
			tabHeight: {
				type: Number | String,
				default: 52
			},
			fontSize: {
				type: Number | String,
				default: 24
			},
			tabWrapStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			barStyle: {
				type: Object,
				default: () => {
					return {
						transition: 'all 0.2s ease'
					}
				}
			},
			inactiveColor: {
				type: String,
				default: '#85858E'
			},
			// item选中的样式
			activeItemStyle: {
				type: Object,
				default: () => {
					return {
						background: 'rgba(235,38,19,0.1)',
						color: '#EB2613'
					}
				}
			},
			list: {
				type: Array,
				default: () => {
					return null
				}
			},
			isCelling: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				current: 0,
			};
		},
		mounted() {
		},
		methods: {
			tabsChange(index) {
				if (index === this.current) {
					return;
				}
				this.$emit('tabChange', index, this.list[index]);
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$padding: 32rpx;
	.tabs-wrap {
		transition: all 0.1s;
		.tabs-content {
			 /deep/ .u-tab-item {
				margin-right: $padding;
				&:last-child {
					margin-right: 0;
				}
				background: #fff;
				border-radius: $uni-border-radius-sm;
				min-width: 136rpx;
			}
		}
		.celling {
			padding: 10rpx 0;
			/deep/ .u-tab-item {
				background: $uni-bg-color-grey;
			}
		}
	}

</style>
