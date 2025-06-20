import React, { useState } from "react";
import { Input, Button, DatePicker, Typography, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router";
import ApiCommandService from "../../api/apiCommandService";
import type { TNewShortUrlBody } from "../../types/short-url.type";
import { isAxiosError } from "axios";
import './create-new-url.css';

const { Text, Title } = Typography;
const aliasRegex = /^[a-zA-Z0-9_-]{2,20}$/;

interface Errors {
	originalUrl?: string[];
	alias?: string[];
	expiresAt?: string[];
}

const CreateNewUrl: React.FC = () => {
	const [formData, setFormData] = useState<TNewShortUrlBody>({
		originalUrl: ""
	});

	const [errors, setErrors] = useState<Errors>({});

	const navigate = useNavigate();

	const validate = () => {
		const newErrors: Errors = {};

		try {
			new URL(formData.originalUrl);
		} catch {
			newErrors.originalUrl = ["Original URL must be valid url"];
		}

		if (
			formData.alias &&
			formData.alias.trim() &&
			!aliasRegex.test(formData.alias)
		) {
			newErrors.alias = [
				"Alias must contain 2-20 chars: a-z, A-Z, 0-9, _ или -."
			];
		}

		if (formData.expiresAt) {
			const expireTimeValid =
				formData.expiresAt &&
				dayjs.isDayjs(formData.expiresAt) &&
				formData.expiresAt.isValid() &&
				formData.expiresAt.toDate().getTime() > Date.now();

			if (!expireTimeValid) newErrors.expiresAt = ["Invalid expire time"];
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		field: keyof FormData | keyof Errors,
		value: Dayjs | string
	) => {
		setFormData((prev: TNewShortUrlBody) => ({
			...prev,
			[field]: value
		}));

		setErrors((prev: Errors) => {
			const withoutError = { ...prev };
			delete withoutError[field as keyof Errors];
			return withoutError;
		});
	};

	const handleCreate = async () => {
		if (validate()) {
			const payload = {
				...formData,
				...(formData.expiresAt && {
					expiresAt: new Date(String(formData.expiresAt))
				})
			};
			try {
				await ApiCommandService.createShortUrl(payload);
				navigate("/");
			} catch (error: unknown) {
				if (isAxiosError(error)) {
					const serverErrors = error?.response?.data?.message;
					if (serverErrors) {
						for (const error of serverErrors) {
							const fieldErrorArray = error.split(" ");
							const field: keyof Errors = fieldErrorArray[0];
							setErrors((prev) => {
								const withNewError = { ...prev };
								if (withNewError[field]) withNewError[field].push(error);
								else withNewError[field] = [error];
								return withNewError;
							});
						}
					}
				}
				console.error("Unexpected error", error);
			}
		}
	};

	const mapFieldErrors = (errors: string[]) => (
		<ul>
			{errors.map((error, i) => (
				<li key={i}>{error}</li>
			))}
		</ul>
	);

	return (
		<div className="fiedls-outer-wrapper">
			<Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
				Create New Short URL
			</Title>

			<Space direction="vertical" size="middle" className="fields-wrapper">
				<div>
					<label>Original URL</label>
					<Input
						value={formData.originalUrl}
						onChange={(e) => handleChange("originalUrl", e.target.value)}
					/>
					{errors.originalUrl && Boolean(errors.originalUrl.length) && (
						<Text type="danger">{mapFieldErrors(errors.originalUrl)}</Text>
					)}
				</div>

				<div>
					<label>Alias (Optional)</label>
					<Input
						value={formData.alias}
						onChange={(e) => handleChange("alias", e.target.value)}
					/>
					{errors.alias && Boolean(errors.alias.length) && (
						<Text type="danger">{mapFieldErrors(errors.alias)}</Text>
					)}
				</div>

				<div>
					<label>Expires At (optional)</label>
					<DatePicker
						showTime
						value={formData.expiresAt}
						onChange={(value) => handleChange("expiresAt", value as Dayjs)}
						style={{ width: "100%" }}
					/>
					{errors.expiresAt && Boolean(errors.expiresAt.length) && (
						<Text type="danger">{mapFieldErrors(errors.expiresAt)}</Text>
					)}
				</div>

				<Button type="primary" onClick={handleCreate} block>
					Create
				</Button>
			</Space>
		</div>
	);
};

export default CreateNewUrl;
