import express from 'express';
import transactionController from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/transactions/cash-in
router.post('/cash-in', authMiddleware, transactionController.cashIn);

// POST /api/transactions/cash-out
router.post('/cash-out', authMiddleware, transactionController.cashOut);

// GET /api/transactions/receipt/:id
router.get('/receipt/:id', authMiddleware, transactionController.getReceipt);

export default router;
