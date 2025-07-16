import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/external/mock-provider
router.post('/mock-provider', authMiddleware, (req, res) => {
  // Simulate random success/failure
  const { amount, type } = req.body;
  if (!amount || !type) return res.status(400).json({ error: 'amount and type required' });
  // 80% success, 20% failure
  const isSuccess = Math.random() < 0.8;
  if (isSuccess) {
    res.json({ status: 'success', providerRef: `EXT-${Date.now()}` });
  } else {
    res.status(502).json({ status: 'failure', error: 'External provider error' });
  }
});

export default router;
