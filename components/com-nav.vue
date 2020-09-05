<template>
	<view class="nav-bar Flex-cen" :style="{height: navHeight + 'rpx', background: navBg, top: sysInfo.statusBarHeight + 'px', ...navStyle}">
		<view class="nav-left">
			<slot name="nav-left">
				<navigator open-type="navigateBack">
					<com-icon name="icon-fanhui" :color="backArrowColor" size="30"></com-icon>
				</navigator>
			</slot>
		</view>
		<view class="nav-center" :style="{color: titleColor}">
			<slot name="nav-center"></slot>
		</view>
		<view class="nav-right">
			<slot name="nav-right">

			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comNav',
		props: {
			navHeight: {
				type: String | Number,
				default: 96
			},
			navBg: {
				type: String,
				default: '#F91546'
			},
			backArrowColor: {
				type: String,
				default: '#fff'
			},
			titleColor: {
				type: String,
				default: '#1D1F29',
			},
			navStyle: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {

			}
		},
		computed: {
			sysInfo() {
				return getApp().globalData.sysInfo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		transition: all 0.2s;
		.nav-left {
			position: absolute;
			left: $uni-spacing-row-sm;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			color: #fff;
			flex: 0 0 auto;
			padding: 5rpx;
			padding-left: 0;
		}

		.nav-center {
			font-size: 34rpx;
			flex: 1;
			text-align: center;
		}

		.nav-right {
			position: absolute;
			right: $uni-spacing-row-lg;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			flex: 0 0 auto;
		}
	}
</style>
