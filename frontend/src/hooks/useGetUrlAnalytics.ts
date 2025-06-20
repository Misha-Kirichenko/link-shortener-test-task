import { useState, useEffect } from "react";
import ApiQueryService from "../api/apiQueryService";
import type { TShortUrlAnalytics } from "../types/short-url.type";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";

const useGetUrlAnalytics = (shortUrl: string) => {
    const navigate = useNavigate()
    const [analytics, setAnalytics] = useState<TShortUrlAnalytics | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUrlAnalytics = async () => {
            try {
                const response = await ApiQueryService.getResourceByType<TShortUrlAnalytics>('analytics', shortUrl);
                if (response.status === 200 && response.data && typeof response.data === "object") {
                    setAnalytics(response.data as TShortUrlAnalytics);
                } else {
                    console.warn("Expected object, got:", response.data);
                    setAnalytics(null);
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

        fetchUrlAnalytics();
    }, [shortUrl, navigate]);

    return { analytics, isLoading };
};

export default useGetUrlAnalytics;
