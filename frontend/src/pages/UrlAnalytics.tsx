import { useParams } from "react-router";

const UrlAnalytics = () => {
	const { shortUrl } = useParams();

	return <div>UrlInfo {shortUrl}</div>;
};

export default UrlAnalytics;
