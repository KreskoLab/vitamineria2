export type User = {
	id: number
	username: string
	name: string
	surname: string
	email: string
	phone: string
	filled: boolean
	region: string
	city: string
	postcode: string
	cart: {
		id: number
		count: number,
		price: number,
		variant: string
	}[]
}
