import UrlsTable from "../Components/UrlsTable";
import UrlListContext from "../contexts/UrlListContext";
import useGetAllUrls from "../hooks/useGetAllUrls";

const Main = () => {
	const { urlList, setUrlList, isLoading } = useGetAllUrls();

	return (
		<UrlListContext.Provider value={{ urlList, setUrlList, isLoading }}>
			<UrlsTable/>
		</UrlListContext.Provider>
	);
};

export default Main;
