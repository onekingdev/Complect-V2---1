<template lang="pug">
page-container(section="Components" title="Inputs")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.name}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	setup() {
		const tabs = [{
			name: "devInputsButtons",
			title: "Button"
		}, {
			name: "devInputsFields",
			title: "Field"
		}, {
			name: "devInputsSelect",
			title: "Select"
		}, {
			name: "devInputsDropdown",
			title: "Dropdown"
		}, {
			name: "devInputsCheckbox",
			title: "Checkbox"
		}, {
			name: "devInputsRadio",
			title: "Radio"
		}, {
			name: "devInputsDropzone",
			title: "Dropzone"
		}, {
			name: "devInputsRating",
			title: "Rating"
		}, {
			name: "devInputsExtra",
			title: "Extra"
		}]

		return { tabs }
	}
};
</script>
