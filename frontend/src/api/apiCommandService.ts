import type { AxiosResponse } from "axios";
import type { IResMessage } from "../types/res-message.interface";
import type { TNewShortUrlBody } from "../types/short-url.type";
import api from "./api";
import type { ICreatedUrlRes } from "../types/created-url-res.interface";

class ApiCommandService {
	static resourcePath = `/link-shortener`;

	static async deleteShortUrl(shortUrl: string): Promise<AxiosResponse<IResMessage>> {
		const { resourcePath } = ApiCommandService;
		const response = await api.delete(`${resourcePath}/${shortUrl}`);
		return response;
	}

	static async createShortUrl(body: TNewShortUrlBody): Promise<AxiosResponse<ICreatedUrlRes>> {
		const { resourcePath } = ApiCommandService;
		const response = await api.post(`${resourcePath}/shorten`, body);
		return response;
	}
}

export default ApiCommandService;