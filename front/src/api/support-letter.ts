import { SupportLetterDTO } from "../../../common/dist";
import { config } from "../config";
import { handleResponse } from "../helpers";

export class SupportLetterApi {
	private static BASE_URL = config.apiUrl + "/support-letter";

	static async create(dto: SupportLetterDTO.Create) {
		const form = new FormData();
		for (const key in dto) {
			form.append(key, dto[key as keyof SupportLetterDTO.Create]);
		}

		const response = await fetch(this.BASE_URL, {
			method: "POST",
			credentials: "include",
			body: form,
		});

		return await handleResponse(response);
	}
}
