<script setup lang="ts">
const user = useUser()
const login = useLogin()
</script>

<template>
	<div class="flex items-center justify-center h-full">
		<div v-if="user.email">
			<AppDropdown class="hidden md:block" menu="top-14">
				<span class="text-lg h-full px-4">
					{{ user.email }}
				</span>

				<template #menu>
					<AppDropdownItem>
						<NuxtLink class="inline-block w-full h-full" to="/account">
							Аккаунт
						</NuxtLink>
					</AppDropdownItem>

					<AppDropdownItem 
						@click="useLogOut()"
					>
						Вийти
					</AppDropdownItem>
				</template>
			</AppDropdown>

			<NuxtLink class="block md:hidden" to="/account">
				<Icon
					name="tabler:user-check"
					class="w-6 h-6 text-dark-100"
				/>
			</NuxtLink>
		</div>

		<Icon
			v-else
			name="tabler:user"
			class="w-6 h-6 text-dark-100 cursor-pointer"
			@click="login = true"
		/>
	</div>
</template>