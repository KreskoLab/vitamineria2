import { OrderInfo } from "./order-info"
import { Product } from "./product"

export enum STATUS {
	done = 'Виконано',
	pending = 'Оброблюється',
	canceled = 'Скасовано'
}

type OrderProduct = Pick<Product, 'id' | 'count' | 'name'> & { weight: string }

export type Order = {
	id: number
	paid: boolean
	date: string
	sum: number
	uuid: string;
	status: STATUS
	products: OrderProduct[]
	userinfo: OrderInfo,
	publishedAt: Date
}
