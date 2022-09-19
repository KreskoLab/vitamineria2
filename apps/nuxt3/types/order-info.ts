export type OrderInfo = {
	name: string
	surname: string
	phone: string
	email: string
	account: boolean
	post: {
		name: string
		region?: string
		city?: string
		code?: number
	},
	payment: string
}