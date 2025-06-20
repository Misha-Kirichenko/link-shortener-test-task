import { useParams } from "react-router";
import UrlAnalytics from "../Components/UrlAnalytics";
import useGetUrlAnalytics from "../hooks/useGetUrlAnalytics";

const UrlAnalyticsPage = () => {
	const { shortUrl } = useParams();
	const safeShortUrl = shortUrl ?? "";
	const { analytics, isLoading } = useGetUrlAnalytics(safeShortUrl);

	return <UrlAnalytics analytics={analytics} isLoading={isLoading} />;
};

export default UrlAnalyticsPage;
