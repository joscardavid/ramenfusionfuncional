# Ramen Fusion Reservations

A full-stack restaurant reservation system built with Express.js and React.

## Project Structure

```
.
├── server/             # Backend server code
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── index.ts        # Server entry point
├── client/             # Frontend React code
│   ├── src/            # Source files
│   ├── public/         # Static files
│   └── index.html      # HTML template
├── scripts/            # Development scripts
├── types/              # Shared TypeScript types
└── package.json        # Project manifest
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

3. Start development servers:
   ```bash
   npm start
   ```

   This will start both the backend server and frontend development server.

   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173

## API Documentation

### Authentication

- POST `/api/auth/login`
- POST `/api/auth/register`

### Reservations

- GET `/api/reservations`
- POST `/api/reservations`
- GET `/api/reservations/:id`
- PATCH `/api/reservations/:id`
- DELETE `/api/reservations/:id`

### Tables

- GET `/api/tables`
- GET `/api/tables/:id`
- PATCH `/api/tables/:id`

## Development

- Backend development: `npm run dev:server`
- Frontend development: `npm run dev:client`
- Full stack development: `npm run dev:all`

## License

MIT