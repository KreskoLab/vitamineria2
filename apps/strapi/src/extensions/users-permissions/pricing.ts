import type { Product } from 'shared-types';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { writeFile } from 'node:fs/promises'
import { Converter } from 'showdown'
import { groupBy, uniqBy } from 'lodash'
import dayjs from 'dayjs';

const convertor = new Converter();

function productsMapper(products: any[]) {
	const signleItems = products.filter(item => item.prices[0].variants.length === 1);
	const itemsWithVariants = products.filter(item => item.prices[0].variants.filter(variant => variant.weight !== '50 грам')).filter(item => item.prices[0].variants.length > 1);

	const res = [];

	itemsWithVariants.forEach(item => {
		item.prices[0].variants.forEach((variant, index) => {
			const images = (item as any).images.map(item => item?.url);
			const pictures = [...new Set([item.cover.url, ...images])]
			const stock_quantity = item.rozetka_available ? item.stock_quantity : 0;

			const params = [
				{ '@name': 'Вага', paramName: variant.weight },
				{ '@name': 'Вид', paramName: item.rozetka_filter_vid },  
				{ '@name': 'Тип', paramName: item.rozetka_filter_tip },  
				{ '@name': 'Упаковка', paramName: item.rozetka_filter_upakovka },  
				{ '@name': 'Термін зберігання', paramName: item.rozetka_termin_zberiganya },  
				{ '@name': 'Умови зберігання', paramName: item.rozetka_filter_umovi_zberiganya },  
				{ '@name': 'Країна-виробник', paramName: item.rozetka_filter_krayina_virobnyk },
			].filter(param => param.paramName)

			if (item.rozetka_filter_obosblivosti) {
				const osoblivosti = item.rozetka_filter_obosblivosti.map(item => item.name).join(' <br /> ');
				params.push({ '@name': 'Особлиовості', paramName: `<![CDATA[${osoblivosti}]]` })
			}

			if (item.energy) {
				const energy = item.energy.map(item => `${item.title} ${item.value}`).join(' - ');
				params.push({ '@name': 'Харчова та енергетична цінність', paramName: energy })
			}

			res.push({
				'@available': item.rozetka_available, 
				'@id': `${item.categoryId}${item.id}${index}`, 
				categoryId: item.categoryId, 
				currencyId: 'UAH', 
				vendor: 'Вітамінерія', 
				stock_quantity: item.in_stock ? stock_quantity : 0,
				price: variant.price, 
				picture: pictures, 
				name: `${item.name} Вітамінерія ${variant.weight}`, 
				description: convertor.makeHtml(item.description_rozetka).trim(), 
				param: params,
			})
		})
	})

	signleItems.forEach(item => {
		const images = (item as any).images.map(item => item?.url)
		const pictures = [...new Set([item.cover.url, ...images])]
		const stock_quantity = item.rozetka_available ? item.stock_quantity : 0;

		const params = [
			{ '@name': 'Вага', paramName: item.prices[0].variants[0].weight },
			{ '@name': 'Вид', paramName: item.rozetka_filter_vid },  
			{ '@name': 'Тип', paramName: item.rozetka_filter_tip },  
			{ '@name': 'Упаковка', paramName: item.rozetka_filter_upakovka },  
			{ '@name': 'Термін зберігання', paramName: item.rozetka_termin_zberiganya },  
			{ '@name': 'Умови зберігання', paramName: item.rozetka_filter_umovi_zberiganya },  
			{ '@name': 'Країна-виробник', paramName: item.rozetka_filter_krayina_virobnyk }  
		].filter(param => param.paramName)

		if (item.rozetka_filter_obosblivosti) {
			const osoblivosti = item.rozetka_filter_obosblivosti.map(item => item.name).join(' <br /> ');
			params.push({ '@name': 'Особлиовості', paramName: `<![CDATA[${osoblivosti}]]` })
		}

		if (item.energy) {
			const energy = item.energy.map(item => `${item.title} ${item.value}`).join(' - ');
			params.push({ '@name': 'Харчова та енергетична цінність', paramName: energy })
		}
		
		res.push({
			'@available': item.rozetka_available, 
			'@id': `${item.categoryId}${item.id}`, 
			categoryId: item.categoryId, 
			price: item.prices[0].variants[0].price, 
			currencyId: 'UAH', 
			picture: pictures, 
			vendor: 'Вітамінерія', 
			stock_quantity: item.in_stock ? stock_quantity : 0,
			name: `${item.name_rozetka}`, 
			description: convertor.makeHtml(item.description_rozetka).trim(), 
			param: params,
		})
	})

	return res
}

export default async function(ctx) {
	const products = await strapi.entityService.findMany('api::product.product', { populate: '*' }) as Product[];
	const categories = await strapi.entityService.findMany('api::category.category', { populate: '*' }) as any[]
	const subcategories = await strapi.entityService.findMany('api::subcategory.subcategory', { populate: '*' }) as any[]


	const rozetkaCategories = categories.map(item => ({ id: item.categoryId, rozetka_id: item.rozetka_id, name: item.rozetka_name }))

	const rozetkaProducts = categories.map(category => category.products.map(product => ({ ...product, rozetka_category_name: category.rozetka_name || category.subcategories.find(subcategory => subcategory.rozetka_name), categoryId: category.categoryId }))).flat().filter(product => product.rozetka_available)

	const rozetkaSubcatgoriesProducts = subcategories.map(subcategory => {
		const parentCategory = categories.find(category => category.subcategories.find(item => item.slug === subcategory.slug));

		return subcategory.products.filter(product => product.rozetka_available).map(product => ({
			...product,
			rozetka_category_name: subcategory.rozetka_name || parentCategory.rozetka_name,
			categoryId: parentCategory.categoryId,
		}))
	}).flat()

	const allRozetkaProducts = uniqBy([...rozetkaProducts, ...rozetkaSubcatgoriesProducts], 'slug');

	const rozetkapProductswithPrices = allRozetkaProducts.map(item => {
		const itemWithPrice = products.find(product => product.slug === item.slug);

		if (itemWithPrice) {
			return {
				...item,
				cover: itemWithPrice.cover,
				images: itemWithPrice.images,
				prices: itemWithPrice.prices,
			}
		}
	}).filter(item => item)

	const mappedProducts = productsMapper(rozetkapProductswithPrices);
	const mappedProductsByCategoryId = Object.keys(groupBy(mappedProducts, 'categoryId'));

	const builder = new XMLBuilder({
		arrayNodeName: "offer",
		attributeNamePrefix: '@',
		ignoreAttributes: false,
		textNodeName: 'paramName',
		suppressBooleanAttributes: false,
	});

	const res = builder.build(mappedProducts)
	const date = dayjs().format('YYYY-MM-DD HH:mm')

	let xmlCategories = '';

	mappedProductsByCategoryId.forEach(key => {
		const rozetkaCategory = rozetkaCategories.find(item => item.id == key);

		if (rozetkaCategory) {
			if (rozetkaCategory?.rozetka_id) {
				xmlCategories += `<category id="${key}" rz_id="${rozetkaCategory.rozetka_id}">${rozetkaCategory.name}</category>`
			} else {
				xmlCategories += `<category id="${key}">${rozetkaCategory.name}</category>`
			}
		}
	})

	const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
      <yml_catalog date="${date}">
        <shop>
          <name>Вітамінерія</name>
          <company>ФОП ЛАНЧЕЄВА ОЛЬГА ВАСИЛІВНА</company>
          <url>https://vitamineria.com.ua/</url>
          <currencies>
            <currency id="UAH" rate="1"/>
          </currencies>
          <categories>
            ${xmlCategories}
          </categories>
          <offers>
            ${res}
          </offers>
        </shop>
      </yml_catalog>
  `

	const parser = new XMLParser({ 
		attributeNamePrefix: '@',
		ignoreAttributes: false,
		textNodeName: 'paramName',
		allowBooleanAttributes: true,
	})

	const formattedXML = builder.build(parser.parse(xml));

	try {
		const outputDir = `${process.cwd()}/public`;
		const fileName = `${outputDir}/pricing.xml`;

		await writeFile(fileName, formattedXML);
	} catch (error) {
		console.log(error);
	}
}
