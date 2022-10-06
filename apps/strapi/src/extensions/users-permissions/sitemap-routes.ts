import type { Subcategory } from 'shared-types';
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'

export default async function(ctx) {
	const categories = await strapi.entityService.findMany('api::category.category', { populate: '*' }) as any[]
	const subcategoriesResults = await strapi.entityService.findMany('api::subcategory.subcategory', { populate: '*' }) as Subcategory[]

	const subcategoriesWithProducts = subcategoriesResults.filter(item => item.products.length)
	const productsSlugsWithCategory = categories.filter(item => item.subcategories.length === 0).map(item => item.products.map(product => `/${item.slug}/product/${product.slug}`)).flat()

	const productsSlugsWithSubcategory = subcategoriesWithProducts.map(item => {
		const category = categories.filter(item => item.subcategories.length).map(({ slug, subcategories }) => ({ slug, subcategories })).find(j => j.subcategories.some(k => k.slug === item.slug)).slug
		return item.products.map(product => `/${category}/${item.slug}/${product.slug}`)
	}).flat()

	const categoriesSlugs = categories.map(item => `/${item.slug}`)

	const res = [...productsSlugsWithSubcategory, ...productsSlugsWithCategory, ...categoriesSlugs]

	try {
		const hostname = process.env.MERCHANT_RETURN_URL
		const sitemap = new SitemapStream({ hostname })

		const outputDir = `${process.cwd()}/public`
		const name = `${outputDir}/sitemap.xml`

		const writeStream = createWriteStream(name);

		sitemap.pipe(writeStream);

		res.forEach(item => {
			sitemap.write({ url: item,  changefreq: 'monthly',  priority: 0.5 })
		})

		sitemap.end();
	} catch (error) {
		console.log(error);
	}
  
	ctx.send(res)
}
