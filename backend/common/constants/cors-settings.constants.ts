const allowedOrigins = [
  'http://localhost:5173',
  `http://localhost:${process.env.NGINX_PORT}`,
  `${process.env.HOST}:${process.env.NGINX_PORT}`,
  `${process.env.HOST}:5173`,
];

export const CORS_SETTINGS = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
