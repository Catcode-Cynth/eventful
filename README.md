# Eventful Backend API

Eventful is a backend API for managing events, ticket purchases, QR-based ticket verification, analytics, reminders, and protected access for creators and attendees.

## Features

- JWT authentication and authorization
- Event creation and event listing
- Shareable event links
- Ticket purchase flow
- Simulated payment endpoint
- QR code generation for purchased tickets
- QR code verification endpoint
- Event analytics
- Event reminder/notification endpoint
- Rate limiting with Nest Throttler
- Swagger API documentation
- Unit and integration tests

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JWT
- Swagger
- Jest + Supertest

## API Documentation

When running locally, Swagger is available at:

- [Local Swagger Docs](http://localhost:3000/api/docs)

After deployment, Swagger will be available at:

- [Production Swagger Docs](https://YOUR-RENDER-URL/api/docs)

## Authentication

### Register
`POST /auth/register`

### Login
`POST /auth/login`

Use the returned token in Swagger with:

```text
Bearer YOUR_ACCESS_TOKEN
```

## Main Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Events
- `POST /events` — create event
- `GET /events` — list all upcoming events
- `GET /events/:id/share` — get shareable event link
- `GET /events/:id/analytics` — view event analytics
- `GET /events/reminders` — view event reminders

### Tickets
- `POST /tickets/pay` — simulate payment
- `POST /tickets/buy` — purchase ticket
- `GET /tickets/verify?qrCode=...` — verify QR/ticket

## Ticket Purchase Flow

1. User logs in
2. User authorizes with JWT
3. User pays through simulated payment endpoint
4. User buys ticket
5. QR code is generated
6. QR code is scanned and verified through the API

## QR Code Verification

When a ticket is purchased, the API generates a QR code image.  
That QR code encodes a verification URL. When scanned, it opens the ticket verification endpoint and validates whether the ticket is still valid.

## Analytics

The analytics endpoint returns event-level stats such as:

- total tickets sold
- total attendees

Example:

```http
GET /events/:id/analytics
```

## Notifications / Reminders

The reminders endpoint returns upcoming event reminder information based on event date.

Example:

```http
GET /events/reminders
```

## Payments

Payments are currently simulated for assignment/demo purposes.

Example:

```http
POST /tickets/pay
```

## Rate Limiting

Basic rate limiting is implemented using NestJS Throttler.

## Testing

This project includes:

- unit tests
- integration tests

Run tests with:

```bash
npm run test
npm run test:e2e
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file with:

```env
DATABASE_URL=your_neon_database_url
DIRECT_URL=your_neon_direct_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
PAYSTACK_SECRET_KEY=your_paystack_key
PORT=3000
NODE_ENV=development
```

### 3. Generate Prisma client

```bash
npx prisma generate
```

### 4. Push schema to database

```bash
npx prisma db push
```

### 5. Start the app

```bash
npm run start:dev
```

## Notes

- If Neon is idle, the first request may fail while the database wakes up. Retrying usually resolves it.
- Payment is simulated rather than fully integrated with Paystack.
- QR verification is API-based and designed for backend validation.

## Future Improvements

- Real Paystack transaction initialization and verification
- Email/SMS reminders
- Redis caching layer
- More extensive test coverage
- Production-ready check-in / scan-once logic

HEAD
  The backend system has been fully implemented and tested locally using Swagger.

The backend system has been fully implemented and tested locally using Swagger.
4165d1b (fix: correct NestJS build entry point and resolve Render 404 startup issue)

Core features include:
- Authentication (JWT)
- Event creation and management
- Ticket purchase with QR code generation
- QR code verification
- Analytics and reminders
- Simulated payment flow
- Unit and integration tests

The application has been deployed on Render.

Note: Swagger documentation works correctly in the local environment. The deployed version may not display the Swagger UI due to production environment configuration, but all endpoints are implemented and accessible.



## Author

Cynthia Okechukwu
