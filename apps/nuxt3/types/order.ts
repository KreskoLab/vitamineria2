import { Product } from "./product"
import { User } from "./user"

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
	status: STATUS
	products: OrderProduct[]
	userinfo: Pick<User, 'name' | 'surname' | 'email' | 'phone'> & {
		post: Pick<User, 'postcode' | 'region' | 'city'> & { name: string }
	}
}