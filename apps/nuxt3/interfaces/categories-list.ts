import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'
import type { Category, Subcategory } from '@/types'

export interface CategoriesResponse {
	data: Strapi4ResponseData<Category & { subcategories: {  data: Strapi4ResponseData<Subcategory>[] }}>[]
}