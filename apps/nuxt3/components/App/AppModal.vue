<script setup lang="ts">
interface Props {
	enterTransition?: boolean,
	leftTransition?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
	enterTransition: true,
	leftTransition: true,
})

const showModal = ref<boolean>(false)

onMounted(() => showModal.value = true)

const transition = computed(() => {
	return {
		enter: props.enterTransition ? 'animate-animated animate-faster animate-fadeInUp' : '',
		left: props.leftTransition ? 'animate-animated animate-faster animate-fadeOutDown' : '',
	}
})

function toggle(): void {
	showModal.value = !showModal.value
}

defineEmits<{
	(event: 'close'): void
}>()

defineExpose({
	toggle
})
</script>

<template>
	<Teleport to="body">
		<div
			class="flex justify-center items-center fixed top-0 left-0 h-full w-full bg-dark-600/60 transition-all duration-150 ease-in-out z-100"
		>
			<Transition
				:enter-active-class="transition.enter"
				:leave-active-class="transition.left"
				@after-leave="$emit('close')"
			>
				<dialog
					v-if="showModal"
					class="w-full h-max md:w-[60%] lg:(w-[480px]) bg-gradient-19 p-3 lg:p-4"
					open
				>
					<slot />
				</dialog>
			</Transition>
		</div>
	</Teleport>
</template>
