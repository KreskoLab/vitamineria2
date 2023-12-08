import { PAYMENT } from "shared-types"

type Payment = {
	name: `${PAYMENT}`,
	value: PAYMENT
}

export const payments: Payment[] = [
	// {
	// 	name: 'Онлайн',
	// 	value: PAYMENT.ONLINE
	// },
	{
		name: "Готівка",
		value: PAYMENT.CASH
	},
	{
		name: "За реквізитами",
		value: PAYMENT.CARD
	}
]
