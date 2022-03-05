import { UserDTO } from "../../../common/dist";
import { config } from "../config";
import { defaultHeaders, handleResponse } from "../helpers";

export class UserApi {
	private static BASE_URL = config.apiUrl + "/users";

	static async updatePayoutOptions(dto: UserDTO.UpdatePayoutOptions) {
		const response = await fetch(this.BASE_URL + "/payout-options", {
			method: "PUT",
			credentials: "include",
			body: JSON.stringify(dto),
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}

	static async updateTradeOfferLink(dto: UserDTO.UpdateTradeOfferLinkDTO) {
		const response = await fetch(this.BASE_URL + "/trade-offer-link", {
			method: "PATCH",
			credentials: "include",
			body: JSON.stringify(dto),
			headers: defaultHeaders(),
		});
		return await handleResponse(response);
	}
}
