import { Product, Variant } from "./product";
export type CartProduct = Pick<Product, 'id' | 'count'> & Pick<Variant, 'weight'>