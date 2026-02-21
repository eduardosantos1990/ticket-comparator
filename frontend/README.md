# Ticket Comparator Frontend

This is a Next.js frontend application for comparing ticket prices from multiple vendors for Orlando theme parks.

## Features

- 🎢 Compare ticket prices from various vendors
- 🔍 Filter by theme park (Disney, Universal, SeaWorld, Busch Gardens)
- 📊 Vercel Web Analytics integration for tracking visitor data
- 🌙 Dark mode support
- 📱 Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Create a `.env.local` file with your backend URL:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend URL:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
npm run build
npm run start
```

## Vercel Web Analytics

This application includes Vercel Web Analytics integration. The analytics component is configured in `app/layout.tsx` as per Vercel's best practices for Next.js App Router.

### Enabling Analytics on Vercel

1. Deploy your app to Vercel
2. Go to your project dashboard
3. Click the **Analytics** tab
4. Click **Enable** to activate Web Analytics

Once enabled, you'll be able to track:
- Page views
- Visitor data
- User interactions
- Custom events (if configured)

The analytics script is automatically injected via the `<Analytics />` component from `@vercel/analytics/next`.

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout with Analytics
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── public/              # Static assets
├── .env.example         # Environment variables template
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL`: URL of your FastAPI backend (required)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
