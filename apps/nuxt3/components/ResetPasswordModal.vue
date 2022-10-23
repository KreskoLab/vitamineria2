<script setup lang="ts">
import { AppModal } from '#components'

const modal = ref<InstanceType<typeof AppModal> | null>(null)

const resetModal = reactive({
	email: '',
})

const { forgotPassword } = useStrapiAuth()

async function auth() {
	try {
		await forgotPassword({
			email: resetModal.email
		})

		modal.value.toggle()

		useNotification('На ваш email відправлено лист', 'success')
	} catch (error) {
		if (error.error.status === 500) {
			useNotification('Помилка серверу', 'error')
		}
	}
}
</script>

<template>
	<AppModal ref="modal">
		<div
			class="flex flex-col relative w-full h-full border-2 border-gray-600 bg-light-50"
		>
			<header class="flex items-center border-gray-600 border-b-2 w-full h-16 px-6">
				<span class="text-lg font-medium">
					Відновити пароль
				</span>

				<button
					class="flex items-center justify-center outline-transparent ml-auto"
					@click="modal.toggle()"
				>
					<Icon
						name="tabler:x"
						class="w-5 h-5 text-gray-400 hover:text-red-600 transition duration-150"
					/>
				</button>
			</header>

			<form 
				class="flex flex-col items-center justify-center"
				@submit.prevent="auth()"
			>
				<div class="flex flex-col space-y-6 sm:space-y-4 w-full px-6 pt-3 pb-5 h-full">
					<AppInput 
						v-model="resetModal.email"
						label="Email" 
						placeholder="Ваш email"
						message="Введіть email адресу"
						required
						:minlength="6"
					/>

					<div class="flex items-center justify-between pt-4">
						<button
							class="auth-button bg-green-200 py-1.5"
						>
							<span class="text-sm sm:text-base font-medium mx-auto">
								Далі
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</AppModal>
</template>

<style scoped>
.auth-button {
	@apply flex items-center border border-dark-50 px-2 w-full rounded-full
  transition duration-200 ease-in-out
  hover:ring-transparent
  ring-[1px] ring-dark-200 ring-offset-2;
}
</style>
