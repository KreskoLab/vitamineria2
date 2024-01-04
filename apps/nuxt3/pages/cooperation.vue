<script setup lang="ts">
import type { ProductPreview } from '@/types';

useHead({
	title: 'Співпраця'
})

const products: ProductPreview[] = [
	{
		name: 'Пастила в асортименті 100 г =',
		price: 104,
		oldPrice: 130,
		image: 'SMALL_viber_image_2023_10_12_12_45_23_445_4667de302c.jpg',
	},
	{
		name: 'Зефірно-яблучна порційна =',
		price: 28,
		oldPrice: 35,
		image: 'SMALL_photo_5348495655741540195_y_38cffdc5c5.jpg',
	},
	{
		name: 'Пастила фруктово-ягідна "take away" =',
		price: 20,
		oldPrice: 25,
		image: 'SMALL_photo1666351178_1_fc39dd315b.jpg',
	},
	{
		name: 'Пастила йогуртові цукерки "take away" =',
		price: 20,
		oldPrice: 25,
		image: 'SMALL_photo_5278518449372516310_w_92b75fd189.jpg',
	},
	{
		name: 'Заварна пастила «Бізе» 50г =',
		price: 56,
		oldPrice: 70,
		image: 'SMALL_photo1666351091_1_76eda05fa6.jpg',
	},
	{
		name: 'Горіхово-злаковий батончик 20г =',
		price: 20,
		oldPrice: 25,
		image: 'SMALL_photo_5305555088112208383_y_e0fd1f35ec.jpg',
	},
	{
		name: 'Гранола "take away" 125г =',
		price: 40,
		oldPrice: 50,
		image: 'SMALL_photo1667043252_3_564d287481.jpg',
	},
	{
		name: 'Гранола в асортименті 300г = ',
		price: 80,
		oldPrice: 100,
		image: 'SMALL_photo1666713196_100fd04472.jpg',
	},
	{
		name: 'Новорічний набір Ялинка 1шт = ',
		price: 65,
		oldPrice: 80,
		image: 'SMALL_photo1668186659_f34552b710.jpg',
	},

	{
		name: 'Йогуртова пастила 100г = ',
		price: 104,
		oldPrice: 130,
		image: 'SMALL_photo_5246985340651162256_y_e38be4fe32',
	},

	{
		name: 'Фріпси в асортименті',
		image: 'SMALL_photo1665581014_1_46b04cc937.jpeg',
	},

	{
		name: 'Оренда полички в подарунок <br /> 36x30x30 см ШxВxГ',
		image: 'SMALL_photo_5246910410651715303_y_6fd5be3411.jpeg',
	},

	{
		name: 'Оренда полички в подарунок <br /> 26x19x18 см ШxВxГ',
		image: 'SMALL_photo_5246910410651715304_y_786e45a019.jpeg',
	},

	{
		name: 'Оренда полички в подарунок <br /> 9x9x9 см ШxВxГ',
		image: 'SMALL_photo_5348362477395628376_y_d7fabba31a.jpeg',
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
								<span v-html="product.name" />

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
