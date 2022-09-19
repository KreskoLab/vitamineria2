<script setup lang="ts">
defineEmits<{
	(event: 'close'): void
}>()

const loginModal = reactive({
	show: false,
	send: false,
	email: '',
})

const client = useStrapiClient()

async function logIn() {
	
}

onMounted(() => (loginModal.show = true))
</script>

<template>
	<Teleport to="body">
		<div
			class="flex justify-center items-center fixed top-0 left-0 h-full w-full bg-dark-600/60 transition-all duration-150 ease-in-out" style="z-index: 999"
		>
			<Transition
				enter-active-class="animate-animated animate-faster animate-fadeInUp"
				leave-active-class="animate-animated animate-faster animate-fadeOutDown"
				@after-leave="$emit('close')"
			>
				<dialog
					v-if="loginModal.show"
					class="w-[90%] h-[320px] md:w-[60%] lg:(w-[480px] h-[370px]) bg-gradient-19 p-4"
					open
				>
					<div
						class="relative w-full h-full border-2 border-gray-600 bg-light-50"
					>
						<header class="flex items-center border-gray-600 border-b-2 w-full h-max px-6">
							<img
								width="248"
								height="248"
								src="@/assets/logo.svg"
								class="mx-auto"
								alt="logo"
							/>

							<button
								class="flex items-center justify-center outline-transparent ml-auto"
								@click="loginModal.show = false"
							>
								<Icon
									name="tabler:x"
									class="w-5 h-5 text-gray-400 hover:text-red-600 transition duration-150"
								/>
							</button>
						</header>

						<form 
							class="mt-8"
							@submit.prevent="logIn()"
						>
							<div class="flex flex-col items-center space-y-6 px-6">
								<template v-if="!loginModal.send">
									<div class="flex flex-col space-y-12 w-full">
										<AppInput 
											label="Email"
											placeholder="Ваш email" 
											required
											message="Введіть email адресу"
											@input="loginModal.email = $event"
										/>

										<AppInput 
											label="Пароль"
											placeholder="Ваш пароль" 
											required
											message="Введіть ваш пароль"
											@input="loginModal.email = $event"
										/>
									</div>
							
									<button
										class="hover:bg-green-200 auth-button"
									>
										<span class="text-lg font-medium mx-auto">
											Увійти
										</span>
									</button>
								</template>

								<template v-else>
									<p class="text-lg">
										На вашу пошту відправлено лист
									</p>
								</template>
							</div>
						</form>
					</div>
				</dialog>
			</Transition>
		</div>
	</Teleport>
</template>

<style scoped>
.fancy-border {
	border: 5px solid;
	border-image: linear-gradient(to left, #10b981, #ec4899) 1;
}

.auth-button {
	@apply flex items-center border-2 border-dark-50 py-2 px-3 w-10/12
  transition duration-200 ease-in-out
  hover:ring-transparent
  ring-[1px] ring-dark-200 ring-offset-2;
}
</style>