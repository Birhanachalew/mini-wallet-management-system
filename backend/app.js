import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import walletRoutes from './routes/wallet.js';
import transactionRoutes from './routes/transaction.js';
import alertRoutes from './routes/alert.js';
import externalRoutes from './routes/external.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mini Wallet backend is running!' });
});


// Auth routes
app.use('/api/auth', authRoutes);


// Wallet routes
app.use('/api/wallet', walletRoutes);


// Transaction routes
app.use('/api/transactions', transactionRoutes);


// Alert routes
app.use('/api/alerts', alertRoutes);

// External integration mock API
app.use('/api/external', externalRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
