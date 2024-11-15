import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import { config, isDevelopment } from './config';
import db from './db';

const app = express();

// Redis client with environment-specific configuration
const redis = new Redis({
  ...config.redis,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 3,
});

redis.on('error', (err) => console.error('Redis Client Error:', err));
redis.on('connect', () => console.log('Connected to Redis'));

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: config.env,
    redis: redis.status,
    database: db ? 'connected' : 'disconnected'
  });
});

// Cache middleware
const cache = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (isDevelopment) {
    return next(); // Skip cache in development
  }

  try {
    const key = `cache:${req.originalUrl}`;
    const data = await redis.get(key);
    if (data) {
      return res.json(JSON.parse(data));
    }
    next();
  } catch (error) {
    next(error);
  }
};

// API Routes
app.post('/api/analyze', cache, async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch(`${config.ollama.apiUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.ollama.model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!isDevelopment) {
      const key = `cache:${req.originalUrl}`;
      await redis.setex(key, 3600, JSON.stringify(data));
    }
    
    res.json(data);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to generate analysis' });
  }
});

app.get('/api/cache/:key', async (req, res) => {
  if (isDevelopment) {
    return res.json(null);
  }

  try {
    const data = await redis.get(req.params.key);
    res.json(data ? JSON.parse(data) : null);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cached data' });
  }
});

app.post('/api/cache/:key', async (req, res) => {
  if (isDevelopment) {
    return res.json({ success: true });
  }

  try {
    const { value, expiry } = req.body;
    if (expiry) {
      await redis.setex(req.params.key, expiry, JSON.stringify(value));
    } else {
      await redis.set(req.params.key, JSON.stringify(value));
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cache data' });
  }
});

app.delete('/api/cache/:key', async (req, res) => {
  if (isDevelopment) {
    return res.json({ success: true });
  }

  try {
    await redis.del(req.params.key);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cached data' });
  }
});

app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});