import { Card, Typography, Descriptions, Tag, List, Spin } from "antd";
import type { TShortUrlAnalytics } from "../../types/short-url.type";

const { Title } = Typography;

interface UrlAnalyticsProps {
	readonly isLoading: boolean;
	readonly analytics: TShortUrlAnalytics | null;
}

const UrlAnalytics = ({ isLoading, analytics }: UrlAnalyticsProps) => {
	return (
		<div className="info-analytics-wrapper">
			<Card variant="outlined">
				<Title level={3}>URL Analytics</Title>

				{isLoading ? (
					<div className="loader-style">
						<Spin size="large"/>
					</div>
				) : analytics ? (
					<>
						<Descriptions
							column={1}
							styles={{ label: { fontWeight: "bold", width: 150 } }}
						>
							<Descriptions.Item label="Click Count">
								<Tag color="blue">{analytics.clickCount}</Tag>
							</Descriptions.Item>
						</Descriptions>

						<Title level={5} style={{ marginTop: 24 }}>
							Last visits
						</Title>
						<List
							bordered
							dataSource={analytics.lastIps}
							renderItem={(ip) => <List.Item>{ip}</List.Item>}
						/>
					</>
				) : (
					<Tag color="red">No analytics data available</Tag>
				)}
			</Card>
		</div>
	);
};

export default UrlAnalytics;
