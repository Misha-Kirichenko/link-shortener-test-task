import { useContext, useState } from "react";
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
import type { IUrlListItem } from "../../types/url-list-item.interface";
import "./urls-table.css";
import DeleteModal from "../DeleteModal";
import UrlListContext from "../../contexts/UrlListContext";

const { Title } = Typography;

const pageSize = 10;

const UrlsTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const [modalData, setModalData] = useState<IUrlListItem>({
		alias: "",
		shortUrl: ""
	});

	const context = useContext(UrlListContext);

	if (!context) {
		throw new Error("UrlListContext not provided");
	}

	const { urlList, isLoading } = context;

	const pagedData = urlList.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	const handleSetModalData = (
		open: boolean,
		alias: string,
		shortUrl: string
	) => {
		setDeleteModalOpen(open);
		setModalData({ alias, shortUrl });
	};

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
						<Button
							icon={<DeleteOutlined />}
							danger
							onClick={() =>
								handleSetModalData(true, record.alias, record.shortUrl)
							}
						/>
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
		<>
			<div className="list-wrapper">
				<div className="list-wrapper-inner">
					<Title level={3} style={{ margin: 0 }}>
						Short URLs
					</Title>
					<Link to="/url/create">
						<Button type="primary" icon={<PlusOutlined />}/>
					</Link>
				</div>

				<Spin spinning={isLoading} tip="Loading URLs...">
					<Table
						rowKey="alias"
						columns={columns}
						dataSource={pagedData}
						pagination={false}
						bordered={false}
						size="middle"
					/>
				</Spin>

				{!isLoading && urlList.length > pageSize && (
					<div className="pagination-wrapper">
						<Pagination
							current={currentPage}
							pageSize={pageSize}
							total={urlList.length}
							onChange={setCurrentPage}
						/>
					</div>
				)}
			</div>
			<DeleteModal
				open={deleteModalOpen}
				modalData={modalData}
				onClose={handleSetModalData}
			/>
		</>
	);
};

export default UrlsTable;
