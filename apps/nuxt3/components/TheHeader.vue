<template>
	<header class="fixed top-10 left-0 w-full h-20 lg:h-22 min-w-[350px] border-b-2 border-gray-600 z-99 bg-no-repeat bg-center bg-cover bg-opacity-10">
		<AppContainer class="flex flex-row flex-wrap px-4 pt-1 lg:(justify-between w-full h-full px-12) items-center">
			<div class="flex lg:flex-1 justify-start flex-shrink-0">
				<a class="flex items-center flex-shrink-0 lg:space-x-1" href="/">
					<img
						class="hidden xl:block"
						width="38"
						height="38"
						src="@/assets/icon.svg"
						alt="icon"
					/>
	
					<img
						width="152"
						height="152"
						class="w-42 lg:w-44"
						src="@/assets/logo.svg"
						alt="logo"
					/>
				</a>
			</div>
	
			<nav class="flex flex-wrap w-full order-last h-8 lg:(h-full items-center w-max h-full)">
				<CategoriesList />
			</nav>
	
			<div class="flex items-center justify-end space-x-6 order-2 ml-auto lg:(flex-grow-0 ml-12 order-last w-max)">
				<UserNav /> 
				<CartIcon />
			</div>
		</AppContainer>
	</header>
</template>

<style>
header {
	background-image: url('@/assets/header.webp');
}
</style>
