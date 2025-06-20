import { useState, useEffect } from "react";
import ApiQueryService from "../api/apiQueryService";
import type { IUrlListItem } from "../types/url-list.interface";

const useGetAllUrls = () => {
	const [urlList, setUrlList] = useState<IUrlListItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUrlList = async () => {
			try {
				const response = await ApiQueryService.getUrlList();
				if (response.status === 200 && Array.isArray(response.data)) {
					setUrlList(response.data);
				} else {
					console.warn("Expected array, got:", response.data);
					setUrlList([]); // fallback
				}
			} catch (error) {
				console.error("Error while getting URL list:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUrlList();
	}, []);

	return { urlList, isLoading };
};

export default useGetAllUrls;
