import useGetAllUrls from "../hooks/useGetAllUrls";
import UrlsTable from "../Components/UrlsTable";

const Main = () => {
	const { urlList, isLoading } = useGetAllUrls();
	return <UrlsTable urlList={urlList} isLoading={isLoading} />;
};

export default Main;
