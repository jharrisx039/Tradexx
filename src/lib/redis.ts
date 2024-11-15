/**
 * @fileoverview Redis client configuration and utility functions with browser support
 * @author Your Name
 * @lastModified 2024-02-24
 */

import Redis from 'ioredis';

// Browser-safe cache implementation
const browserCache = new Map<string, { value: string; expires?: number }>();

/**
 * Determines if code is running in browser environment
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Creates a Redis client for server-side usage
 */
const createRedisClient = () => {
  if (isBrowser) {
    return null;
  }

  try {
    const config: Redis.RedisOptions = {
      host: process.env.VITE_REDIS_HOST || 'localhost',
      port: parseInt(process.env.VITE_REDIS_PORT || '6379', 10),
      retryStrategy: (times) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
      lazyConnect: true,
    };

    if (process.env.VITE_REDIS_PASSWORD) {
      config.password = process.env.VITE_REDIS_PASSWORD;
    }

    if (process.env.VITE_REDIS_USERNAME) {
      config.username = process.env.VITE_REDIS_USERNAME;
    }

    if (process.env.VITE_REDIS_TLS === 'true') {
      config.tls = {};
    }

    const client = new Redis(config);

    client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    return client;
  } catch (error) {
    console.error('Failed to create Redis client:', error);
    return null;
  }
};

// Singleton instance
let redisClient: Redis | null = null;

/**
 * Gets the Redis client instance or creates a new one
 */
const getRedisClient = () => {
  if (!redisClient && !isBrowser) {
    redisClient = createRedisClient();
  }
  return redisClient;
};

/**
 * Gets a value from cache (Redis or browser)
 * @param {string} key - Cache key
 * @returns {Promise<T | null>} Cached value or null
 */
export const getCache = async <T>(key: string): Promise<T | null> => {
  if (isBrowser) {
    const item = browserCache.get(key);
    if (!item) return null;
    
    if (item.expires && item.expires < Date.now()) {
      browserCache.delete(key);
      return null;
    }
    
    try {
      return JSON.parse(item.value) as T;
    } catch {
      return null;
    }
  }

  const client = getRedisClient();
  if (!client) return null;

  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

/**
 * Sets a value in cache (Redis or browser)
 * @param {string} key - Cache key
 * @param {T} value - Value to cache
 * @param {number} [expireInSeconds] - Cache expiration in seconds
 */
export const setCache = async <T>(
  key: string,
  value: T,
  expireInSeconds?: number
): Promise<void> => {
  const stringValue = JSON.stringify(value);

  if (isBrowser) {
    browserCache.set(key, {
      value: stringValue,
      expires: expireInSeconds ? Date.now() + (expireInSeconds * 1000) : undefined
    });
    return;
  }

  const client = getRedisClient();
  if (!client) return;

  try {
    if (expireInSeconds) {
      await client.setex(key, expireInSeconds, stringValue);
    } else {
      await client.set(key, stringValue);
    }
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

/**
 * Deletes a value from cache (Redis or browser)
 * @param {string} key - Cache key
 */
export const deleteCache = async (key: string): Promise<void> => {
  if (isBrowser) {
    browserCache.delete(key);
    return;
  }

  const client = getRedisClient();
  if (!client) return;

  try {
    await client.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
};

/**
 * Clears all cache (Redis or browser)
 */
export const clearCache = async (): Promise<void> => {
  if (isBrowser) {
    browserCache.clear();
    return;
  }

  const client = getRedisClient();
  if (!client) return;

  try {
    await client.flushall();
  } catch (error) {
    console.error('Cache clear error:', error);
  }
};

/**
 * Checks if caching is available
 */
export const isRedisConnected = (): boolean => {
  if (isBrowser) return true; // Browser cache is always available
  const client = getRedisClient();
  return client?.status === 'ready' || false;
};

export default getRedisClient();