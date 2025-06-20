import { TShortLink } from './short-link.type';

export type TShortLinkInfo = Readonly<
  Pick<TShortLink, 'expiresAt' | 'originalUrl' | 'createdAt'> & {
    clickCount: number;
  }
>;
