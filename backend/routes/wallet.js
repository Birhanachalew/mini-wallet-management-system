import express from 'express';
import walletController from '../controllers/walletController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/wallet/balance
router.get('/balance', authMiddleware, walletController.getBalance);

// GET /api/wallet/transactions
router.get('/transactions', authMiddleware, walletController.getTransactions);

export default router;
