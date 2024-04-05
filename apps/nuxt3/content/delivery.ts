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
		name: 'Rozetka пункт видачі (39 грн)',
		value: POST.ROZETKA
	}
]

export const REGIONS: string[] = [
	'Київська',
	'Вінницька',
	'Волинська',
	'Дніпропетровська',
	'Житомирська',
	'Закарпатська',
	'Запорізька',
	'Івано-Франківська',
	'Кіровоградська',
	'Львівська',
	'Миколаївська',
	'Одеська',
	'Полтавська',
	'Рівненська',
	'Тернопільська',
	'Харківська',
	'Херсонська',
	'Хмельницька',
	'Черкаська',
	'Чернівецька',
	'Чернігівська'
]
