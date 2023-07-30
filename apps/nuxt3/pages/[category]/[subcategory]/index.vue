<script setup lang="ts">
import { SubcategoryResponse } from '@/interfaces';
import { subcategoryQuery } from '@/queries';
import { SORT } from '@/types';
	
const client = useStrapiClient()
const route = useRoute()
	
const param = route.params['subcategory'] as string
const query = subcategoryQuery(param)
	
const { data: category } = await useAsyncData(
	'subcategory',
	() => client<SubcategoryResponse>(`subcategories?${query}`),
	{
		initialCache: false,
		transform: (res) => res.data[0].attributes,
		default: (): SubcategoryResponse => ({ data: [] })
	}
)

const sortedProducts = computed(() => {
	if (category.value.sort) {
		switch (category.value.sort) {
			case SORT.LOW:
				return category.value.products.data.sort((a, b) => a.attributes.prices[0].variants[0].price - b.attributes.prices[0].variants[0].price)
	
			case SORT.HIGHT:
				return category.value.products.data.sort((a, b) => b.attributes.prices[0].variants[0].price - a.attributes.prices[0].variants[0].price)
		}
	} else return category.value.products.data
})

const fullRoute = `${route.params.category}/${param}`
	
useHead({
	title: category.value.name,
	meta: [
		{
			name: 'description',
			content: category.value?.seo[0]?.description
		},
		{
			name: 'keywords',
			content: category.value?.seo[0]?.keywords
		}
	]
})
</script>
	
<template>
	<div 
		class="w-full h-[calc(100vh-7.5rem)] lg:(h-[calc(100vh-8rem)]) overflow-y-auto"
	>
		<AppContainer class="flex flex-col">
			<div class="flex flex-col space-y-1 pt-5 lg:(space-y-3 px-12 pt-6)">
				<h1 class="text-center text-4xl lg:(text-6xl font-normal) font-medium text-dark-200 uppercase tracking-widest">
					{{ category.name }}
				</h1>
			</div>
		
			<section class="mt-8 grid place-items-center grid-cols-2 gap-x-6 gap-y-3 px-4 xl:(grid-cols-3 gap-6 px-32) pb-8">
				<ProductCard 
					v-for="product in sortedProducts"
					:key="product.id" 
					:category="fullRoute"
					:name="product.attributes.name" 
					:slug="product.attributes.slug"
					:message="product.attributes.message"
					:price="product.attributes.prices[0].variants[0].price" 
					:image="product.attributes.cover.data.attributes.formats.small.hash + product.attributes.cover.data.attributes.formats.small.ext"
					:height="product.attributes.cover.data.attributes.formats.small.height"
					:width="product.attributes.cover.data.attributes.formats.small.width"
				/>
			</section>
		</AppContainer>
	</div>
</template>
