import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  redis: {
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    tls: process.env.REDIS_TLS === 'true',
  },
  ollama: {
    apiUrl: process.env.OLLAMA_API_URL,
    model: process.env.OLLAMA_MODEL,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  api: {
    url: process.env.VITE_API_URL,
  },
} as const;

export const isDevelopment = config.env === 'development';
export const isProduction = config.env === 'production';