<script setup lang="ts">
const routes = [
	{
		name: 'Персональні дані',
		link: '/account/'
	},

	{
		name: 'Адреса доставки',
		link: '/account/adress/'
	},

	{
		name: 'Замовлення',
		link: '/account/orders/'
	}
]
</script>

<template>
	<div class="flex flex-col w-full h-[calc(100vh-5rem)] md:(h-[calc(100vh-5.5rem)] flex-row space-x-20 py-12 px-64)">
		<ul class="bg-[#F7E3DF] w-full text-lg">
			<li 
				v-for="route in routes" 
				:key="route.name" 
				:class="{ 'font-medium': $route.path === route.link }"
			>
				<NuxtLink :to="route.link">
					{{ route.name }}
				</NuxtLink>
			</li>
		</ul>

		<div
			class="bg-[#DDE8EB] border-dark-600 border-t-2 h-full py-6 px-4 lg:(py-6 px-12 w-[560px] h-116 border-2) flex-grow-0"
		>
			<NuxtPage />
		</div>
	</div>
</template>

<style scoped>
button {
	@apply
	transition duration-200
	ring-offset-2 ring-[1px] ring-dark-200 ring-offset-emerald-50
	active:(ring-offset-emerald-200)
}

ul {
	@apply
	md:(w-64 rounded-2xl border-2 border-dark-600 py-8 px-12 h-max space-y-3)
	py-6 px-4 space-y-1
}
</style>
