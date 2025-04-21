# Nizam Cellular Leuwiliang

A modern web application for managing cellular phone sales and inventory.

## Features

- User authentication and authorization
- Product management
- Sales tracking
- Inventory management
- Customer management
- Reports and analytics

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prisma
- PostgreSQL
- NextAuth.js

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set up the database:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
└── types/           # TypeScript type definitions
```

## License

MIT
