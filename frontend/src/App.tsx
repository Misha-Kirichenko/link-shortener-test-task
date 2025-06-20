import { BrowserRouter as Router, Routes, Route } from "react-router";
import Main from "./pages/Main";
import UrlInfo from "./pages/UrlInfo";
import UrlAnalytics from "./pages/UrlAnalytics";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route index path="/" element={<Main />} />
				<Route path="/url-info/:shortUrl" element={<UrlInfo />} />
				<Route path="/url-analytics/:shortUrl" element={<UrlAnalytics />} />
			</Routes>
		</Router>
	);
};

export default App;
