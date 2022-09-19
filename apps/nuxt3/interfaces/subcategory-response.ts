import type { Subcategory, Product } from '@/types';
import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'

export interface SubcategoryResponse {
	data: Strapi4ResponseData<
	Subcategory & { products: { data: Strapi4ResponseData<Product>[] } } & { seo: { description: string, keywords: string }[] }
	>[]
}