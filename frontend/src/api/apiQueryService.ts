import type { AxiosResponse } from "axios";
import api from "./api";
import type { IUrlListItem } from "../types/url-list-item.interface";


class ApiQueryService {
	static async getResourceByType<T>(type: 'info' | 'analytics', shortUrl: string): Promise<AxiosResponse<T>> {
		const response = await api.get(`/api/${type}/${shortUrl}`);
		return response;
	}
	static async getUrlList(): Promise<AxiosResponse<IUrlListItem[]>> {
		const response = await api.get(`/url-list`);
		return response;
	}
}

export default ApiQueryService;