import { Context } from 'koa'
import { Order, PAYMENT, PAYMENT_STATUS } from 'shared-types'
import { hashMerchantSecret, sendEmial } from '../utils';
import axios from 'axios';

export default async function(ctx: Context) {
	const ordersService = strapi.services['api::order.order']
    
	const orderId = ctx.request.query['id'] as string
	const order = await ordersService.findOne(orderId) as Order
    
	if (order) {
		const customerEmail = order.userinfo.email
		const isOrderUnpaid = order.userinfo.payment === PAYMENT.CASH || order.userinfo.payment === PAYMENT.CARD

		if (isOrderUnpaid) {
			await sendEmial(customerEmail, `Замовлення ${orderId}`, process.env.EMAIL_TEXT)
			ctx.send(PAYMENT_STATUS.SUCCESS)
		}

		else {
			const hashString = `${process.env.MERCHANT_ACCOUNT};${orderId}`
  
			const requestData = {
				transactionType: 'CHECK_STATUS',
				merchantAccount: process.env.MERCHANT_ACCOUNT,
				orderReference: String(orderId),
				merchantSignature: hashMerchantSecret(hashString),
				apiVersion: "1"
			}        

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('ok')
				}, 3000);
			})
  
			const res = await axios.post('https://api.wayforpay.com/api', JSON.stringify(requestData))  
  
			if (res.data.reasonCode === 1100) {
				await ordersService.update(orderId, { data: { paid: true } })
				await sendEmial(customerEmail, `Замовлення ${orderId}`, process.env.EMAIL_TEXT)

				ctx.send(PAYMENT_STATUS.SUCCESS)
			} else ctx.send(PAYMENT_STATUS.SUCCESS)
		}
	} else ctx.send(PAYMENT_STATUS.ERROR)
}
