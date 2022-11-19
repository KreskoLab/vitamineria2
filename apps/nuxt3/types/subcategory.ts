import { Product } from "./product"

export enum SORT {
	LOW = 'low',
	HIGHT = 'high'
}

export type Subcategory = {
	name: string
	slug: string
	products: Product[]
	sort?: SORT
}
