<script setup lang="ts">
import { marked } from 'marked';
import { productAttirbutes } from '@/content';
import type { ProductResponse } from '@/interfaces';
import type { Variant } from '@/types';

const client = useStrapiClient()
const route = useRoute()

const param = route.params.slug as string

const { data } = await useAsyncData(() => client<ProductResponse>(`https://admin.vitamineria.com.ua/api/products?filters[slug][$eq]=${param}&populate=*`));
const response = data.value?.data

const { name, images, prices, brief, in_stock, ...rest } = response[0].attributes

const computedAttributes = computed(() => Object.fromEntries(Object.entries(productAttirbutes).filter(([key]) => rest[key]).map(([key]) => {
	return [key, rest[key]]
})))

useHead({
	title: name,
})

const cartProduct = reactive({
	id: response[0].id,
	variant: prices[0].variants[0].weight,
	price: prices[0].variants[0].price
})

async function add() {
	await addToCart({ id: response[0].id, weight: cartProduct.variant, count: 1 })
}

function selectVariant(variant: Variant) {
	cartProduct.price = variant.price
	cartProduct.variant = variant.weight
}
</script>

<template>
	<article class="w-full top-30 z-10 md:(top-32 fixed) bg-[#FCF7F1]">
		<AppContainer class="flex flex-col h-[calc(100vh-7.5rem)] md:(flex-row h-[calc(100vh-8rem)])">
			<section class="relative flex flex-col h-max order-last md:(h-full order-first min-w-156 max-w-156 overflow-y-auto) bg-[#FCF7F1]">
				<div class="flex flex-col space-y-4 py-5 px-4 border-t-2 lg:(border-r-2 border-t-0) border-gray-600">
					<div class="flex items-start justify-between">
						<h1 class="text-2xl lg:text-4xl text-dark-400 font-medium tracking-wide">
							{{ name }}
						</h1>
	
						<button 
							class="flex justify-center items-center w-8 h-8 flex-shrink-0 bg-white border-2 border-gray-600 transform duration-100 z-10 hover:(translate-y-[1px]) after:(content-DEFAULT absolute transform translate-y-[0.4rem] -right-[2px] -left-[2px] bottom-0 border border-t-4 border-t-gray-600 border-transparent) after:hover:(bottom-[1.5px])"
							@click="$router.back()"
						>
							<Icon name="tabler:arrow-back" class="w-4 h-4 text-dark-200" />
						</button>
					</div>
	
					<div v-html="marked(brief)" />
	
					<div class="flex items-center justify-between font-medium text-dark-100">
						<span class="text-2xl lg:text-3xl text-orange-400">
							{{ cartProduct.price }} грн
						</span>
					</div>
				</div>
	
				<div v-if="in_stock" class="flex items-center bg-light-50">
					<AppDropdown class="w-96 lg:(flex-grow h-20) border-t-2 border-r-2 border-gray-600">
						<template #default>
							<div class="flex items-center justify-evenly">
								<span class="text-center text-lg">
									{{ cartProduct.variant }}
								</span>
	
								<Icon name="tabler:chevron-down" class="w-6 h-6 flex-shrink-0" />
							</div>
						</template>
	
						<template #menu>
							<AppDropdownItem
								v-for="variant in prices[0].variants"
								:key="variant.price"
								@click="selectVariant(variant)"
							>
								{{ variant.weight }}
							</AppDropdownItem>
						</template>
					</AppDropdown>
	
					<button 
						class="appearance-none bg-[#1D7F75] h-full w-64 font-semibold text-xl text-[#FCF7F1] border-t-2 lg:(border-r-2 border-t-2) border-gray-600" 
						@click="add()"
					>
						В кошик
					</button>
				</div>
	
				<section
					v-for="(item, i) in computedAttributes"
					:key="i"
				>
					<AppAccordion 
						v-if="item"
						class="border-t-2 lg:(border-r-2) border-gray-600 py-5 px-4"
					>
						<template #trigger>
							<h2 class="text-xl lg:text-2xl font-semibold text-dark-400 text-left">
								{{ productAttirbutes[i] }}
							</h2>
						</template>
	
						<template #content>
							<div 
								v-if="productAttirbutes[i] !== productAttirbutes['energy']" 
								v-html="marked(item)" 
							/>
	
							<table
								v-else 
								class="w-full mt-4 text-sm"
							>
								<tr v-for="row in item" :key="row.title">
									<td>
										<span class="font-medium">
											{{row.title}}
										</span>
									</td>
	
									<td>
										{{row.value}}
									</td>
								</tr>
							</table>
						</template>
					</AppAccordion>
				</section>
			</section>
	
			<section class="w-full order-first md:(order-last overflow-y-auto h-full)">
				<ul class="hidden md:grid grid-cols-1 lg:grid-cols-2">
					<li 
						v-for="image in images.data" 
						:key="image.id" 
						class="lg:(border-b-2 border-r-2 border-gray-600) bg-[#F0F4F5] p-10"
					>
						<NuxtImg 
							:src="image.attributes.hash + image.attributes.ext"
							:width="image.attributes.width"
							:height="image.attributes.height"
							provider="cloudinary"
							format="webp"
							loading="lazy"
						/>
					</li>
				</ul>
	
				<ImageSlider :images="images.data" />
			</section>
		</AppContainer>
	</article>
</template>

<style scoped>
td {
  padding: 5px 0;
}
</style>
