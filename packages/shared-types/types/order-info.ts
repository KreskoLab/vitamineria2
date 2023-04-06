export enum POST {
	NOVAPOSHTA = 'Нова пошта',
	UKRPOSHTA = 'Укрпошта',
	SAMOVIVIZ = 'Самовивіз (Київ, Оболонський район)',
	DOSTAVKA = 'Доставка'
}

export enum PAYMENT {
	ONLINE = 'Онлайн',
	CASH = 'Готівка',
	CARD = 'За реквізитами'
}

export type OrderInfo = {
	name: string
	surname: string
	phone: string
	email: string
	account: boolean
	post: {
		name: POST,
		region?: string
		city?: string
		code?: number
	},
	payment: PAYMENT
}
