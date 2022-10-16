<script setup lang="ts">
import AppSidebar from '@/components/App/AppSidebar.vue';

const products = useCartProducts()
const showCart = useCart()
const tab = useCartTab()

const sidebar = ref<InstanceType<typeof AppSidebar> | null>(null)
</script>

<template>
	<AppSidebar 
		ref="sidebar"
		@close="showCart = false"
	>
		<div class="flex flex-col h-[calc(100%-7.5rem)] lg:h-[calc(100%-8rem)] min-w-[350px]">
			<CartNav :sidebar="sidebar" />

			<div class="h-[calc(100%-4.5rem)]">
				<CartProducts 
					v-show="tab.value === 'cart'" 
					:products="products" 
				/>

				<LazyCartAddress 
					v-show="tab.value === 'address'" 
				/>
			</div>
		</div>
	</AppSidebar>
</template>
