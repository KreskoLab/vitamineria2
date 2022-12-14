<script setup lang="ts">
import { OrderInfo, PAYMENT, POST } from 'shared-types';
import { delivery, payments } from '@/content';
import { FormResponse } from '@/interfaces';

const { find } = useStrapi4()
const client = useStrapiClient()

const user = useUser()

const buttonKey = ref<number>(0)
const form = ref<HTMLFormElement | null>(null)

const [formData, adressData] = await Promise.all([
	find<FormResponse>('user-settings-form'), 
	find<FormResponse>('user-adress-form')
])

const order = reactive<OrderInfo>({
	name: '',
	surname: '',
	email: '',
	phone: '',
	account: false,
	payment: PAYMENT.ONLINE,
	post: {
		name: POST.NOVAPOSHTA
	}
})

const isPostDelivery = computed<boolean>(() => order.post.name === POST.NOVAPOSHTA || order.post.name === POST.UKRPOSHTA)
const isOnlinePayment = computed<boolean>(() => order.payment === PAYMENT.ONLINE)

onMounted(() => {
	if (user.value.email) {
		const userCredentials = getUserCredentials()
		const userAddress = getUserAddress()

		Object.assign(order, userCredentials)
		Object.assign(order.post, userAddress)
	}
})

async function pay() {
	const cart = cartCookie().value  
	const cartModal = useCart()

	try {
		const response = await client<string>('/me/order', { method: 'PUT', body: { order, cart } })

		if (order.payment === PAYMENT.ONLINE) {
			window.open(response, '_self')
		}

		else {
			cartModal.value = false
			await navigateTo(`/order?id=${response}`)
		}
	} catch (error) {
		console.log(error);
	}
}

async function validate() {
	const isFormValid = form.value.checkValidity()

	if (!isFormValid) {
		form.value.reportValidity()
		buttonKey.value++
	}
	
	else pay()
}
</script>

<template>
	<div class="flex flex-col justify-between h-full overflow-y-auto">
		<form
			ref="form"
		>
			<fieldset 
				class="grid grid-cols-2 gap-y-6 gap-x-8 p-4" 
				name="delivery"
			>
				<AppInput
					v-for="item in formData.data.attributes.form"
					:key="item.label"
					v-model="order[item.value]"
					:label="item.label"
					:class="[item.full ? 'col-span-full' : 'col-span-1']"
					:type="item.type"
					:required="item.required"
					:pattern="item.pattern"
					:message="item.message"
					:placeholder="item.placeholder"
				/>
			</fieldset>

			<fieldset
				v-if="!user.email" 
				class="px-4 pb-6 py-2"
			>
				<AppCheckbox 
					v-model="order.account"
					label="???????????????? ??????????????"
				/>
			</fieldset>

			<fieldset
				class="grid grid-cols-2 gap-y-6 gap-x-8 border-t-2 border-gray-600 px-4 pt-12 pb-8" 
				name="delivery"
			>
				<AppSelect 
					v-model="order.post.name"
					class="col-span-full"
					label="????????????????"
					:options="delivery"
				/>

				<div 
					v-if="isPostDelivery"
					class="grid grid-cols-2 gap-y-6 gap-x-8 w-full col-span-full"
				>
					<AppInput
						v-for="item in adressData.data.attributes.form"
						:key="item.label"
						v-model="order.post[item.value]"
						:class="[item.full ? 'col-span-full' : 'col-span-1']"
						:label="item.label"
						:type="item.type"
						:required="item.required"
						:pattern="item.pattern"
						:message="item.message"
						:placeholder="item.placeholder"
					/>
				</div>
			</fieldset>

			<fieldset 
				class="grid grid-cols-2 gap-y-6 gap-x-8 border-t-2 border-gray-600 px-4 pt-12 pb-8" 
				name="payment"
			>
				<AppSelect 
					v-model="order.payment"
					class="col-span-full"
					label="???????????? ????????????"
					:options="payments"
				/>
			</fieldset>
		</form>

		<section 
			class="border-t-2 border-gray-600"
		>
			<div class="flex flex-col space-y-6 px-4 py-6">
				<button
					:key="buttonKey" 
					class="w-full appearance-none border-2 border-gray-600 text-xl font-medium h-14 bg-green-200"
					@click.once="validate()"
				>
					<template v-if="isOnlinePayment">
						????????????????
					</template>

					<template v-else>
						????????????????
					</template>
				</button>
			</div>
		</section>
	</div>
</template>
