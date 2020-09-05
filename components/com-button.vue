<template>
	<view>
		<button v-bind="$attrs" v-on="$listeners">
			<slot>
				按钮
			</slot>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
