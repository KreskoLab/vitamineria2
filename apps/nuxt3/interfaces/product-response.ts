import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'
import type { Product } from '@/types/product';

export interface ProductResponse {
	data: Strapi4ResponseData<Product>[]
}