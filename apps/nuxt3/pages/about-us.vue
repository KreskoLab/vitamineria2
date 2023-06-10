<script setup lang="ts">
useHead({
	title: 'Про нас',
	meta: [{name: 'robots', content: 'noindex, nofollow'}]
})
</script>

<template>
	<main class="flex flex-col gap-24 w-full lg:px-96 py-16 h-[calc(100vh-7.5rem)] lg:(h-[calc(100vh-8rem)]) overflow-y-auto bg-[#F7E4DF]">
		<div class="flex flex-col items-center gap-6 sm:flex-row">
			<img 
				class="w-[558px] h-[535px] object-fill" 
				width="853" 
				height="1280" 
				src="https://res.cloudinary.com/kresko/image/upload/v1684585641/main_fa69b731a2.jpg" 
				alt="customers"
			/>

			<div class="flex flex-col gap-8 text-xl px-4 sm:px-0">
				<p>
					Ми -
					українська родина, що вже тривалий час виготовляє смачні та корисні ласощі для себе та друзів. В 2022 році почали
					готувати пастилу для фруктово-горіхових сухпаїв ЗСУ. А тепер працюємо над тим,
					щоб наші смаколики спробували всі бажаючі.
				</p>

				<p>
					Наша продукція виготовляється виключно вручну, з дбайливим ставленням до кожної деталі, починаючи з відбору сировини та закінчуючи технологією виробництва. В приготуванні використовуємо тільки натуральні інгредієнти, вкладаємо в кожний продукт свою душу.
				</p>

				<p>
					Ми віримо, що здорове харчування може бути смачним, тому запрошуємо вас стати частиною нашої родини "Вітамінерія". Наші продукти додадуть яскравості та задоволення вашому життю!
				</p>
			</div>
		</div>

		<div class="grid grid-cols-2 grid-rows-2 gap-4">
			<img 
				class="row-span-1 col-span-1 object-cover rounded-[8px] h-full w-full" 
				src="https://res.cloudinary.com/kresko/image/upload/v1684586533/photo_5388921489954295375_y_09e84258d6.jpg?width=1280&height=853" 
				alt="customers"
				loading="lazy"
				decoding="async"
			/>

			<img 
				class="row-span-1 col-span-1 object-cover rounded-[8px] h-full w-full" 
				src="https://res.cloudinary.com/kresko/image/upload/v1684587559/photo_5388921489954295376_y_3ccb51e975.jpg?width=1280&height=853" 
				alt="customers"
				loading="lazy"
				decoding="async"
			/>

			<img 
				class="row-span-full object-cover order-last rounded-[8px] w-full h-full" 
				src="https://res.cloudinary.com/kresko/image/upload/v1684585615/photo_5388921489954295377_x_c199cdf723.jpg?width=400&height=602" 
				alt="customers"
				loading="lazy"
				decoding="async"
			/>
		</div>
	</main>
</template>
