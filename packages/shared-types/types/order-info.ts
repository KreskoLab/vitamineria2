export enum POST {
	NOVAPOSHTA = 'Нова пошта',
	UKRPOSHTA = 'Укрпошта',
	SAMOVIVIZ = 'Самовивіз (Київ, Оболонський район)',
	ROZETKA = 'Rozetka пункт видачі (49 грн)'
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
	info: string
	promocode?: string;
	post: {
		name: POST,
		region?: string
		city?: string
		code?: number
	},
	payment: PAYMENT
}
