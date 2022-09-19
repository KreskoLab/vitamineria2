import { createHmac } from 'crypto'

export const hashMerchantSecret = (hashString: string): string => {
	const hmac = createHmac('md5', process.env.MERCHANT_SECRET)
	hmac.update(hashString)

	return hmac.digest('hex')
}

export const sendEmial = async (to: string, subject: string, text: string): Promise<void> => {
	await strapi.plugins['email'].services.email.send({
		from: process.env.EMAIL_FROM,
		to,
		subject,
		text
	})
}