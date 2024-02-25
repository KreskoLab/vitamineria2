/* eslint-disable @typescript-eslint/no-namespace */
import { $fetch } from 'ohmyfetch'

export namespace Rozetka {
	export interface City {
		id: string;
		name: string;
		region_id: string;
		region_name: string;
	}

	export interface Department {
		id: string;
		name: string;
		location: string;
	}
}

export async function getCities(region: string) {
	try {
		const { data } = await $fetch<{ data: Rozetka.City[]; pagination: { page: number; page_count: number; total_count: number } }>(`https://rz-delivery.rozetka.ua/api/city?region_name=${region}&can_receive_tracks=true&can_give_out_tracks=true&limit=100&sort_by_population=DESC`)
		return data
	} catch (error) {
		console.log(error);
	}
}

export async function getDepartments(cityId: string) {
	try {
		const { data } = await $fetch<{ data: Rozetka.Department[]; pagination: { page: number; page_count: number; total_count: number } }>(`https://rz-delivery.rozetka.ua/api/department?city_id=${cityId}&can_receive_tracks=true&can_give_out_tracks=true&limit=100`)
		return data
	} catch (error) {
		console.log(error);
	}
}
