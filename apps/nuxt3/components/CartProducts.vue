<script setup lang="ts">
import { Product } from '@/types';

defineEmits<{
	(event: 'pay'): void
}>()

const props = defineProps<{
	products: Product[]
}>()

const productsPrice = computed<number>(() => props.products.reduce((acc, cv) => acc + cv.prices[0].variants[0].price * cv.count, 0))
const cartFull = computed<boolean>(() => props.products.length ? true : false)

watch(props.products, (val, oldVal) => {
	if (val.length === oldVal.length) {
		saveCart()
	}
}, { deep: true })

async function removeProduct(id: number, weight: string) {
	await removeFromCart({ id, weight })
}
</script>

<template>
	<div class="flex flex-col justify-between h-full">
		<div class="overflow-y-auto max-h-112 h-full px-4 py-6">
			<ul 
				v-if="cartFull" 
				class="space-y-8"
			>
				<li 
					v-for="product in products" 
					:key="product.slug" 
					class="flex space-x-4"
				>
					<div class="flex items-center justify-center min-h-24 min-w-24 bg-stone-100 p-2">
						<NuxtImg
							:src="product.cover.data.attributes.formats.small.hash + product.cover.data.attributes.formats.small.ext"
							width="256"
							height="256"
							format="webp"
							provider="cloudinary"
							loading="lazy"
							class="w-22 h-26"
						/>
					</div>

					<div class="flex flex-col justify-between">
						<span class="font-semibold max-w-38 lg:max-w-64">
							{{ product.name }}
						</span>

						<AppNumberInput v-model="product.count" />
					</div>

					<div class="flex flex-col justify-between items-end !ml-auto">
						<span class="text-sm font-medium">
							{{ product.prices[0].variants[0].price }} грн
						</span>

						<button @click="removeProduct(product.id, product.prices[0].variants[0].weight)">
							<Icon name="tabler:trash" class="!font-thin w-6 h-6 !text-gray-600" />
						</button>
					</div>
				</li>
			</ul>

			<CartEmpty v-else />
		</div>

		<section 
			v-if="cartFull"
			class="border-t-2 border-gray-600"
		>
			<div class="flex flex-col space-y-6 px-4 py-6">
				<div class="flex justify-between items-center text-xl font-semibold uppercase">
					<span>Всього</span>
					<span>{{ productsPrice.toFixed(2) }} грн</span>
				</div>

				<button
					class="w-full appearance-none border-2 border-gray-600 text-xl font-medium h-14 bg-green-200"
					@click="$emit('pay')" 
				>
					Оформити
				</button>
			</div>
		</section>
	</div>
</template>
