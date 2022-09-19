// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['nuxt-icon', 'nuxt-windicss', '@nuxtjs/strapi', '@vueuse/nuxt', '@nuxt/image-edge'],

	css: ['@/assets/main.css'],

	strapi: {
		url: process.env.NUXT_PUBLIC_STRAPI || 'http://localhost:1337'
	},

	image: {
		cloudinary: {
			baseURL: 'https://res.cloudinary.com/kresko/image/upload/'
		}
	},

	app: {
		head: {
			titleTemplate: '%s - Вітамінерія',
			htmlAttrs: {
				lang: 'uk'
			},
			script: [
				{ children: process.env.GA_SCRIPT },
				{ src: process.env.GA_URL, hid: 'gtm', async: true },
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
			]
		},
	},

	nitro: {
		prerender: {
			crawlLinks: true,
			ignore: ['/auth/', '/account/', '/account', '/order']
		}
	}
})
