import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: process.env.PG_POOL_MAX ? parseInt(process.env.PG_POOL_MAX) : 10, // max clients in pool
  idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT ? parseInt(process.env.PG_IDLE_TIMEOUT) : 30000, // close idle clients after 30s
  connectionTimeoutMillis: process.env.PG_CONN_TIMEOUT ? parseInt(process.env.PG_CONN_TIMEOUT) : 2000, // return error after 2s if cannot connect
});

// Optional: Pool event logging for monitoring
pool.on('connect', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('PostgreSQL pool: new client connected');
  }
});
pool.on('acquire', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('PostgreSQL pool: client checked out');
  }
});
pool.on('remove', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('PostgreSQL pool: client removed');
  }
});

export default pool;
