import { $fetch } from 'ohmyfetch'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['nuxt-icon', 'nuxt-windicss', '@nuxtjs/strapi', '@vueuse/nuxt', '@nuxt/image-edge', '@nuxtjs/partytown'],

	css: ['@/assets/main.css'],

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

	hooks: {
		async 'nitro:config' (nitroConfig) {
			if (nitroConfig.dev) { return }

			if (process.env.NUXT_PUBLIC_STRAPI) {
				const res = await $fetch<string[]>(`${process.env.NUXT_PUBLIC_STRAPI}/api/sitemap`)
				const ignoreRoutes = ['/pastila/ovocheva/pastila-garbuzova-yabluchna-bananova-apelsinova', '/pastila/zefirna/zefirno-yabluchna-parts', '/pastila/fruktova-yagidna/pastila-garbuzova-yabluchna-bananova-apelsinova', '/pastila/novorichni-nabori/nabir-zirkovii', '/pastila/novorichni-nabori/nabir-xxl', '/frips/product/asorti-fripsi-nomer-odin', '/sales/product/ackycia-happy-birthday', '/churchela/product/milk-churchella', '/churchela/product/milk-chocolate-churchella' ]
				nitroConfig.prerender?.routes?.push(...res.filter(item => !ignoreRoutes.includes(item)))
			}
		}
	},

	nitro: {
		prerender: {
			crawlLinks: false,
			ignore: ['/auth/', '/account/', '/account', '/order', '/register', '/reset-password']
		}
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

	compatibilityDate: '2024-12-19',
})
