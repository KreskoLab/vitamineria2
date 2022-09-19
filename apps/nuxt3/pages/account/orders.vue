<script setup lang="ts">
import { STATUS } from '~~/types/order';
import type { Order } from '~~/types';
  
const client = useStrapiClient()

const { data: orders } = await useAsyncData(
	'orders',
	() => client<Order[]>('me/orders'),
	{
		default: (): Order[] => []
	}
)

function orderName(id: number, date: string) {
	const orderDate = date.split(',')[0]
	return `№ ${id} від ${orderDate}`
}

function orderStatusBg(status: STATUS) {  
	switch (status) {
		case STATUS.canceled:
			return 'bg-red-300'

		case STATUS.pending:      
			return 'bg-amber-300'
  
		case STATUS.done:
			return 'bg-green-300'
	}
}
</script>
  
<template>
	<div class="h-full">
		<h1 class="font-semibold text-2xl">
			Мої Замовлення
		</h1>
    
		<div class="flex flex-col space-y-5 mt-10">
			<div 
				v-for="order in orders" 
				:key="order.id"
				class="flex items-center justify-between border-2 border-gray-600 py-4 px-5 h-max"
			>
				<div class="flex flex-col space-y-1">
					<span class="text-sm">
						{{ orderName(order.id, order.date) }}
					</span>
          
					<span 
						class="text-center"
						:class="orderStatusBg(STATUS[order.status])"
					>
						{{ STATUS[order.status] }}
					</span>
				</div>

				<div 
					class="flex flex-col space-y-2"
				>
					<p
						v-for="{ id, name, count, weight } in order.products" 
						:key="id"
						class="font-medium"
					>
						{{ name }}
            
						<br />

						<span class="text-sm">
							{{ `${weight} ${count} шт` }}
						</span>
					</p>
				</div>

				<span>
					{{ order.sum }} грн
				</span>
			</div>
		</div>
	</div>
</template>