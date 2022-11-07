<template>
	<footer class="fixed top-0 w-full bg-blue-gray-100 z-100">
		<AppContainer class="flex items-center justify-between h-10 px-4 text-xs lg:(px-12 text-sm)">
			<div class="flex space-x-6">
				<div class="flex items-center space-x-1 lg:space-x-2">
					<Icon name="tabler-phone" class="w-4 h-4" />
					<span>+380 63 24 53 347</span>
				</div>
	
				<a
					href="https://instagram.com/vitamineria.ua"
					target="_blank"
					class="flex items-center space-x-1 lg:space-x-2"
				>
					<Icon name="tabler:brand-instagram" class="w-4 h-4" />
					<span>vitamineria.ua</span>
				</a>
			</div>

			<NuxtLink class="font-semibold text-xl" to="/cooperation">
				🤝 Співпраця
			</NuxtLink>
		
			<div class="hidden lg:(flex items-center space-x-2)">
				<Icon name="tabler-mail" class="w-4 h-4" />
				<span>reply@vitamineria.com.ua</span>
			</div>
		</AppContainer>
	</footer>
</template>
