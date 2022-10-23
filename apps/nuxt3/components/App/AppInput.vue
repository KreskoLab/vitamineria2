<script setup lang="ts">
defineProps<{
	label?: string,
	modelValue?: string,
	type?: string,
	placeholder?: string
	required?: boolean,
	pattern?: string,
	message?: string,
	password?: boolean,
	minlength?: number,
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', data: string): void
}>()

const input = ref<HTMLInputElement | null>(null)
const showPass = ref<boolean>(false)

const handleInput = () => {
	input.value.setCustomValidity('')
	emit('update:modelValue', input.value.value)
}

function toggle(): void {
	showPass.value ? input.value.type = 'password' : input.value.type = 'text'
	showPass.value = !showPass.value
}
</script>

<template>
	<div class="relative flex flex-col gap-y-1 h-max w-full">
		<label
			v-if="label"
			class="text-lg"
		>
			{{ label }}
		</label>

		<input
			ref="input"
			:placeholder="placeholder"
			:required="required"
			:value="modelValue"
			:minlength="minlength || 0"
			:type="type || 'text'"
			:pattern="pattern"
			@input="handleInput"
			@invalid="input.setCustomValidity(message)"
		/>

		<div v-if="type === 'password'" class="absolute right-4 top-[55%] text-gray-600 cursor-pointer" @click="toggle()">
			<Icon v-if="showPass" name="tabler:eye-off" class="w-5 h-5" />
			<Icon v-else name="tabler:eye" class="w-5 h-5" />
		</div>
	</div>
</template>

<style scoped>
input {
	@apply 
	appearance-none
  w-full
  border-2 border-gray-600 
  py-2 px-3 
  focus:(outline-none ring-0 ring-transparent border-gray-600)
}
</style>
