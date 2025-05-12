// src/lib/redis.js
import { createClient } from 'redis';

let client;

export async function getRedisClient() {
  if (!client) {
    if (!process.env.REDIS_URL) {
      console.warn('Missing REDIS_URL in environment');
      return null;
    }

    client = createClient({ url: process.env.REDIS_URL });

    client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    await client.connect();
  }

  return client;
}