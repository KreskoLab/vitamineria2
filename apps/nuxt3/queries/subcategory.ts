import qs from 'qs'

export const subcategoryQuery = (param: string) => qs.stringify({
	fields: ['name', 'slug'],
	filters: {
		slug: {
			$eq: param
		},
	},
	populate: {
		products: {
			populate: {
				cover: {
					fields: ['formats'],
				},
				prices: {
					fields: '*'
				}
			},
			fields: ['name', 'slug', 'message']
		},
		seo: {
			fields: '*'
		}
	},
}, {
	encodeValuesOnly: true,
});