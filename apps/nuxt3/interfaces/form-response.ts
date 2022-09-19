import type { Form } from '@/types';
import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'

export interface FormResponse {
	data: Strapi4ResponseData<{
		form: Form[]
	}>
}