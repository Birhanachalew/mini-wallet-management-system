
import pool from '../db/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '30m'; // 30 minutes

const authController = {
  register: async (req, res) => {
    const { name, email, password, national_id } = req.body;
    if (!name || !email || !password || !national_id) {
      return res.status(400).json({ error: 'All fields required (name, email, password, national_id)' });
    }
    try {
      const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (exists.rows.length > 0) return res.status(409).json({ error: 'User already exists' });
      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (name, email, password, national_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email, national_id',
        [name, email, hashed, national_id]
      );
      const user = result.rows[0];
      res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      res.status(500).json({ error: 'Registration failed', details: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, national_id: user.national_id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, national_id: user.national_id } });
    } catch (err) {
      res.status(500).json({ error: 'Login failed', details: err.message });
    }
  },

  logout: async (req, res) => {
    // For JWT, logout is usually handled on the client by deleting the token.
    // To truly invalidate, you can implement a token blacklist in Redis (not shown here).
    res.json({ message: 'Logged out (client should delete token)' });
  },
};

export default authController;
