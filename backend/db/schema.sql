-- Users table for authentication and KYC

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  national_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast email lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Transactions table for wallet

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('cash-in', 'cash-out')),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast user transaction lookup
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- Alerts table for low-balance notifications

CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  balance NUMERIC(12,2) NOT NULL CHECK (balance >= 0),
  threshold NUMERIC(12,2) NOT NULL CHECK (threshold > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, threshold)
);

-- Index for fast user alert lookup
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
