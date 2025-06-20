import { useState, useEffect } from "react";
import ApiQueryService from "../api/apiQueryService";
import type { TShortUrlInfo } from "../types/short-url.type";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";

const useGetUrlInfo = (shortUrl: string) => {
    const navigate = useNavigate()
    const [urlInfo, setUrlInfo] = useState<TShortUrlInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUrlInfo = async () => {
            try {
                const response = await ApiQueryService.getResourceByType<TShortUrlInfo>('info', shortUrl);
                if (response.status === 200 && response.data && typeof response.data === "object") {
                    setUrlInfo(response.data as TShortUrlInfo);
                } else {
                    console.warn("Expected object, got:", response.data);
                    setUrlInfo(null);
                }
            } catch (error: unknown) {
                if (isAxiosError(error) && error?.response?.status === 404) {
                    navigate("not-found");
                }
                else {
                    console.error("Unexpected error", error);
                }

            } finally {
                setIsLoading(false)
            }
        };

        fetchUrlInfo();
    }, [shortUrl, navigate]);

    return { urlInfo, isLoading };
};

export default useGetUrlInfo;
