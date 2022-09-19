import { Context } from 'koa'
import { getService } from '@strapi/plugin-users-permissions/server/utils';
import { User, Order, Product } from 'shared-types'

interface CtxState {
	state: {
		user: {
			id: number
		}
	}
}

export default async function(ctx: Context & CtxState) {
	const { id } = ctx.state.user;
	const user = await getService('user').fetch(id) as User;

	if (!user) {
		ctx.send('User not found')
	}

	else {
		const orders = await strapi.entityService.findMany('api::order.order') as Order[]
		const userOrders = orders.filter(order => order.userinfo.email === user.email) || []

		if (userOrders.length) {
			const products = await strapi.entityService.findMany('api::product.product') as Product[]

			userOrders.forEach((order, i, arr) => {     
				const orderProductsIds = order.products.map(product => product.id)             
				const productsNames = products.filter(product => orderProductsIds.includes(product.id)).map(item => item.name)

				arr[i].products = order.products.map(product => ({ ...product, name: productsNames[i] }))
			})
		}

		ctx.send(userOrders)
	}
}