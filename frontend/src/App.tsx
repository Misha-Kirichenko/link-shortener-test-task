import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import UrlInfoPage from "./pages/UrlInfoPage";
import UrlAnalyticsPage from "./pages/UrlAnalyticsPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route index path="/" element={<MainPage />} />
				<Route path="/url-info/:shortUrl" element={<UrlInfoPage />} />
				<Route path="/url-analytics/:shortUrl" element={<UrlAnalyticsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default App;
