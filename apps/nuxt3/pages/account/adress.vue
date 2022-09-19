<script setup lang="ts">
import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'
import { Form } from '~/types';

const { find } = useStrapi4()

interface FormReponse {
	form: Form[]
}

const client = useStrapiClient()
const user = useUser()

const userSettings: { [key: string]: string } = reactive({})

const formData: { data: Strapi4ResponseData<FormReponse> } = await find('user-adress-form')

async function updateUser() {
	if (Object.keys(userSettings).length) {
		await client('/me', { method: 'PUT', body: { ...userSettings } })
			.then(() => useFetchUser())
	}
}
</script>

<template>
	<div class="h-full">
		<h1 class="font-semibold text-2xl">Моя адреса</h1>
  
		<form
			class="flex flex-col justify-between mt-12 h-[calc(100%-96px)]"
			@submit.prevent="updateUser()"
		>
			<div class="grid grid-cols-2 gap-y-12 gap-x-8 items-start">
				<AppInput
					v-for="item in formData.data.attributes.form"
					:key="item.label"
					v-model="user[item.value]"
					:label="item.label"
					:class="[item.full ? 'col-span-full' : 'col-span-1']"
					:type="item.type"
					:required="item.required"
					:pattern="item.pattern"
					:message="item.message"
					:placeholder="item.placeholder"
					class="h-max flex-grow-0"
					@input="userSettings[item.value] = $event"
				/>
			</div>

			<button class="bg-emerald-200 py-2 px-4 border-2 border-dark-100 w-52">
				<span class="text-lg">Зберегти</span>
			</button>
		</form>
	</div>
</template>