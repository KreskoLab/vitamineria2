<script setup lang="ts">
const cart = useCart()
const login = useLogin()
const resetPassword = useResetPassword();

onMounted(() => {
	Promise.all([fetchCartProducts(), useFetchUser()])
})
</script>

<template>
	<div class="min-h-screen bg-stone-100">
		<TheFooter />
		<TheHeader />

		<LazyTheCart 
			v-if="cart" 
		/>

		<LazyLoginModal
			v-if="login"
			@close="login = false"
			@reset-password="resetPassword = true"
		/>

		<LazyResetPasswordModal
			v-if="resetPassword"
			@close="resetPassword = false"
		/>

		<NuxtLoadingIndicator />

		<main 
			class="overflow-x-hidden pt-30 lg:pt-32">
			<NuxtPage />
		</main>
	</div>
</template>

<style>
.page-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
