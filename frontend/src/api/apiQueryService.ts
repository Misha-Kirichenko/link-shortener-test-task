import type { AxiosResponse } from "axios";
import api from "./api";
import type { IUrlListItem } from "../types/url-list-item.interface";


class ApiQueryService {
	static resourcePath = "/urls";

	static async getResourceByType<T>(type: 'info' | 'analytics', shortUrl: string): Promise<AxiosResponse<T>> {
		const { resourcePath } = ApiQueryService;
		const response = await api.get(`${resourcePath}/${type}/${shortUrl}`);
		return response;
	}

	static async getUrlList(): Promise<AxiosResponse<IUrlListItem[]>> {
		const { resourcePath } = ApiQueryService;
		const response = await api.get(`${resourcePath}/list`);
		return response;
	}
}

export default ApiQueryService;