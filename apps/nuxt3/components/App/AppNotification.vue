<script setup lang="ts">
import { ToastType } from '@/types'

interface Toast {
	id: string
	message: string
	type: ToastType
}

const toasts = reactive<Toast[]>([])

function add(message: string, type: ToastType) {
	const toast: Toast = { id: Math.random().toString(32), message, type }
	toasts.push(toast)
	setTimer(toast)
}

function remove(toast: Toast) {
	const index = toasts.findIndex((item) => item.id === toast.id)
	toasts.splice(index, 1)
}

function setTimer(toast: Toast) {
	setTimeout(() => remove(toast), 5000)
}

defineExpose({ add })
</script>

<template>
	<Suspense>
		<Teleport to="body">
			<div class="fixed top-4 right-4 z-101">
				<transition-group
					tag="ul"
					enter-active-class="animate-animated animate-bounceInDown"
					leave-active-class="animate-animated animate-bounceOut"
				>
					<li
						v-for="toast in toasts"
						:key="toast.id"
						class="pt-2"
					>
						<div class="flex items-center space-x-3 w-full sm:max-w-96 py-3 px-4 border-2 border-gray-600 bg-light-50">
							<Icon 
								v-if="toast.type === 'error'"
								name="tabler:alert-circle"
								class="w-6 h-6 flex-shrink-0 text-red-400"
							/>
  
							<Icon
								v-if="toast.type === 'warn'"
								name="tabler:alert-triangle"
								class="w-6 h-6 flex-shrink-0 text-amber-400"
							/>
  
							<Icon
								v-if="toast.type === 'success'"
								name="tabler:circle-check"
								class="w-6 h-6 flex-shrink-0 text-green-400"
							/>
  
							<span class="title text-base font-normal">
								{{ toast.message }}
							</span>
						</div>
					</li>
				</transition-group>
			</div>
		</Teleport>
	</Suspense>
</template>
