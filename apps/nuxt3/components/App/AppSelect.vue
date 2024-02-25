<script setup lang="ts">
type Option = {
	name: string
	value: string
}

const selected = ref<string>('');

const props = defineProps<{
	label?: string,
	modelValue?: string,
	options: Option[]
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', val: string): void
}>()

watch(() => props.options, () => {
	selected.value = ''
})

watch(selected, (val) => {
	emit('update:modelValue', val)
})
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
			v-model="selected" 
			class="appearance-none w-full col-span-full rounded-none border-2 border-gray-600 h-12 px-3"
		>
			<option value="" disabled selected>
				Обрати
			</option>
		
			<option 
				v-for="(option, i) in options" 
				:key="i" 
				:value="option.value"
				:selected="option.value === selected"
			>
				{{ option.name }}
			</option>
		</select>
	</div>
</template>
