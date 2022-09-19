<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const client = useStrapiClient()

const loginToken = route.query['loginToken']

if (loginToken) {
	const { data: response } = await useAsyncData('jwt', () => client(`/passwordless/login?loginToken=${loginToken}`))
	const accessToken = useCookie('strapi_jwt', { maxAge: 60 * 60 * 24  * 30 })

	if (response.value?.jwt) {
		accessToken.value = response.value.jwt
	}
}

onMounted(() => router.push('/pastila'))
</script>

<template>
	<div></div>
</template>
