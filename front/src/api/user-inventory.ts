import { config } from "../config";
import { defaultHeaders, handleResponse } from "../helpers";

export class UserInventoryApi {
	private static BASE_URL = config.apiUrl + "/user-inventory";

	static async get({ games, sort, order, name, types, rarities, skip = 0, take = 16 }: any) {
		const url = this.BASE_URL + "?";
		let search = new URLSearchParams(games.map((game: any) => ["games", game])).toString();
		if (sort) search += `&sort=${sort}`;
		if (order) search += `&order=${order}`;
		if (name) search += `&name=${name}`;
		if (types.length) search += `&${new URLSearchParams(types.map((t: any) => ["types", t])).toString()}`;
		if (rarities.length) search += `&${new URLSearchParams(rarities.map((r: any) => ["rarities", r])).toString()}`;
		if (skip) search += `&skip=${skip}`;
		if (take) search += `&take=${take}`;

		const response = await fetch(url + search, {
			method: "get",
			credentials: "include",
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}

	static async reload({ games, sort, order, name }: any) {
		const url = this.BASE_URL + "?";
		let search = new URLSearchParams(games.map((game: any) => ["games", game])).toString();
		if (sort) search += `&sort=${sort}`;
		if (order) search += `&order=${order}`;
		if (name) search += `&name=${name}`;
		search += `&skip=0&take=8`;

		const response = await fetch(url + search, {
			method: "put",
			credentials: "include",
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}
}
