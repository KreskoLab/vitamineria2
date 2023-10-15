<script setup lang="ts">
import { OrderInfo, PAYMENT, POST } from 'shared-types';
import { delivery, payments } from '@/content';
import { FormResponse } from '@/interfaces';

const props = defineProps<{
	productsPrice: number
}>()


const { find } = useStrapi4()
const client = useStrapiClient()

const user = useUser()

const discount = ref<number>(0)
const buttonKey = ref<number>(0)

const priceWithDiscount = computed(() => props.productsPrice - (discount.value * props.productsPrice) / 100)

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
	info: '',
	promocode: '',
	account: false,
	payment: PAYMENT.ONLINE,
	post: {
		name: POST.NOVAPOSHTA
	}
})

const isPostDelivery = computed(() => order.post.name === POST.NOVAPOSHTA || order.post.name === POST.UKRPOSHTA)
const isOnlinePayment = computed(() => order.payment === PAYMENT.ONLINE)

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

async function checkPromocode() {
	try {
		const response = await client<number>('/check-coupon', { method: 'POST', body: { coupon: order.promocode } })
		discount.value = Number(response)
	} catch (error) {
		console.log(error);
	}
	
}
</script>

<template>
	<div class="flex flex-col justify-between h-full overflow-y-auto">
		<form
			ref="form"
			@submit.prevent="validate"
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
					label="Створити аккаунт"
				/>
			</fieldset>

			<fieldset
				class="grid grid-cols-2 gap-y-6 gap-x-8 border-t-2 border-gray-600 px-4 pt-12 pb-8" 
				name="delivery"
			>
				<AppSelect 
					v-model="order.post.name"
					class="col-span-full"
					label="Доставка"
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
					label="Спосіб оплати"
					:options="payments"
				/>

				<AppInput
					v-model="order.info"
					class="col-span-full"
					label="Примітка"
					:required="false"
				/>

				<div class="flex items-end w-full col-span-full">
					<AppInput
						v-model="order.promocode"
						label="Промокод"
						:required="false"
					/>

					<button
						class=" 
						appearance-none
						bg-amber-200 py-2 
						w-full
						outline-none
						border-l-0
						border-2 border-gray-600 
						py-2 px-3 
						h-[44px]
						w-min
						focus:(ring-0 ring-transparent border-gray-600)"
						@click="checkPromocode"
					>
						<span class="text-sm sm:text-base font-medium mx-auto">
							Примінити
						</span>
					</button>
				</div>
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
						Оплатити
					</template>

					<template v-else>
						Оформити
					</template>

					| 

					<div class="inline-block relative">
						<span>
							{{ productsPrice }}
						</span>

						<Icon v-if="discount" name="tabler:x" class="w-6 h-8 -top-1.5 -right-1 lg:(w-8 h-8 -top-2.5px -right-1.5) absolute text-red-600" />
					</div>

					<span v-if="discount" class="ml-2">
						{{ priceWithDiscount }}
					</span>

					грн
				</button>
			</div>
		</section>
	</div>
</template>
