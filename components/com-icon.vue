<template>
	<text v-on="$listeners" :class="['icon', 'font_family', 'com-icon', name]" :style="{color, 'font-size': size + 'rpx'}"></text>
</template>

<script>
	export default {
		name: 'comIcon',
		props: {
			name: String,
			color: String,
			size: String | Number
		}
	}
</script>

<style lang="scss" scoped>
	.com-icon {
		font-size: 24rpx;
		color: #909399;
		transition: all 0.2s;
	}
</style>
