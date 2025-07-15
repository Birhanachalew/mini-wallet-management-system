# Mini Wallet Management System

A lightweight, fullstack wallet management app for rural financial agents.

## Tech Stack
- Frontend: Next.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Cache: Redis
- Deployment: Docker

## Features
- Secure authentication (JWT, bcrypt)
- Real-time wallet balance (Redis cache)
- Transaction history (last 50)
- Cash-in/cash-out via mock API
- Low-balance alerts
- Simulated external provider API

## Project Structure
```
/project
├── /frontend (Next.js)
│   ├── /pages
│   ├── /components
│   ├── /styles
│   └── /lib
├── /backend (Node.js)
│   ├── /routes
│   ├── /controllers
│   ├── /services
│   ├── /middleware
│   └── /db
├── /docker
│   ├── Dockerfile
│   └── docker-compose.yml
└── README.md
```

## Setup & Run
See each folder for setup instructions.
