<template>
	<view class="com-popup">
		<u-popup border-radius="16" v-model="show" v-bind="$attrs" v-on="$listeners" @close="close" @open="open" :mode="mode" :mask="mask" :closeable="closeable" close-icon-size="22" close-icon-color="#ADACAC" :close-icon-pos="closeIconPos">
			
			<view class="wrap">
				<view class="title Flex-cen"><text>{{title}}</text></view>
				<scroll-view class="content" :scroll-y="true">
					<slot>等闲变却故人心，却道故人心易变</slot>
				</scroll-view>
				<view class="bottom" v-if="showBottom">
					<slot name="bottom">
						<button :disabled="actionDisabled" :class="['popup-confirm', {disabled: actionDisabled}]" @click="actionFun">{{confirmText}}</button>
					</slot>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		name: 'comPopup',
		props: {
			visable: {
				type: Boolean,
				default: false,
			},
			mode: {
				type: String,
				default: 'bottom'
			},
			title: String,
			showBottom: {
				type: Boolean,
				default: true
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			actionDisabled: {
				type: Boolean,
				default: false
			},
			closeable: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				mask: true, // 是否显示遮罩
				closeIconPos: 'top-right'
			}
		},
		watch: {
			visable(val) {
				this.show = val;
			}
		},
		methods: {
			close() {
				this.$emit('update:visable', false)
			},
			open() {
				// console.log('open');
			},
			actionFun() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-popup {
		.wrap {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow: hidden;
			.title {
				color: #1D1E1F;
				font-size: 34rpx;
				margin: $uni-margin-20;
				flex: 0 0 auto;
			}
			.content {
				flex:  1 1 auto;
				height: 100%;
				overflow: auto;
			}
			.bottom {
				.popup-confirm {
					width: 588rpx;
					height: 83rpx;
					line-height: 83rpx;
					margin: 16rpx auto;
					font-size: $uni-font-size-lg;
					color: #fff;
					background: #EB2512;
					border-radius: 42rpx;
					text-align: center;
				}
				.disabled {
					background: #F7F7F7;
					color: #DBDCDF;
				}
			}
		}
	}
</style>
