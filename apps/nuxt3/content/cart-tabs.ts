export type CartTab = {
	name: 'Адреса' | 'Кошик',
	value: | 'address' | 'cart',
}

export const cartTabs: CartTab[] = [
	{
		name: 'Кошик',
		value: 'cart'
	},
	{
		name: 'Адреса',
		value: 'address'
	},
]
