# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

### Netlify Edge Geo API example

- Server endpoint: `/api/geo`
- Returns `geo` and `ip` from Netlify Edge context when deployed on Netlify Edge Functions, per the Edge Functions API docs.
- Disable caching for this endpoint via `routeRules`.

To run on Edge Functions on Netlify, set the environment variable `SERVER_PRESET=netlify_edge` for your deploy/build, as described in Nuxt's Netlify docs.

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
