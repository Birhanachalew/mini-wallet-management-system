import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import redis from 'redis';
dotenv.config();


// Local development defaults
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const POSTGRES_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/walletdb';


// Redis client with error handling
const redisClient = redis.createClient({ url: REDIS_URL });
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});
redisClient.on('connect', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Redis connected');
  }
});
redisClient.connect().catch((err) => {
  console.error('Redis initial connection failed:', err);
});

// Test Redis connection utility
export async function testRedisConnection() {
  try {
    await redisClient.set('redis_test_key', 'ok', { EX: 5 });
    const value = await redisClient.get('redis_test_key');
    return value === 'ok';
  } catch (err) {
    console.error('Redis test failed:', err);
    return false;
  }
}

export async function isTokenBlacklisted(token) {
  return await redisClient.get(`bl_${token}`);
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    // Check blacklist
    if (await isTokenBlacklisted(token)) {
      return res.status(401).json({ error: 'Token is blacklisted (logged out)' });
    }
    req.user = user;
    next();
  });
}

export async function blacklistToken(token, exp) {
  // Set token in Redis with expiry (exp in seconds)
  await redisClient.set(`bl_${token}`, '1', { EX: exp });
}
