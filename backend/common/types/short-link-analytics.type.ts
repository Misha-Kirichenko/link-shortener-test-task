import { TShortLinkInfo } from './shorten-link-info.type';

export type TShortLinkAnalytics = Pick<TShortLinkInfo, 'clickCount'> & {
  lastIps: string[];
};
