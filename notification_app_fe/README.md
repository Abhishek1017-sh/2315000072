# Notification App Frontend

Campus notification platform frontend built with Next.js 15, TypeScript, and Material UI.

## Setup

### Requirements
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```env
# API Server
NEXT_PUBLIC_API_URL=http://localhost:3001

# Logging Service
NEXT_PUBLIC_LOG_API_URL=http://localhost:3001
NEXT_PUBLIC_LOG_API_TOKEN=your-token-here
```

## Development

```bash
npm run dev
```

Opens at http://localhost:3000 with Turbopack for fast refreshes.

## Build & Deployment

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout with theme provider
│   ├── providers.tsx # Material UI theme configuration
│   └── page.tsx      # Home page
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
│   └── useLogger.ts  # Logger initialization hook
├── services/         # API and external services
│   └── api.ts        # HTTP client with error handling
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
    └── logger.ts     # Logging middleware integration
```

## Architecture

### Logging Integration

The frontend integrates with `@afford/logging-middleware` for evaluation logging.

```typescript
import { logInfo, logError, logWarn, logDebug } from "@/utils/logger";

// Log from any module
await logInfo("api", "Notifications fetched successfully");
await logError("component", "Failed to render notification list");
```

Package names must be one of:
- Frontend: `api`, `component`, `hook`, `page`, `state`, `style`
- Shared: `auth`, `config`, `middleware`, `utils`

### API Client

The `@/services/api` module provides HTTP utilities:

```typescript
import { get, post, put, del } from "@/services/api";

const result = await get<Notification[]>("/notifications");
if (result.success) {
  console.log(result.data);
}
```

### Theme & Styling

Material UI theme is centralized in `src/app/providers.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.7
- **UI Library**: Material UI 6.1
- **Styling**: Emotion (MUI's default)
- **Build Tool**: Turbopack
- **Linting**: ESLint 9 with Next.js config

## Features Not Yet Implemented

- Notification features
- Real-time updates
- State management (React Context/Redux)
- Authentication
- Request caching

## Next Steps

1. Implement notification types and services
2. Add components for notification display
3. Set up state management if needed
4. Implement real-time updates (WebSocket/polling)
5. Add authentication layer
