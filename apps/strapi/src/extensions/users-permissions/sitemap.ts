import type { Subcategory } from 'shared-types';

export default async function(ctx) {
	const categories = await strapi.entityService.findMany('api::category.category', { populate: '*' }) as any[]
	const subcategoriesResults = await strapi.entityService.findMany('api::subcategory.subcategory', { populate: '*' }) as Subcategory[]

	const subcategoriesWithProducts = subcategoriesResults.filter(item => item.products.length)
	const productsSlugsWithCategory = categories.filter(item => item.subcategories.length === 0).map(item => item.products.map(product => `/${item.slug}/${product.slug}`)).flat()

	const productsSlugsWithSubcategory = subcategoriesWithProducts.map(item => {
		const category = categories.filter(item => item.subcategories.length).map(({ slug, subcategories }) => ({ slug, subcategories })).find(j => j.subcategories.some(k => k.slug === item.slug)).slug
		return item.products.map(product => `/${category}/${item.slug}/${product.slug}`)
	}).flat()


	const res = [...productsSlugsWithSubcategory, ...productsSlugsWithCategory]
  
	ctx.send(res)
}
