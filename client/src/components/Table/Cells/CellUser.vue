<template lang="pug">
.cell-user
	c-avatar(:firstName="data.firstName" :lastName="data.lastName" :avatar="data.avatar")
	.info
		.name {{ data.firstName }} {{ data.lastName }}
		.email {{ data.email }}
</template>


<script>
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cAvatar },
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-user
	.c-avatar
		margin-right: 0.5em
	.email
		color: var(--c-grey)
</style>
