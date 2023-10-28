<script setup lang="ts">
import { CategoriesResponse } from '@/interfaces';
import { categoriesQuery } from '@/queries';

const route = useRoute()
const router = useRouter()
const client = useStrapiClient()

const { data: categories } = await useAsyncData(
	'categories',
	() => client<CategoriesResponse>(`categories?${categoriesQuery}`),
	{
		default: (): CategoriesResponse => ({ data: [] })
	}
)

const subcategoriesMenu = reactive({
	show: false,
	category: '',
	list: []
})

watch(() => route.path, () => subcategoriesMenu.show = false)

const isActive = (param: string) => param === route.params.category ? true : false

function getSubcategories(subcategories: object[], category: string) {
	if (subcategories.length) {
		subcategoriesMenu.category = category
		subcategoriesMenu.list = subcategories
		subcategoriesMenu.show = true
	} else subcategoriesMenu.show = false
}

function showMenuOnMobile(to: string, subcategories: object[]) {
	if (!subcategories.length) router.push(`/${to}`)

	else {
		if (subcategoriesMenu.show) {
			if (`/${to}` === route.path) subcategoriesMenu.show = false 
			else router.push(`/${to}`)
		}

		else getSubcategories(subcategories, to)
	}
}
</script>

<template>
	<div
		class="relative w-full h-full"
		@mouseleave="subcategoriesMenu.show = false"
	>
		<ul 
			class="relative flex justify-between lg:(justify-start gap-12 space-x-0) h-full overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-6"
		>
			<li
				v-for="category in categories.data"
				:key="category.id"
				class="
					group
					relative 
					h-full 
					after:(content-DEFAULT absolute top-7 lg:top-14 w-0 h-2px bg-yellow-500 transition-all duration-500)
					after:hover:(bg-teal-300 w-full)
				"
				:class="{ 'after:(!w-full)': isActive(category.attributes.slug) }"
			>
				<NuxtLink
					:to="`/${category.attributes.slug}`"
					class="hidden lg:(flex items-center text-dark-100 text-md font-medium h-full)"
					:class="{ 'text-dark-400': isActive(category.attributes.slug) }"
					@mouseenter="getSubcategories(category.attributes.subcategories.data, category.attributes.slug)"
				>
					{{ category.attributes.name }}
				</NuxtLink>

				<span
					class="flex items-center text-sm text-dark-100 font-medium cursor-pointer h-full lg:hidden"
					:class="{ 'text-dark-400': isActive(category.attributes.slug) }"
					@click="showMenuOnMobile(category.attributes.slug, category.attributes.subcategories.data)"
				>
					{{ category.attributes.name }}
				</span>
			</li>
		</ul>

		<transition 
			enter-active-class="animate-animated animate-faster animate-fadeIn"
			leave-active-class="animate-animated animate-faster animate-fadeOut"
		>
			<ul
				v-if="subcategoriesMenu.show"
				class="flex flex-col flex-wrap gap-x-16 content-start absolute top-8.5 w-[calc(100%+32px)] border-x-0 border-b-2 lg:(top-21 w-[calc(100%+160px)] border-2 border-t-0 h-42 pt-7 px-8) h-full bg-white border-gray-600 z-50 transform -translate-x-1/2 left-1/2 pt-4 px-4"
				@mouseleave="subcategoriesMenu.show = false"
			>
				<li 
					v-for="subcategory in subcategoriesMenu.list" 
					:key="subcategory.id"
					class="text-sm sm:text-lg h-8 lg:h-10"
				>
					<NuxtLink :to="`/${subcategoriesMenu.category}/${subcategory.attributes.slug}`">
						{{ subcategory.attributes.name }}
					</NuxtLink>
				</li>
			</ul>
		</transition>
	</div>
</template>

<style scoped>
::-webkit-scrollbar {
	display: none;
}
</style>
