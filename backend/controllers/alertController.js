import pool from '../db/index.js';
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({ url: REDIS_URL });
redisClient.connect();

const ALERT_CACHE_MINUTES = 5;
const DEFAULT_THRESHOLD = 1000;

const alertController = {
  checkAndAlert: async (userId) => {
    const cacheKey = `alert_${userId}`;
    // Check if alert is cached
    const cached = await redisClient.get(cacheKey);
    if (cached) return null; // Already alerted recently
    // Get threshold (could be user-specific in DB, here default)
    const threshold = DEFAULT_THRESHOLD;
    // Get balance
    const balResult = await pool.query('SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = $1', [userId]);
    const balance = parseFloat(balResult.rows[0].balance);
    if (balance < threshold) {
      // Store alert in DB
      await pool.query('INSERT INTO alerts (user_id, balance, threshold) VALUES ($1, $2, $3)', [userId, balance, threshold]);
      // Cache alert in Redis for 5 minutes
      await redisClient.set(cacheKey, '1', { EX: ALERT_CACHE_MINUTES * 60 });
      return { balance, threshold };
    }
    return null;
  },

  getAlerts: async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await pool.query('SELECT id, balance, threshold, created_at FROM alerts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [userId]);
      res.json({ alerts: result.rows });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get alerts', details: err.message });
    }
  },
};

export default alertController;
