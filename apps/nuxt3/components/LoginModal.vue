<script setup lang="ts">
import { AppModal } from '#components'

const emit = defineEmits<{
	(event: 'resetPassword'): void
}>()

const loginModal = reactive({
	reset: false,
	email: '',
	password: '',
})

const modal = ref<InstanceType<typeof AppModal> | null>(null)

const { login } = useStrapiAuth()

async function auth() {
	try {
		await login({ identifier: loginModal.email, password: loginModal.password })
		await useFetchUser();

		modal.value?.toggle();
	} catch (error) {
		if (error.error.status === 400) {
			useNotification('Неправильний email або пароль', 'error')
		}

		if (error.error.status === 500) {
			useNotification('Помилка серверу', 'error')
		}
	}
}

function resetPassword() {
	loginModal.reset = true
	modal.value?.toggle()
	emit('resetPassword')
}
</script>

<template>
	<AppModal ref="modal" :left-transition="!loginModal.reset">
		<div
			class="flex flex-col relative w-full h-full border-2 border-gray-600 bg-light-50"
		>
			<header class="flex items-center border-gray-600 border-b-2 w-full h-16 px-6">
				<img
					width="248"
					height="248"
					src="@/assets/logo.svg"
					loading="lazy"
					class="ml-4 lg:ml-16"
					alt="logo"
				/>

				<button
					class="flex items-center justify-center outline-transparent ml-auto"
					@click="modal?.toggle()"
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
						v-model="loginModal.email"
						label="Email" 
						placeholder="Ваш email"
						message="Введіть email адресу"
						required
						:minlength="6"
					/>

					<AppInput 
						v-model="loginModal.password"
						label="Пароль" 
						placeholder="Ваш пароль"
						message="Введіть ваш пароль"
						type="password"
						required
						:minlength="6"
					/>

					<div class="flex items-center justify-between">
						<span class="cursor-pointer w-64 text-xs sm:text-sm underline underline-current underline-offset-4" @click="resetPassword()">
							Забули пароль ?
						</span>

						<button
							class="auth-button bg-green-200 py-1.5"
						>
							<span class="text-sm sm:text-base font-medium mx-auto">
								Увійти
							</span>
						</button>
					</div>
				</div>
			</form>

			<footer class="flex items-center justify-between border-t-2 border-gray-600 w-full px-6 py-3">
				<span class="uppercase text-xs sm:text-sm">
					Немаєте аккаунту ?
				</span>

				<NuxtLink
					to="/register"
					class="hover:bg-green-200 auth-button !w-max lg:!px-4"
					@click="modal?.toggle()"
				>
					<span class="text-sm mx-auto">
						Зареєструватися
					</span>
				</NuxtLink>
			</footer>
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
