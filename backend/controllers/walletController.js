import pool from '../db/index.js';
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({ url: REDIS_URL });
redisClient.connect();

const CURRENCY = 'ETB';

const walletController = {
  getBalance: async (req, res) => {
    const userId = req.user.id;
    const cacheKey = `balance_${userId}`;
    try {
      // Try Redis cache first
      let balance = await redisClient.get(cacheKey);
      if (balance !== null) {
        return res.json({ balance: parseFloat(balance), currency: CURRENCY, cached: true });
      }
      // Fallback to DB
      const result = await pool.query('SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = $1', [userId]);
      balance = result.rows[0].balance;
      // Cache in Redis for 10 seconds
      await redisClient.set(cacheKey, balance, { EX: 10 });
      res.json({ balance: parseFloat(balance), currency: CURRENCY, cached: false });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get balance', details: err.message });
    }
  },

  getTransactions: async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await pool.query(
        'SELECT id, amount, type, description, created_at FROM transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
        [userId]
      );
      res.json({ transactions: result.rows, currency: CURRENCY });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get transactions', details: err.message });
    }
  },
};

export default walletController;
