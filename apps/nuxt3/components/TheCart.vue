<script setup lang="ts">
import AppSidebar from '@/components/App/AppSidebar.vue';

defineEmits<{
	(event: 'close'): void
}>()

const products = useCartProducts()
const isFull = computed<boolean>(() => products.value.length ? true : false)

const show = ref<boolean>(false)
const sidebar = ref<InstanceType<typeof AppSidebar> | null>(null)

onMounted(() => (show.value = true))

const tabs = [
	{
		name: 'Товари',
		value: 'products'
	},
	{
		name: 'Адреса',
		value: 'address'
	},
]
const tab = ref<string>(tabs[0].value)
</script>

<template>
	<AppSidebar 
		ref="sidebar"
		@close="$emit('close')"
	>
		<div class="flex flex-col h-[calc(100%-7.5rem)] lg:h-[calc(100%-8rem)] min-w-[350px]">
			<section class="flex items-center space-x-4 border-b-2 border-gray-600 px-4 h-18 w-full">
				<button 
					class="appearance-none w-6 h-6" 
					@click="sidebar.close()"
				>
					<Icon name="tabler:x" class="w-6 h-6" />
				</button>

				<ul class="flex items-center space-x-12 text-lg">
					<li
						v-for="item in tabs"
						:key="item.value"
						:class="{ 'font-medium': tab === item.value }" 
						class="cursor-pointer"
						@click="tab = item.value"
					>
						{{ item.name }}
					</li>
				</ul>
			</section>

			<div class="h-[calc(100%-4.5rem)]">
				<CartProducts 
					v-show="tab === 'products'" 
					:products="products" 
					@pay="tab = 'address'"
				/>

				<CartAddress 
					v-show="tab === 'address'" 
					:full="isFull" 
				/>
			</div>
		</div>
	</AppSidebar>
</template>