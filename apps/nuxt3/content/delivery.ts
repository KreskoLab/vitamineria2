import { POST } from "shared-types"

type Delivery = {
	name: `${POST}`,
	value: POST
}

export const delivery: Delivery[] = [
	{
		name: 'Нова пошта',
		value: POST.NOVAPOSHTA
	},
	{
		name: "Укрпошта",
		value: POST.UKRPOSHTA
	},
	{
		name: 'Самовивіз (Київ, Оболонський район)',
		value: POST.SAMOVIVIZ
	},
	{
		name: 'Доставка',
		value: POST.DOSTAVKA
	}
]
