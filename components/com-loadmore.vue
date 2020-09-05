<template>
	<u-loadmore v-bind="$attrs" :icon-type="iconType" :load-text="loadText" bg-color="#f8f8f8"/>
</template>

<script>
	export default {
		name: 'comLoadmore',
		data() {
			return {
				iconType: 'circle',
				loadText: {
					loadmore: '上拉加载',
					loading: '努力加载中',
					nomore: '没有了'
				}
			}
		}
	}
</script>

<style>
</style>
