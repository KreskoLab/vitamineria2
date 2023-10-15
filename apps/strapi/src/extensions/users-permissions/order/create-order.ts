import { Context } from 'koa'
import { Order, PAYMENT, POST, Product, User, CartProduct, OrderInfo } from 'shared-types'
import { hashMerchantSecret, sendEmial } from '../utils';
import { getService } from '@strapi/plugin-users-permissions/server/utils';
import { notification } from './telegram';4
import { randomUUID } from 'crypto'
import axios from 'axios';

interface RequestBody {
	request: {
		body: {
			order: OrderInfo,
			cart: CartProduct[]
		}
	},
	state: {
		user: {
			id: number
		}
	}
}

export default async function(ctx: Context & RequestBody) {
	const { order, cart } = ctx.request.body  

	try {
		await notification();
	} catch (error) {
		console.log(error);
	}
		    
	try {
		const { id } = ctx.state.user;    
		const isPost = order.post.name === POST.NOVAPOSHTA || order.post.name === POST.UKRPOSHTA

		if (id && isPost) {      
			const body = {
				postcode: order.post.code || '',
				city: order.post.city || '',
				region: order.post.region || ''
			}

			const user = await getService('user').fetch(id) as User;

			if (!user) ctx.send(`User not found`)
			else await getService('user').edit(id, body)
		}
	} catch (error) {
		console.log(error);
	}
        
	try {
		if (order.account) {
			const userExist = await strapi.db.query('plugin::users-permissions.user').findOne({
				where: { email: order.email }
			}) as User     
	
			if (!userExist) {
				await strapi.plugins['users-permissions'].services.user.add({
					blocked: false,
					confirmed: true, 
					username: `${order.name} ${order.surname}`,
					email: order.email,
					name: order.name,
					surname: order.surname,
					phone: order.phone,
					region: order.post.region || '',
					city: order.post.city || '',
					postcode: order.post.code || '',
					password: 'secretpassword',
					provider: 'local',
					created_by: 1,
					updated_by: 1,
					role: 1
				});
	
				const helloMsg = `
						Вітаємо в родині Вітамінерія!
						Ваш акаунт ${order.email}
						Приємних покупок!
					`
	
				await sendEmial(order.email, 'Реєстрація', helloMsg)
			} else ctx.send('error');
		}
	} catch (error) {
		console.log(error);
	}

	const couponService = strapi.services['api::cuopon.cuopon']
	const { results: couponsResults } = await couponService.find(order.promocode);
	const discount = couponsResults.find(item => item.name === order.promocode).discount || 0;

	const ordersService = strapi.services['api::order.order']
	const cartProductsIds = cart.map(item => item.id)

	const results = await strapi.entityService.findMany('api::product.product', { populate: '*' }) as Product[]
	const products = results.filter(item => cartProductsIds.includes(item.id))    

	const productName = []
	const productPrice = []
	const productCount = []
  
	const orderProducts = []

	cart.forEach(item => {
		const name = `${products.find(product => product.id === item.id).name} (${item.weight})`
		const price = products.find(product => product.id === item.id).prices[0].variants.find(variant => variant.weight === item.weight).price

		productName.push(name)
		productPrice.push(price)
		productCount.push(item.count)

		orderProducts.push({
			name: name,
			price: price,
			count: item.count
		})
	})

	const sum = productPrice.reduce((acc, cv, i) => acc + cv * productCount[i], 0);
	const sumWithPromocode =  sum - (discount * sum) / 100;

	const newOrder = await ordersService.create({ 
		data: {
			userinfo: order,
			products: orderProducts, 
			date: new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }),
			publishedAt: new Date(),
			sum: sumWithPromocode,
			uuid: randomUUID({ disableEntropyCache: true }),
		}
	}) as Order   

	const isOrderUnpaid = order.payment === PAYMENT.CASH || order.payment === PAYMENT.CARD

	if (isOrderUnpaid) {
		ctx.send(newOrder.id)
	}

	else {
		const orderDate = new Date(newOrder.publishedAt).getTime()

		const hashProductsNames = productName.map(item => `${item};`).join('')
		const hashProductsCount = productCount.map(item => `${item};`).join('')  
		const hashProductsPrices = productPrice.map(item => `${item};`).join('').slice(0, -1)

		const hashString = `${process.env.MERCHANT_ACCOUNT};${process.env.MERCHANT_DOMAIN};${newOrder.uuid};${orderDate};${sumWithPromocode};UAH;`
		const hex = hashString + hashProductsNames + hashProductsCount + hashProductsPrices

		const requestData = {
			merchantAccount: process.env.MERCHANT_ACCOUNT,
			merchantDomainName: process.env.MERCHANT_DOMAIN,
			merchantSignature: hashMerchantSecret(hex),
			currency: "UAH",
			amount: sumWithPromocode,
			language: "UA",
			returnUrl: `${process.env.MERCHANT_RETURN_URL}/order?id=${newOrder.uuid}` ,
			orderReference: newOrder.uuid,
			orderNo: newOrder.uuid, 
			orderDate: orderDate,
			productName: productName,
			productPrice: productPrice,
			productCount: productCount,
			clientEmail: order.email || '',
			clientPhone: order.phone || '',
			clientFirstName: order.name || '',
			clientLastName: order.surname || ''
		}        
          
		const res = await axios.post('https://secure.wayforpay.com/pay?behavior=offline', JSON.stringify(requestData))    
				
		if (res.data.url) {
			ctx.send(res.data.url);
		} else ctx.send('error');
	}
}
