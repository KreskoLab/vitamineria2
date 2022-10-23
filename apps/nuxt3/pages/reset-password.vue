<script setup lang="ts">
const { resetPassword } = useStrapiAuth()
const route = useRoute()

const data = reactive({
	password: '',
	passwordConfirmation: ''
})

const onSubmit = async () => {

	if (data.password !== data.passwordConfirmation) {
		useNotification('Паролі повинні співпадати', 'error')
	}

	else {
		try {
			const code = route.query.code as string
			await resetPassword({ code, ...data })
			await useFetchUser()

			useNotification('Пароль успішно змінено', 'success')
			navigateTo('/pastila')
		} catch (e) {
			if (e.error.status === 500) {
				useNotification('Помилка серверу', 'error')
			}
		}
	}
}

useHead({
	title: 'Відновлення паролю'
})
</script>

<template>
	<div class="w-full bg-white">
		<AppContainer class="flex flex-col lg:flex-row h-[calc(100vh-7.5rem)] lg:h-[calc(100vh-8rem)]">
			<section class="h-full lg:(w-1/2 px-12 py-8 border-r-2 border-gray-600)">
				<div class="lg:border-2 border-gray-600 h-full">
					<div class="flex items-center justify-center border-b-2 border-gray-600 h-12">
						<h1 class="text-2xl text-center font-medium">
							Новий пароль
						</h1>
					</div>
		
					<form 
						class="flex flex-col gap-y-12 h-[calc(100%-3rem)] px-4 py-8 bg-green-50" 
						name="registration"
						@submit.prevent="onSubmit()"
					>
						<div class="grid grid-cols-1 gap-y-6 gap-x-4 lg:(gap-y-6 gap-x-8 px-8 py-6)">
							<AppInput 
								v-model="data.password"
								label="Пароль" 
								placeholder="Новий пароль"
								message="Введіть пароль"
								type="password"
								required
								:minlength="6"
							/>

							<AppInput 
								v-model="data.passwordConfirmation"
								label="Повторіть пароль" 
								placeholder="Пароль"
								message="Введіть ваш пароль"
								type="password"
								required
								:minlength="6"
							/>

							<button class="auth-button ml-auto col-span-full bg-white mt-4">
								<span class="mx-auto">
									Підтвердити
								</span>
							</button>
						</div>
					</form>
				</div>
			</section>
	
			<section class="bg-gradient-15 hidden lg:(block order-last w-1/2)" />
		</AppContainer>
	</div>
</template>

<style>
  .auth-button {
    @apply flex items-center border border-dark-50 h-8 py-1 px-4 w-full sm:w-max rounded-full
    transition duration-200 ease-in-out
    hover:ring-transparent hover:bg-orange-200
    ring-[1px] ring-dark-200 ring-offset-2;
  }
</style>
