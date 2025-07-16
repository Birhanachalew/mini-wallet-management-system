import express from 'express';
import alertController from '../controllers/alertController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/alerts
router.get('/', authMiddleware, alertController.getAlerts);

export default router;
