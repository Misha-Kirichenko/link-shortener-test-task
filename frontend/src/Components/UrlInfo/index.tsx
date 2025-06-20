import { Card, Typography, Descriptions, Tag, Spin } from "antd";
import dayjs from "dayjs";
import type { TShortUrlInfo } from "../../types/short-url.type";

const { Title, Paragraph } = Typography;

interface UrlInfoProps {
	readonly isLoading: boolean;
	readonly urlInfo: TShortUrlInfo | null;
}

const UrlInfo = ({ isLoading, urlInfo }: UrlInfoProps) => {
	return (
		<div className="info-analytics-wrapper">
			<Card variant="outlined">
				<Title level={3}>URL Information</Title>

				<Descriptions
					column={1}
					styles={{
						label: { fontWeight: "bold", width: 150 },
						content: { wordBreak: "break-word" }
					}}
				>
					{isLoading ? (
						<div className="loader-style">
							<Spin size="small"/>
						</div>
					) : urlInfo ? (
						<>
							<Descriptions.Item label="Original URL">
								<Paragraph copyable style={{ marginBottom: 0 }}>
									{urlInfo.originalUrl}
								</Paragraph>
							</Descriptions.Item>

							<Descriptions.Item label="Click Count">
								<Tag color="blue">{urlInfo.clickCount}</Tag>
							</Descriptions.Item>

							<Descriptions.Item label="Created At">
								{dayjs(urlInfo.createdAt).format("DD-MM-YYYY HH:mm")}
							</Descriptions.Item>

							<Descriptions.Item label="Expires At">
								{urlInfo.expiresAt ? (
									dayjs(urlInfo.expiresAt).format("DD-MM-YYYY HH:mm")
								) : (
									<Tag color="green">Never</Tag>
								)}
							</Descriptions.Item>
						</>
					) : (
						<Descriptions.Item label="Status">
							<Tag color="red">No data available</Tag>
						</Descriptions.Item>
					)}
				</Descriptions>
			</Card>
		</div>
	);
};

export default UrlInfo;
