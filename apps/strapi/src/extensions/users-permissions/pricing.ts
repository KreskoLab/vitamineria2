import type { Product } from 'shared-types';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { writeFile } from 'node:fs/promises'
import { Converter } from 'showdown'
import dayjs from 'dayjs';

const convertor = new Converter();

function productsMapper(products: Product[], slugs: string[], categoryId: number) {
	const items =  products.filter(product => slugs.includes(product.slug));
	const signleItems = items.filter(item => item.prices[0].variants.length === 1);
	const itemsWithVariants = items.filter(item => item.prices[0].variants.filter(variant => variant.weight !== '50 грам')).filter(item => item.prices[0].variants.length > 1);

	const res = [];

	itemsWithVariants.forEach(item => {
		item.prices[0].variants.forEach(variant => {
			const images = (item as any).images.map(item => item.url)
			const stock_quantity = typeof (item as any).stock_quantity === 'number' ? (item as any).stock_quantity : 10;

			res.push({
				'@available': item.in_stock, 
				'@id': item.id, 
				categoryId, 
				currencyId: 'UAH', 
				vendor: 'Вітамінерія', 
				stock_quantity,
				price: variant.price, 
				picture: [(item as any).cover.url, ...images], 
				name: `${item.name} ${variant.weight}`, 
				description: convertor.makeHtml(item.brief).trim(), 
				param: { '@name': 'Вага', paramName: variant.weight } 
			})
		})
	})

	signleItems.forEach(item => {
		const images = (item as any).images.map(item => item.url)
		const stock_quantity = typeof (item as any).stock_quantity === 'number' ? (item as any).stock_quantity : 10;

		res.push({
			'@id': item.id, 
			'@available': item.in_stock, 
			price: item.prices[0].variants[0].price, 
			currencyId: 'UAH', 
			categoryId, 
			picture: [(item as any).cover.url, ... images], 
			vendor: 'Вітамінерія', 
			stock_quantity, 
			name: item.name, description: convertor.makeHtml(item.brief).trim(), 
			param: { '@name': 'Вага', paramName: item.prices[0].variants[0].weight } 
		})
	})

	return res
}

export default async function(ctx) {
	const TOMATI_SLUGS = ['vyaleni-tomati'];
	const TSUKATI_SLUGS = ['cukati-garbuzovi'];
	const PASTILA_SLUGS = ['pastila-asorti']
	const NABORI_SLUGS = ['podarunkovyi-nabir-vyshivanka', 'nabir-fripsiv', 'nabir-pobajaiki', 'nabir-pastili-vse-bude-dobre', 'degystatsiinyi-set', 'set-ukrain', 'set-veleten', 'nabir-with-ukraine', 'nabir-troyanda', 'set-veleten-patriotic', 'nabir-troyanda', 'set-veleten-patriotic', 'nabir-mapa-ukraini', 'nabir-love', 'nabir-vesna', 'nabir-misk-smakolikiv', 'nabir-hvylya-lita', 'nabir-veleten-vesnyanki', 'syrpriz-box', 'syrpriz-box-patriotichniy', 'nabir-kotiki-monstriki', 'nabir-kotiki-kviti', 'nabir-pastili-serce', 'zi-smakom-ta-lyboviu', 'smakyite-ykrainske', 'nabir-ukraine-is-my-home']
	const FRIPSI_SLUGS = ['yabluchni-fripsi', 'grushevi-fripsi', 'bananovi-fripsi', 'slivovi-fripsi', 'yablucnhi-fripsi-gorihi-med', 'fripsi-kivi', 'orange-frips', 'fripsi-limonni', 'fripsi-asorti', 'mandarinovi-fripsi', 'fripsi-hurma', 'fripsi-grapefruit', 'kokosovi-fripsi', 'fripsi-ananas', 'fripsi-mango', 'fripsi-polynitsa', 'fripsi-persik', 'fripsi-dina', 'tomat-fripsi']
  
	const FRIPSI_ID = 3;
	const NABORI_ID = 5;
	const TOMATI_ID = 6;
	const TSUKATI_ID = 9;
	const PASTILA_ID = 1;

	const FRIPSI_ROZETKA_ID = 394181805;
	const NABORI_ROZETKA_ID = 391272087;

	const products = await strapi.entityService.findMany('api::product.product', { populate: '*' }) as Product[];

	const nabori = productsMapper(products, NABORI_SLUGS, NABORI_ID);
	const fripsi = productsMapper(products, FRIPSI_SLUGS, FRIPSI_ID);
	const tomati = productsMapper(products, TOMATI_SLUGS, TOMATI_ID);
	const tsukati = productsMapper(products, TSUKATI_SLUGS, TSUKATI_ID);
	const pastila = productsMapper(products, PASTILA_SLUGS, NABORI_ID);

	const builder = new XMLBuilder({
		arrayNodeName: "offer",
		attributeNamePrefix: '@',
		ignoreAttributes: false,
		textNodeName: 'paramName',
		suppressBooleanAttributes: false,
	});

	const res = builder.build([...nabori, ...fripsi, ...tomati, ...tsukati, ...pastila])
	const date = dayjs().format('YYYY-MM-DD HH:mm')

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
            <category id="${NABORI_ID}" rz_id="${NABORI_ROZETKA_ID}">Жувальні цукерки</category>
            <category id="${FRIPSI_ID}" rz_id="${FRIPSI_ROZETKA_ID}">Сухофрукти</category>
            <category id="${TOMATI_ID}">Овочева консервація</category>
            <category id="${TSUKATI_ID}">Сушені овочі</category>
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
