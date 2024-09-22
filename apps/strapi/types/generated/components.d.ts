import type { Schema, Attribute } from '@strapi/strapi'

export interface PricesSeo extends Schema.Component {
	collectionName: 'components_prices_seos'
	info: {
		displayName: 'seo'
		icon: 'align-left'
	}
	attributes: {
		description: Attribute.String
		keywords: Attribute.String
	}
}

export interface PricesPrices extends Schema.Component {
	collectionName: 'components_prices_prices'
	info: {
		displayName: 'prices'
		icon: 'dollar-sign'
	}
	attributes: {
		variants: Attribute.JSON
	}
}

declare module '@strapi/types' {
	export module Shared {
		export interface Components {
			'prices.seo': PricesSeo
			'prices.prices': PricesPrices
		}
	}
}
