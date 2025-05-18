# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
bun install

# Run development server
bun run dev
bun run dev -- --open   # Opens app in new browser tab

# Build for production
bun run build

# Preview production build
bun run preview

# Testing
bun run test              # Runs all tests (integration + unit)
bun run test:integration  # Runs Playwright integration tests
bun run test:unit        # Runs Vitest unit tests

# Code quality
bun run check           # Runs svelte-kit sync and svelte-check
bun run check:watch     # Runs check in watch mode
bun run lint           # Runs Prettier and ESLint
bun run format         # Formats code with Prettier
```

## Project Architecture

### Tech Stack
- SvelteKit v2 with Svelte v5
- TypeScript
- Tailwind CSS v4
- Bun as runtime (though npm/node should work)
- Vite for bundling
- PWA functionality via @vite-pwa/sveltekit

### Key Architecture Patterns

#### Backend Integration
- API calls go through `src/lib/api/base.ts` which handles:
  - Request construction with proper query params
  - Cookie-based authentication
  - Error handling with SvelteKit errors
  - Automatic JSON/FormData content type detection
- Backend URL configured via `PUBLIC_API_URL` env variable (defaults to `http://localhost:3200`)
- Domain-specific API modules in `src/lib/api/` (playlist.ts, ugc.ts, user.ts, etc.)

#### State Management
- Global stores in `src/stores/`:
  - `user.ts` - Current user state
  - `playlist.ts` - User's playlists with CRUD operations
  - `modal.ts` - Modal component references
- Authentication state tracked in `src/lib/auth.ts`

#### Routing Structure
- `/` - Homepage with trending content
- `/browse` - Browse all content with filtering
  - Query params: `assetKind` (Map/UgcGameVariant/Prefab), `sort`, `order`, etc.
- `/browse/playlist` - Browse community playlists
- `/playlist/[slug]` - Individual playlist view
- `/playlist/me` - User's own playlists
- `/playlist/favorites` - User's favorited content
- `/recommended` - 343 Industries featured content
- `/blog` - Update blog with MDSveX support
- `/legal/privacy` and `/legal/terms` - Legal pages

#### Component Architecture
- Layout components handle navigation, user authentication, and global modals
- Shared components in `src/lib/components/`:
  - Asset display components (AssetCard, AssetGroup, AssetContainer)
  - Modals (AddAssetModal, PlaylistModal, FilterModal)
  - Icons in `src/lib/components/icons/` with consistent interface
- Route-specific components colocated with routes

#### Data Fetching
- Load functions in `+page.ts` files for client-side data fetching
- Server-side load functions in `+page.server.js` for blog functionality
- API integration through typed interfaces in `src/lib/api/`

#### Authentication
- Xbox Live OAuth via backend API
- Cookie-based session management
- Login redirects preserve current URL
- User data and playlists loaded in root layout

### Environment Configuration
```bash
PUBLIC_API_URL="http://localhost:3200"  # Backend API URL
PUBLIC_URL="http://localhost:5173"      # Frontend URL
```

## Development Patterns

### Icon Component Pattern
Icons are SVG components that accept an `active` prop for styling:
```svelte
<IconName active={false}></IconName>
```

### Modal Management
Modals are registered in layout and accessed via stores:
```typescript
import { addAssetModal, playlistModal } from '../stores/modal';
$playlistModal.create({});
```

### API Calls
All API calls use the standardized request function:
```typescript
import { request } from '$lib/api/base';
await request({
  path: '/api/endpoint',
  method: 'GET',
  query: { param: 'value' }
});
```

### Blog System
- Markdown files in `src/lib/posts/`
- MDSveX for Markdown processing with component support
- Blog routes handle pagination and categories
- RSS feed generation at `/blog/api/rss.xml`