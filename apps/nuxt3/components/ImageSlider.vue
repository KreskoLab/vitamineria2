<template>
	<Splide class="block sm:hidden" :options="options">
		<SplideSlide v-for="(image, i) in images" :key="i">
			<NuxtImg 
				:src="image.attributes.hash + image.attributes.ext"
				:width="image.attributes.width"
				:height="image.attributes.height"
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

const props = defineProps<{
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

console.log(props.images);

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
