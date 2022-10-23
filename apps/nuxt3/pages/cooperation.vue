<script setup lang="ts">
import type { ProductPreview } from '@/types';

useHead({
	title: 'Співпраця'
})

const products: ProductPreview[] = [
	{
		name: 'Пастила в асортименті 100 г =',
		price: 79,
		oldPrice: 99,
		image: 'SMALL_photo1666351091_2_a3202d2b0b.jpg',
	},
	{
		name: 'Зефірно-яблучна порційна =',
		price: 20,
		oldPrice: 25,
		image: 'SMALL_photo1666351178_5d17377661.jpg',
	},
	{
		name: 'Пастила "take away" =',
		price: 15,
		oldPrice: 19,
		image: 'SMALL_photo1666351178_1_fc39dd315b.jpg',
	},
	{
		name: 'Заварна пастила «Бізе» 50г =',
		price: 44,
		oldPrice: 55,
		image: 'SMALL_photo1666351091_1_76eda05fa6.jpg',
	},
	{
		name: 'Злаково-горіхове печиво 100г =',
		price: 52,
		oldPrice: 65,
		image: 'SMALL_photo1666351091_0e4b3b08fb.jpg',
	},
	{
		name: 'Фріпси в асортименті',
		image: 'SMALL_photo1665581014_1_46b04cc937.jpeg',
	}
]
</script>

<template>
	<div class="w-full h-[calc(100vh-7.5rem)] lg:(h-[calc(100vh-8rem)]) overflow-y-auto">
		<AppContainer class="flex flex-col"> 
			<div class="flex flex-col space-y-6 pt-5 lg:(space-y-3 px-12 pt-6)">
				<p class="text-center text-2xl lg:(text-3xl px-64) text-dark-200">
					Ми відкриті до співпраці з  кав'ярнями та кафе, а також до  гуртових продажів по всій території України
				</p>

				<p class="text-2xl italic text-center lg:uppercase">
					Пропонуємо <span class="font-bold text-orange-500">
						20%
					</span> знижки на весь асортимент
				</p>
				
			</div>

			<div class="mt-8 grid place-items-center grid-cols-2 gap-x-6 gap-y-3 px-4 xl:(grid-cols-3 gap-6 px-32) pb-8">
				<article v-for="product in products" :key="product.image" class="relative w-full h-full">
					<div class="flex flex-col items-center">
						<NuxtImg 
							:src="product.image"
							provider="cloudinary"
							format="webp"
							loading="lazy"
							class="border-4 border-light-50 h-auto max-w-full object-cover"
						/>
      
						<div class="flex flex-col items-center w-full mt-1 lg:mt-2 text-center">
							<div class="text-sm px-4 lg:px-0 sm:text-base lg:text-xl font-medium text-dark-400 break-words">
								{{ product.name }}

								<div v-if="product.oldPrice" class="inline-block relative">
									<span class="text-dark-50">
										{{ product.oldPrice }}
									</span>

									<Icon name="tabler:x" class="w-6 h-8 -top-1.5 -right-1 lg:(w-8 h-8 -top-2.5px -right-1.5) absolute text-red-600" />
								</div>

								<span v-if="product.oldPrice" class="pl-2">
									{{ product.price }} грн
								</span>
							</div>
						</div>
					</div>
				</article>
			</div>
		</AppContainer>
	</div>
</template>
