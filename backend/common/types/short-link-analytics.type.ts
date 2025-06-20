import { TShortLinkInfo } from './shorten-link-info.type';

export type TShortLinkAnalytics = Readonly<
  Pick<TShortLinkInfo, 'clickCount'> & {
    lastIps: string[];
  }
>;
