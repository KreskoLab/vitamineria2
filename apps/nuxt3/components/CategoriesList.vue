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
			class="relative flex justify-between lg:(justify-start gap-6 space-x-0) h-full overflow-x-auto overflow-y-auto whitespace-nowrap space-x-3"
		>
			<li
				v-for="(category, i) in categories.data"
				:key="category.id"
				class="
					group
					relative 
					h-full 
				"
			>
				<NuxtLink
					:to="`/${category.attributes.slug}`"
					class="hidden lg:(flex items-center justify-center text-dark-100 text-md font-medium h-full )"
					:class="{ 'text-dark-400': isActive(category.attributes.slug) }"
					@mouseenter="getSubcategories(category.attributes.subcategories.data, category.attributes.slug)"
				>
					<div :class="{ '!bg-orange-300': isActive(category.attributes.slug) }" class="flex items-center gap-2 bg-light-400 rounded-md h-max px-1">
						{{ category.attributes.name }}

						<svg
							v-if="i === 0"
							fill="currentColor" height="12" width="12"  
							viewBox="0 0 330 330">
							<path
								id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
						</svg>
					</div>
				</NuxtLink>

				<span
					class="flex items-center text-sm text-dark-100 font-medium cursor-pointer h-full bg-light-400 rounded-md px-1 lg:hidden"
					:class="{ '!text-dark-900 !bg-orange-300': isActive(category.attributes.slug) }"
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
				class="flex flex-col flex-wrap gap-x-16 content-start absolute top-8.5 w-[calc(100%+32px)] border-x-0 border-b-2 lg:(top-21 w-[calc(100%+160px)] border-2 border-t-0 h-42 pt-7 px-8) bg-white border-gray-600 z-50 transform -translate-x-1/2 left-1/2 pt-4 px-4"
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
