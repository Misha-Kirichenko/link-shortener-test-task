export const CORS_SETTINGS = {
  origin: [
    'http://localhost:5173',
    `http://localhost:${process.env.NGINX_PORT}`,
  ],
  credentials: true,
};
