import { useParams } from "react-router";

const UrlInfo = () => {
	const { shortUrl } = useParams();
	return <div>UrlInfo {shortUrl}</div>;
};

export default UrlInfo;
