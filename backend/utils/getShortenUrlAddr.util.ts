export const getShortenUrlAddr = (alias: string): string =>
  `${process.env.HOST}:${process.env.NGINX_PORT}/${alias}`;
