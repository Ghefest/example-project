import { SellDTO, SellRO } from "../../../common/dist";
import { config } from "../config";
import { defaultHeaders, handleResponse } from "../helpers";

export class SellApi {
	private static BASE_URL = config.apiUrl + "/sales";

	static async create(dto: SellDTO.CreateSell) {
		const response = await fetch(this.BASE_URL, {
			method: "post",
			credentials: "include",
			body: JSON.stringify(dto),
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}

	static async getActive(): Promise<SellRO> {
		const response = await fetch(this.BASE_URL + "/active", {
			method: "get",
			credentials: "include",
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}

	static async getLastItemsOfCompletedSells() {
		const response = await fetch(this.BASE_URL + "/completed/last/items", {
			method: "get",
			credentials: "include",
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}

	static async getUserSalesSum() {
		const response = await fetch(this.BASE_URL + "/completed/total-sum", {
			method: "get",
			credentials: "include",
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}
}
