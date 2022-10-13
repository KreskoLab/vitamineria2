<template>
	<Splide :options="options">
		<SplideSlide v-for="image in images" :key="image.attributes.hash">
			<NuxtImg 
				:src="image.attributes.formats.medium.hash + image.attributes.formats.medium.ext"
				:width="image.attributes.formats.medium.width"
				:height="image.attributes.formats.medium.height"
				provider="cloudinary"
				format="webp"
				loading="lazy"
			/>
		</SplideSlide>
	</Splide>
</template>

<script setup lang="ts">
import { Splide, SplideSlide, Options } from '@splidejs/vue-splide';
import type { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types/v4';
import type { Image } from '@/types';
import '@splidejs/vue-splide/css';

defineProps<{
	images: Strapi4ResponseData<Image>[]
}>()

const options: Options = {
	arrows: false,
	autoWidth: false,
	rewind: false,
	waitForTransition: true,
	drag: true,
	focus: 'center',
	perMove: 1,
	perPage: 1,
	speed: 600,
}
</script>

<style>
button.splide__pagination__page.is-active {
  background-color: #FEB240;
}

button.splide__pagination__page {
  background-color: white;
  border: black 1px solid;
}
</style>
