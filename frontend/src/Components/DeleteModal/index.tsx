import { Modal, Button, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { IUrlListItem } from "../../types/url-list-item.interface";
import ApiCommandService from "../../api/apiCommandService";
import { useContext, useState } from "react";
import { isAxiosError } from "axios";
import UrlListContext from "../../contexts/UrlListContext";
import "./delete-modal.css";

const { Text } = Typography;

interface IDeleteModalProps {
	readonly open: boolean;
	readonly modalData: IUrlListItem;
	onClose: (open: boolean, alias: string, shortUrl: string) => void;
}

const DeleteModal = ({ open, modalData, onClose }: IDeleteModalProps) => {
	const { alias, shortUrl } = modalData;
	const [errorMessage, setErrorMessage] = useState<string>("");

	const context = useContext(UrlListContext);

	if (!context) {
		throw new Error("UrlListContext not provided");
	}

	const { setUrlList } = context;

	const handleDelete = async () => {
		try {
			await ApiCommandService.deleteShortUrl(alias);
			setUrlList((prev) => prev.filter((url) => url.alias !== alias));
			onClose(false, "", "");
		} catch (error: unknown) {
			if (isAxiosError(error) && error?.response?.data) {
				const { message } = error.response.data;
				setErrorMessage(message);
			}
		}
	};
	const handleOnClose = () => {
		onClose(false, "", "");
		setErrorMessage("");
	};

	return (
		<Modal
			open={open}
			title={
				<span className="confirm-deletion-text">
					<ExclamationCircleOutlined style={{ color: "#faad14" }} />
					Confirm Deletion
				</span>
			}
			onCancel={handleOnClose}
			footer={
				!errorMessage
					? [
							<Button key="cancel" onClick={handleOnClose}>
								Cancel
							</Button>,
							<Button key="ok" danger type="primary" onClick={handleDelete}>
								Yes
							</Button>
					  ]
					: null
			}
		>
			{errorMessage ? (
				<div className="error-text">{errorMessage}</div>
			) : (
				<>
					Are you sure you want to delete <Text strong>"{shortUrl}"</Text>?
				</>
			)}
		</Modal>
	);
};

export default DeleteModal;
