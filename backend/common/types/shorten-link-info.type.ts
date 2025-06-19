import { TShortLink } from './short-link.type';

export type TShortLinkInfo = Pick<
  TShortLink,
  'expiresAt' | 'originalUrl' | 'createdAt'
> & {
  clickCount: number;
};
