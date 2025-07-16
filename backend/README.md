# Mini Wallet Backend

## Project Structure

- `/routes` - Express route definitions
- `/controllers` - Route handler logic
- `/services` - Business logic and helpers
- `/middleware` - Express middleware (auth, error handling, etc.)
- `/db` - Database connection and queries

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your environment variables (see below).
3. Start the server:
   ```bash
   npm run dev
   ```

## Environment Variables Example

```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/miniwallet
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

## Health Check

- `GET /api/health` — returns `{ status: 'ok', message: 'Mini Wallet backend is running!' }`

---

Add your routes and business logic in the respective folders. See `app.js` for the entry point.
