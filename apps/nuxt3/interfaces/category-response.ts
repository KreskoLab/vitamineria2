import type { Category, Product, Subcategory } from '@/types';
import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'

export interface CategoryResponse {
	data: Strapi4ResponseData<
	Category 
	& { products: { data: Strapi4ResponseData<Product>[] } } 
	& { seo: { description: string, keywords: string }[] } 
	& { subcategories: { data: Strapi4ResponseData<Pick<Subcategory, 'slug'> & { products: { data: Strapi4ResponseData<Pick<Product, 'slug'>>[] } }>[] } }
	>[]
}
