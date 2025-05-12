import { createClient } from 'redis';
import 'dotenv/config';

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

await client.connect();

await client.set('test:key', 'Redis is working!');
const value = await client.get('test:key');
console.log('Value from Redis:', value);

await client.quit();