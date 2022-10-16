<script setup lang="ts">
import { cartTabs } from '@/content';
import { AppSidebar } from '#components';

const props = defineProps<{
	sidebar: InstanceType<typeof AppSidebar>
}>()

const products = useCartProducts()
const tab = useCartTab()

const tabs = computed(() => products.value.length ? cartTabs : [cartTabs[0]])

function closeCart() {
	props.sidebar.close()
}
</script>

<template>
	<div class="flex items-center space-x-4 border-b-2 border-gray-600 px-4 h-18 w-full">
		<button 
			class="appearance-none w-6 h-6" 
			@click="closeCart()"
		>
			<Icon name="tabler:x" class="w-6 h-6" />
		</button>

		<ul class="flex items-center space-x-12 text-lg">
			<li
				v-for="item in tabs"
				:key="item.value"
				:class="{ 'font-medium': tab.value === item.value }" 
				class="cursor-pointer"
				@click="tab = item"
			>
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>
