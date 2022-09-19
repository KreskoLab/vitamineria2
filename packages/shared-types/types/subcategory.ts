import { Product } from "./product"

export type Subcategory = {
	name: string
	slug: string
	products: Product[]
}
