<script setup lang="ts">
const props = defineProps<{
	label: string,
	modelValue: boolean
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', val: boolean): void
}>()

const val = ref<boolean>(props.modelValue)

function toggle() {
	val.value = !val.value
	emit('update:modelValue', val.value)
}
</script>

<template>
	<div class="flex items-center space-x-3">
		<input 
			:checked="modelValue"
			type="checkbox"
			name="registration" 
			class="
				appearance-none 
				h-6 w-6 
				border-2 border-gray-600 
				bg-white p-2
				checked:(bg-green-600 border-green-600) 
				active:(bg-green-600)
				focus:(outline-none ring-0 ring-transparent bg-transparent) 
				checked:hover:bg-green-600
				checked:focus:bg-green-600
				cursor-pointer
				transition duration-200
			" 
			@click="toggle()"
		>

		<span>
			{{ label }}
		</span>
	</div>
</template>