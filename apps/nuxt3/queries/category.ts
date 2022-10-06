import qs from 'qs'

export const categoryQuery = (param: string) => qs.stringify({
	fields: ['name', 'slug', 'color', 'subtitle'],
	filters: {
		slug: {
			$eq: param
		},
	},
	populate: {
		products: {
			populate: {
				prices: {
					fields: '*'
				},
				cover: {
					fields: ['formats'],
				},
			},
			fields: ['name', 'slug', 'message']
		},
		seo: {
			fields: '*'
		},
		subcategories: {
			fields: ['slug'],
			populate: {
				products: {
					fields: ['slug']
				}
			}
		},
	},
}, {
	encodeValuesOnly: true,
});
