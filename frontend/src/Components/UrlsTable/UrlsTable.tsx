import { useState } from "react";
import {
	Table,
	Typography,
	Button,
	Pagination,
	Space,
	Spin,
	Tooltip
} from "antd";
import {
	DeleteOutlined,
	InfoCircleOutlined,
	LineChartOutlined,
	PlusOutlined
} from "@ant-design/icons";
import { Link } from "react-router";
import type { IUrlListItem } from "../../types/url-list.interface";
import useGetAllUrls from "../../hooks/useGetAllUrls";

const { Title } = Typography;

const pageSize = 10;

const UrlsTable = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const { urlList, isLoading } = useGetAllUrls();

	const pagedData = urlList.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	const columns = [
		{
			title: "Short URL",
			dataIndex: "shortUrl",
			key: "shortUrl",
			render: (text: string) => (
				<Link to={text} style={{ wordBreak: "break-all" }}>
					{text}
				</Link>
			)
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: unknown, record: IUrlListItem) => (
				<Space size="middle">
					<Tooltip title="Delete">
						<Button icon={<DeleteOutlined />} danger />
					</Tooltip>
					<Tooltip title="Info">
						<Link to={`/url-info/${record.alias}`}>
							<Button icon={<InfoCircleOutlined />} />
						</Link>
					</Tooltip>

					<Tooltip title="Analytics">
						<Link to={`/url-analytics/${record.alias}`}>
							<Button icon={<LineChartOutlined />} />
						</Link>
					</Tooltip>
				</Space>
			)
		}
	];

	return (
		<div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 16
				}}
			>
				<Title level={3} style={{ margin: 0 }}>
					Short URLs
				</Title>
				<Button type="primary" icon={<PlusOutlined />} />
			</div>

			<Spin spinning={isLoading} tip="Loading URLs...">
				<Table
					rowKey="alias"
					columns={columns}
					dataSource={pagedData}
					pagination={false}
					bordered={false}
					size="middle"
					style={{ background: "white" }}
				/>
			</Spin>

			{!isLoading && urlList.length > pageSize && (
				<div style={{ textAlign: "center", marginTop: 16 }}>
					<Pagination
						current={currentPage}
						pageSize={pageSize}
						total={urlList.length}
						onChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
};

export default UrlsTable;
