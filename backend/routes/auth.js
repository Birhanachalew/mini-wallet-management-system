import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/logout (JWT blacklist)
router.post('/logout', authController.logout);

export default router;
