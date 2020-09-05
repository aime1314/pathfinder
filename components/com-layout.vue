<template>
	<view class=" com-layout">
		<view class="status_bar" v-if="showNav" :style="{background: navBg,}"></view>
		<com-nav v-if="showNav" v-bind="$attrs" :navBg="navBg">
			<template #nav-left>
				<slot name="nav-left">
				</slot>
			</template>
			<template #nav-center>
				<slot name="nav-center">
				</slot>
			</template>
			<template #nav-right>
				<slot name="nav-right">
				</slot>
			</template>
		</com-nav>

		<scroll-view :scroll-y="true" class="main" @scrolltolower="scrolltolower" @scroll="scroll" :style="{'margin-top': showNav ? navHeight + sysInfo.statusBarHeight + 'rpx' : 0, background: contentBg}">
			<slot></slot>
			<com-loadmore v-if="showLoadmore" :status="loadingStatus"></com-loadmore>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		name: 'comLayout',
		props: {
			showNav: {
				type: Boolean,
				default: true,
			},
			navHeight: {
				type: String | Number,
				default: 96
			},
			showLoadmore: {
				type: Boolean,
				default: false
			},
			navBg: {
				type: String,
				default: '#F91546'
			},
			loadingStatus: {
				type: String,
				default: 'loadmore'
			},
			contentBg: String
		},
		data() {
			return {

			};
		},
		computed: {
			sysInfo() {
				return getApp().globalData.sysInfo;
			}
		},
		mounted() {},
		methods: {
			scrolltolower() {
				this.$emit('scrollBottom')
			},
			scroll(e) {
				this.$emit('scroll', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-layout {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.nav-bar {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9;
		}

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
		}

		.main {
			// margin-top: calc(50px + var(--status-bar-height));
			flex: 1;
			overflow: auto;
		}
	}
</style>
