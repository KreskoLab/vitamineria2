import { $fetch } from 'ohmyfetch'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['nuxt-icon', 'nuxt-windicss', '@nuxtjs/strapi', '@vueuse/nuxt', '@nuxt/image-edge', '@nuxtjs/partytown'],

	css: ['@/assets/main.css'],

	ssr: true,

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
				{ children: process.env.GA_SCRIPT, type: 'text/partytown' },
				{ src: process.env.GA_URL, hid: 'gtm', async: true, type: 'text/partytown' },
				{ children: process.env.PIXEL_SCRIPT, type: 'text/partytown', }
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
			]
		},
	},

	partytown: {
		forward: ['dataLayer.push', 'fbq'],
		resolveUrl: `function (url, location, elementType) {
			const proxyElementTypes = ['script', 'iframe'];

			const proxyParams = {
				address: 'https://cdn.builder.codes/api/v1/js-proxy',
				apiKey: '${process.env.PROXY_KEY}',
			};
	
			if (proxyElementTypes.includes(elementType)) {
				const proxyUrl = new URL(proxyParams.address);
				proxyUrl.searchParams.append('url', url.href);
				proxyUrl.searchParams.append('apiKey', proxyParams.apiKey);
				return proxyUrl;
			}
	
			return url;
		},`
	},
})
