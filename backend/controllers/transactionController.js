
import pool from '../db/index.js';
import redis from 'redis';
import dotenv from 'dotenv';
import alertController from './alertController.js';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({ url: REDIS_URL });
redisClient.connect();

const CURRENCY = 'ETB';

const transactionController = {
  cashIn: async (req, res) => {
    const userId = req.user.id;
    const { amount, description } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }
    try {
      // Insert transaction
      const result = await pool.query(
        'INSERT INTO transactions (user_id, amount, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, amount, 'cash-in', description || 'Cash-in']
      );
      // Invalidate Redis balance cache
      await redisClient.del(`balance_${userId}`);
      // Check for low-balance alert
      await alertController.checkAndAlert(userId);
      res.status(201).json({ message: 'Cash-in successful', transaction: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: 'Cash-in failed', details: err.message });
    }
  },

  cashOut: async (req, res) => {
    const userId = req.user.id;
    const { amount, description } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }
    try {
      // Check balance
      const balResult = await pool.query('SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = $1', [userId]);
      const balance = parseFloat(balResult.rows[0].balance);
      if (balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
      // Insert transaction (negative amount)
      const result = await pool.query(
        'INSERT INTO transactions (user_id, amount, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, -amount, 'cash-out', description || 'Cash-out']
      );
      // Invalidate Redis balance cache
      await redisClient.del(`balance_${userId}`);
      // Check for low-balance alert
      await alertController.checkAndAlert(userId);
      res.status(201).json({ message: 'Cash-out successful', transaction: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: 'Cash-out failed', details: err.message });
    }
  },

  getReceipt: async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
      const result = await pool.query(
        'SELECT id, amount, type, description, created_at FROM transactions WHERE id = $1 AND user_id = $2',
        [id, userId]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Receipt not found' });
      res.json({ receipt: result.rows[0], currency: CURRENCY });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get receipt', details: err.message });
    }
  },
};

export default transactionController;
