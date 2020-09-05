<template>
	<view class="sticky-wrap" :style="{top: offsetTop + 'rpx', ...wrapStyle}" id="sticky-wrap">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'com-sticky',
		props: {
			wrapStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			offsetTop: {
				type: Number | String,
				default: 0
			},
		},
		data() {
			return {
				disTop: 0,
				observer: null,
				lastValue: false,
			}
		},
		mounted() {
			let _offsetTop = 96 + this.offsetTop;
			this.observer =	uni.createIntersectionObserver({thresholds: [0.85, 0.9, 0.95, 1,]});
			this.observer.relativeToViewport({
				top: -_offsetTop
			}).observe('.sticky-wrap', (res) => {
				let targetRect = res.boundingClientRect;
				if (targetRect.top <= _offsetTop) {
					this.$emit('isFixed', true)
				} else {
					this.$emit('isFixed', false)
				}
			})
		},
		beforeDestroy() {
			this.observer && this.observer.disconnect();
		}

	}
</script>

<style lang="scss" scoped>
	.sticky-wrap {
		position: sticky;
		z-index: 99;
	}
</style>
