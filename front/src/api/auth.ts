import { config } from "../config";
import { defaultHeaders, handleResponse } from "../helpers";

export class AuthApi {
	private static BASE_URL = config.apiUrl + "/auth";

	static async getMe() {
		const response = await fetch(this.BASE_URL + "/me", {
			method: "get",
			credentials: "include",
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}

	static async logout() {
		const url = this.BASE_URL + "/logout";

		fetch(url, {
			method: "get",
			credentials: "include",
			headers: defaultHeaders(),
		}).catch(() => {});
	}
}
