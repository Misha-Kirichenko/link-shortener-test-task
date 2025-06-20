import { createContext } from "react";
import type { IUrlListContext } from "../types/url-list-context.interface";

const UrlListContext = createContext<IUrlListContext | null>(null);
export default UrlListContext;
