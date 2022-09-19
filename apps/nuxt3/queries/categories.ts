import qs from 'qs'

export const categoriesQuery = qs.stringify({
	fields: ['name', 'slug'],
	sort: ['priority:desc'],
	populate: {
		subcategories: {
			fields: ['name', 'slug', 'priority'],
			sort: ['priority:desc']
		}
	}
}, {
	encodeValuesOnly: true,
});