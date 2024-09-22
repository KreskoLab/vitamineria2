<script setup lang="ts">
import type { CategoryResponse } from '@/interfaces/category-response';
import { categoryQuery } from '@/queries';

const client = useStrapiClient()
const route = useRoute()

const param = route.params.category as string
const query = categoryQuery(param)

const { data: category } = await useAsyncData(
	'category',
	() => client<CategoryResponse>(`categories?${query}`),
	{
		default: (): CategoryResponse => ({ data: [] })
	}
)

useHead({
	title: category.value?.data[0]?.attributes?.name,
	meta: [
		{
			name: 'description',
			content: category.value?.data[0].attributes.seo[0].description
		},
		{
			name: 'keywords',
			content: category.value?.data[0].attributes.seo[0].keywords
		}
	]
})

function getCategory(product: string): string {
	const subcategorySlug = category.value?.data[0].attributes.subcategories.data.find(item => item.attributes.products.data.find(j => j.attributes?.slug === product))?.attributes.slug

	if (subcategorySlug) return `${category.value?.data[0].attributes.slug}/${subcategorySlug}`
	else return `${category.value?.data[0].attributes.slug}/product`
}
</script>

<template>
	<div 
		class="w-full h-[calc(100vh-7.5rem)] lg:(h-[calc(100vh-8rem)]) overflow-y-auto"
		:style="{ 'background-color': category?.data[0].attributes.color }"
	>
		<AppContainer class="flex flex-col">
			<div class="flex flex-col space-y-1 pt-5 lg:(space-y-3 px-12 pt-6)">
				<h1 class="text-center text-4xl lg:(text-6xl font-normal) font-medium text-dark-200 uppercase tracking-widest">
					{{ category?.data[0].attributes.name }}
				</h1>
				
				<p class="text-2xl italic text-center lg:uppercase">
					{{ category?.data[0].attributes.subtitle }}
				</p>
			</div>
	
			<section class="mt-8 grid place-items-center grid-cols-2 gap-x-6 gap-y-3 px-4 xl:(grid-cols-3 gap-6 px-32) pb-8">
				<ProductCard 
					v-for="product in category?.data[0].attributes.products.data"
					:key="product.id" 
					:category="getCategory(product.attributes.slug)"
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
