# Ticket Comparator

A full-stack application for comparing ticket prices from multiple vendors for Orlando theme parks (Disney, Universal, SeaWorld, Busch Gardens).

## Project Structure

This project consists of two main components:

- **Backend** (`/backend`): FastAPI REST API that fetches and aggregates ticket data from various vendors
- **Frontend** (`/frontend`): Next.js application with Vercel Web Analytics integration for displaying and comparing tickets

## Features

### Backend
- FastAPI REST API
- Integration with ticket vendor APIs (Viator, GetYourGuide, Tiqets)
- CORS enabled for frontend communication
- Automatic park identification from ticket titles

### Frontend
- 🎢 Compare ticket prices from multiple vendors
- 🔍 Filter tickets by theme park
- 📊 **Vercel Web Analytics** integration for visitor tracking
- 🌙 Dark mode support
- 📱 Responsive design with Tailwind CSS
- ⚡ Built with Next.js 15 App Router
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Python 3.9+ (for backend)
- Node.js 18+ (for frontend)
- npm, pnpm, yarn, or bun (for frontend)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
export VIATOR_API_KEY=your_key_here
export GETYOURGUIDE_API_KEY=your_key_here
export TIQETS_API_KEY=your_key_here
```

4. Run the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend URL:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Vercel Web Analytics Integration

This application includes **Vercel Web Analytics** for tracking visitor data and user interactions.

### Implementation

The analytics are integrated in the Next.js App Router layout (`frontend/app/layout.tsx`):

```tsx
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Enabling Analytics on Vercel

1. Deploy your app to Vercel
2. Go to your project dashboard on Vercel
3. Click the **Analytics** tab
4. Click **Enable** to activate Web Analytics

Once enabled, you'll be able to track:
- Page views
- Visitor statistics
- Geographic data
- Referral sources
- Device and browser information

The analytics script will be automatically served from `/_vercel/insights/` routes after deployment.

## Deployment

### Backend Deployment

The backend can be deployed to Render.com using the included `render.yaml` configuration:

```bash
# Push to your git repository connected to Render
git push origin main
```

### Frontend Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel deploy
```

Or connect your Git repository to Vercel for automatic deployments.

The project includes a `vercel.json` configuration file that automatically:
- Builds the Next.js frontend
- Configures the output directory
- Sets up the dev command

## API Endpoints

### Backend

- `GET /` - Health check
- `GET /api/tickets` - Fetch and compare tickets from all vendors

## Environment Variables

### Backend
- `VIATOR_API_KEY` - API key for Viator
- `GETYOURGUIDE_API_KEY` - API key for GetYourGuide
- `TIQETS_API_KEY` - API key for Tiqets

### Frontend
- `NEXT_PUBLIC_BACKEND_URL` - URL of the backend API

## Tech Stack

### Backend
- FastAPI
- Python 3.9+
- Requests library
- Uvicorn (ASGI server)

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Vercel Analytics
- ESLint

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
