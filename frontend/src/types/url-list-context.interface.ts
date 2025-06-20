import type { Dispatch, SetStateAction } from "react";
import type { IUrlListItem } from "./url-list-item.interface";

export interface IUrlListContext {
	urlList: IUrlListItem[];
	setUrlList: Dispatch<SetStateAction<IUrlListItem[]>>;
	isLoading: boolean;
}