import type { AxiosResponse } from "axios";
import api from "./api";
import type { TShortUrlAnalytics, TShortUrlInfo } from "../types/short-url.type";
import type { IUrlListItem } from "../types/url-list.interface";

type ResourceType = AxiosResponse<TShortUrlAnalytics | TShortUrlInfo>;

class ApiQueryService {
	static async getResourceByType(type: 'info' | 'analytics', shortUrl: string): Promise<ResourceType> {
		const response = await api.get(`/api/${type}/${shortUrl}`);
		return response;
	}
	static async getUrlList(): Promise<AxiosResponse<IUrlListItem[]>> {
		const response = await api.get(`/url-list`);
		return response;
	}
}

export default ApiQueryService;