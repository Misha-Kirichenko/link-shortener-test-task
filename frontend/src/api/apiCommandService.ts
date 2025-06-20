import type { AxiosResponse } from "axios";
import type { IResMessage } from "../types/res-message.interface";
import type { TNewShortUrlBody } from "../types/short-url.type";
import api from "./api";
import type { ICreatedUrlRes } from "../types/created-url-res.interface";

class ApiCommandService {
	static apibase = `/api/`;

	static async deleteShortUrl(shortUrl: string): Promise<AxiosResponse<IResMessage>> {
		const response = await api.delete(`${ApiCommandService.apibase}/${shortUrl}`);
		return response;
	}

	static async shortenUrl(body: TNewShortUrlBody): Promise<AxiosResponse<ICreatedUrlRes>> {
		const response = await api.post(`${ApiCommandService.apibase}/shorten`, body);
		return response;
	}
}

export default ApiCommandService;