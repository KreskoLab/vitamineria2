<script setup lang="ts">
type Option = {
	name: string
	value: string
}

defineProps<{
	label?: string,
	modelValue?: string,
	options: Option[]
}>()

defineEmits<{
	(event: 'update:modelValue', val: string): void
}>()
</script>

<template>
	<div class="relative w-full">
		<label
			v-if="label"
			class="absolute -top-8 left-0 text-lg"
		>
			{{ label }}
		</label>

		<select 
			class="appearance-none w-full col-span-full rounded-none border-2 border-gray-600 h-12 px-3" 
			@change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
		>
			<option 
				v-for="option in options" 
				:key="option.value" 
				:value="option.value"
				:selected="option.value === modelValue"
			>
				{{ option.name }}
			</option>
		</select>
	</div>
</template>