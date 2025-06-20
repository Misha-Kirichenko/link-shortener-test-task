import { Dayjs } from "dayjs";

type TShortUrl = {
    originalUrl: string;
    expiresAt?: string | Dayjs | Date;
    createdAt: number;
    alias?: string;
};

export type TNewShortUrlBody = Pick<TShortUrl, 'alias' | 'expiresAt' | 'originalUrl'>;

export type TShortUrlInfo = Readonly<Omit<TShortUrl, 'alias'> & { clickCount: number }>;

export type TShortUrlAnalytics = Readonly<
    Pick<TShortUrlInfo, 'clickCount'> & { lastIps: string[] }
>;
