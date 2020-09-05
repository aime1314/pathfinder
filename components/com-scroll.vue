<template>
	<view class="scroll-wrap" ref="sWrap" id="s-wrap">
		<scroll-view class="scroll-view-content" :id="uid" :style="{...contentStye}" :scroll-x="true" @scroll="scroll" @scrolltoupper="scrolltoupper" @scrolltolower="scrolltolower">
			<slot></slot>
		</scroll-view>
		<view class="scroll-indicate" v-if="showIndicate">
			<view class="indicate" :style="{left: preLeft, width: indicateW}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comScroll',
		props: {
			showIndicate: {
				type: Boolean,
				default: false
			},
			height: {
				type: Number,
				default: 170
			},
			width: {
				type: Number,
				default: 650
			},
			contentStye: {
				type: Object,
				default() {
					return {background: '#f8f8f8',}
				}
			}
		},
		data() {
			return {
				preLeft: 0,
				wrapWidth: 0,
				indicateW: 25,
				uid: this.$u.guid(20)
			};
		},
		mounted() {
			let view = uni.createSelectorQuery().in(this).select(`#${this.uid}`)
			view.boundingClientRect((obj) => {
				this.wrapWidth = obj.width;
			}).exec()
		},
		methods: {
			scroll(e) {
				let detail = e.detail;
				let scrollDis = detail.scrollWidth - this.wrapWidth;
				let pre = detail.scrollLeft / (scrollDis * 2);
				this.preLeft = pre * 100 + '%';
			},
			scrolltoupper(e) {
			},
			scrolltolower(e) {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-wrap {
		position: relative;
		width: 100%;
		overflow: hidden;
		.scroll-view-content {
			width: 100%;
			// background: $uni-bg-color-grey !important;
		}
		.scroll-indicate {
			width: 50rpx;
			height: 6rpx;
			position: absolute;
			bottom: 0;
			left: 50%;
			border-radius: 3rpx;
			transform: translateX(-50%);
			background:rgba(0,0,0,0.15);
			.indicate {
				width: 50%;
				height: 100%;
				border-radius: 3rpx;
				position: relative;
				transition: all 0.1s;
				background: #EB2613;
			}
			
			
		}
		/* #ifdef H5 */
		// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
		scroll-view /deep/ ::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
		}
		/* #endif */
		.scroll-view-content {
			margin: 0 auto;
			background: #fff;
			white-space: nowrap;
			.scroll-view-item {
				display: inline-block;
				width: 100%;
			}
		}
			
	}
</style>