<script setup lang="ts">
import { FormResponse } from '@/interfaces';
import { User } from '@/types';

const { find } = useStrapi4()
const { register } = useStrapiAuth()

const router = useRouter()

const formData = await find<FormResponse>('user-register-from')
const userData = reactive({}) as Pick<User, 'name' | 'surname' | 'email' | 'phone' | 'password'>

async function signUp() {
	try {
		await register({ ...userData, username: `${userData.name} ${userData.surname}`})
		await useFetchUser()
    
		router.push('/pastila')
	} catch (e) {}
}

useHead({
	title: 'Реєстрація',
})
</script>

<template>
	<div class="flex flex-col w-full h-[calc(100vh-7.5rem)] lg:(h-[calc(100vh-8rem)] flex-row)">
		<section class="bg-white h-full lg:(w-1/2 px-12 py-8 border-r-2 border-gray-600)">
			<div class="lg:border-2 border-gray-600 h-full">
				<div class="flex items-center justify-center border-b-2 border-gray-600 h-12">
					<h1 class="text-2xl text-center font-medium">
						Реєстрація
					</h1>
				</div>
  
				<form 
					class="flex flex-col gap-y-12 h-[calc(100%-3rem)] px-4 py-8 bg-green-50" 
					name="registration"
					@submit.prevent="signUp()"
				>
					<div class="grid grid-cols-2 gap-y-6 gap-x-4 lg:(gap-y-6 gap-x-8 px-8 py-6)">
						<AppInput
							v-for="item in formData.data.attributes.form"
							:key="item.label"
							:label="item.label"
							:class="[item.full ? 'col-span-full' : 'col-span-1']"
							:type="item.type"
							:required="item.required"
							:pattern="item.pattern"
							:message="item.message"
							:placeholder="item.placeholder"
							@input="userData[item.value] = $event"
						/>
					</div>

					<button class="auth-button ml-auto col-span-full bg-white">
						<span class="mx-auto">
							Створити аккаунт
						</span>
					</button>
				</form>
			</div>
		</section>

		<section class="bg-gradient-29 hidden lg:(block order-last w-1/2)" />
	</div>
</template>

<style scoped>
  .auth-button {
    @apply flex items-center border border-dark-50 h-8 py-1 px-4 w-full sm:w-max rounded-full
    transition duration-200 ease-in-out
    hover:ring-transparent hover:bg-orange-200
    ring-[1px] ring-dark-200 ring-offset-2;
  }
</style>