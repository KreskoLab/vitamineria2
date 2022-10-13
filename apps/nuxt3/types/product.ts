import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4'

export type Image = {
	size: number
	updatedAt: string
	url: string
	width: number
	height: number
	hash: string
	ext: string
	formats: {
		small: {
			hash: string
			ext: string
			width: number
			height: number
		},
		medium: {
			hash: string
			ext: string
			width: number
			height: number
		}
	}
}

export type Variant = {
	weight: string
	price: number
}

export type Product = {
	id: number
	name: string
	slug: string
	brief: string
	description: string
	composition: string
	storage: string
	payment: string
	price: number
	count?: number
	in_stock: boolean
	message: string
	energy: {
		title: string
		value: string
	}[]
	prices: {
		variants: Variant[]
	}[]
	cover: { data: Strapi4ResponseData<Image> }
	images: { data: Strapi4ResponseData<Image>[] }
}
