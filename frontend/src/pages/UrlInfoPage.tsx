import { useParams } from "react-router";
import UrlInfo from "../Components/UrlInfo";
import useGetUrlInfo from "../hooks/useGetUrlInfo";

const UrlInfoPage = () => {
	const { shortUrl } = useParams<{ shortUrl: string }>();
	const safeShortUrl = shortUrl ?? "";
	const { urlInfo, isLoading } = useGetUrlInfo(safeShortUrl);
	return <UrlInfo urlInfo={urlInfo} isLoading={isLoading} />;
};

export default UrlInfoPage;
