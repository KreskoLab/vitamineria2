import type { CartTab } from '@/content'

export const useCart = () => useState<boolean>('cart', () => false)
export const useLogin = () => useState<boolean>('login', () => false)
export const useResetPassword = () => useState<boolean>('resetPassword', () => false)

export const useCartTab = () => useState<CartTab>('cartTab', () => ({name: 'Кошик', value: 'cart'}))

