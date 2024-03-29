<template lang="pug">
card-container(title="Constructor")
	template(v-if="userProfile" #content)
		component-constructor
			template(#controls)
				c-switcher(id="avatar-sizes" label="Size" :options="options.sizes" v-model="selectedOptions.size" fullwidth)
				c-switcher(id="avatar-shapes" label="Shape" :options="options.shapes" v-model="selectedOptions.shape" fullwidth)
			template(#code)
				code {{code}}
			template(#preview)
				c-avatar(:size="selectedOptions.size" :shape="selectedOptions.shape" :avatar="userProfile.avatar" :firstName="userProfile.firstName" :lastName="userProfile.lastName")
				c-avatar(:size="selectedOptions.size" :shape="selectedOptions.shape" :firstName="userProfile.firstName" :lastName="userProfile.lastName")
			
card-container(title="Collection")
	template(#controls)
		c-button(iconL="refresh" type="transparent" @click="refreshUser()")
	template(v-if="userProfile" #content)
		.preview-column.col-2(v-for="(shape, index) in options.shapes" :key="index")
			c-avatar(v-for="(size, index) in options.sizes" :avatar="userProfile.avatar" :firstName="userProfile.firstName" :lastName="userProfile.lastName" :size="size.value" :shape="shape.value" :key="index")
		.preview-column.col-2(v-for="(shape, index) in options.shapes" :key="index")
			c-avatar(v-for="(size, index) in options.sizes" :firstName="userProfile.firstName" :lastName="userProfile.lastName" :size="size.value" :shape="shape.value" :key="index")
</template>


<script>
import { ref, reactive, computed, onMounted } from "vue"
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue"
import cSwitcher from "~/components/Inputs/cSwitcher.vue"
import cAvatar from "~/components/Misc/cAvatar.vue";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers.js";

export default {
	components: { ComponentConstructor, cSwitcher, cAvatar },
	setup() {
		const userProfile = ref(null)
		const refreshUser = () => userProfile.value = randomUsers({q:1})[0]

		const options = {
			sizes: [
				{title: "Tiny", value: "tiny"},
				{title: "Small", value: "small"},
				{title: "Regular", value: "regular"},
				{title: "Big", value: "big"},
				{title: "Huge", value: "huge"}
			],
			shapes: [
				{title: "Circle", value: "circle"},
				{title: "Rounded", value: "rounded"},
				{title: "Square", value: "square"}
			]
		}

		const selectedOptions = reactive({
			size: "regular",
			shape: "circle",
		})

		const code = computed(() => {
			let avatar = `avatar="avatar.jpg"`
			let firstName = `firstName="${userProfile.value.firstName}"`
			let lastName = `lastName="${userProfile.value.lastName}"`
			let size = selectedOptions.size !== 'regular' ? `size="${selectedOptions.size}"` : ""
			let shape = selectedOptions.shape !== 'circle' ? `shape="${selectedOptions.shape}"` : ""
			return `c-avatar(${avatar} ${firstName} ${lastName} ${size} ${shape})`
		})

		onMounted(() => refreshUser())
		

		return { options, selectedOptions, userProfile, refreshUser, code }
	}
};
</script>


<style lang="stylus" scoped>
.card-container
	margin-bottom: 2em
	.preview-column
		display: flex
		flex-direction: column
		gap: 1em
		align-items: center
</style>
