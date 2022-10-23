import { createVNode, render } from 'vue'
import { ToastType } from '@/types'
import AppNotification from '@/components/App/AppNotification.vue'

const vNode = createVNode(AppNotification)

if (process.client) {
	const el = document.createElement('div')
	render(vNode, el)
}

export const useNotification = (message: string, type: ToastType) => {
	vNode.component?.exposed?.add(message, type)
}
