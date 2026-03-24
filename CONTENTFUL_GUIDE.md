# Connecting Contentful to Your Nuxt Planets App

Your app currently loads all planet data from a static `data.json` file. The goal is to move that data into Contentful (a headless CMS) so you can manage content through a web UI, then fetch it at build/render time instead of importing the JSON.

---

## Step 1: Set Up Your Contentful Space

**What to do (in the Contentful web UI):**

1. Create a free Contentful account at contentful.com
2. Create a new **Space** (think of it as a project/database)
3. Create a **Content Model** called "Planet" with these fields — mirroring your current `data.json` structure:
   - `name` — Short text
   - `color` — Short text (hex value like `#419EBB`)
   - `rotation`, `revolution`, `radius`, `temperature` — Short text
   - `overviewContent`, `overviewSource` — Long text / Short text
   - `structureContent`, `structureSource` — Long text / Short text
   - `geologyContent`, `geologySource` — Long text / Short text
   - `planetImage`, `internalImage`, `geologyImage` — Media (asset)
4. Add entries for each of your 8 planets using the data from `data.json`

**Key concept:** Contentful separates *content models* (the schema/shape) from *entries* (the actual data). This is like defining a TypeScript interface vs. creating objects that match it.

---

## Step 2: Get Your API Keys

1. In Contentful go to Settings → API Keys → Add API Key
2. You need two values:
   - **Space ID**
   - **Content Delivery API access token** (read-only, safe for client-side)
3. Store these in a `.env` file in your project root:
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_token
   ```
4. Add `.env` to your `.gitignore` so you don't commit your secrets
5. Configure `runtimeConfig` in `nuxt.config.ts` so Nuxt can read these values:
   ```ts
   export default defineNuxtConfig({
     runtimeConfig: {
       contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
       contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
     },
   })
   ```

**Key concept:** `runtimeConfig` in Nuxt 3 has two levels:
- `runtimeConfig` — private, server-only (use this for API tokens)
- `runtimeConfig.public` — exposed to the client browser

Your API token should go in the private (top-level) section since you'll be fetching server-side.

---

## Step 3: Install the Contentful SDK

```bash
npm install contentful
```

This is Contentful's official JavaScript client. It handles authentication and gives you typed methods for querying your content.

---

## Step 4: Create a Server API Route

Create a file at `server/api/planets.ts` that:

1. Imports `createClient` from `contentful`
2. Uses `useRuntimeConfig()` to access your space ID and token
3. Creates a Contentful client
4. Fetches all entries where `content_type` is `'planet'`
5. Returns the data

```ts
// server/api/planets.ts
import { createClient } from 'contentful'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
  })

  const entries = await client.getEntries({
    content_type: 'planet',
    include: 2, // resolves linked assets (images)
  })

  return entries.items
})
```

**Why a server route?** This keeps your API token completely server-side. Your browser never sees it. You get a clean internal endpoint at `/api/planets` that you can test directly in your browser.

**Key concept:** Files in `server/api/` automatically become API endpoints in Nuxt 3. The filename becomes the route — `planets.ts` → `/api/planets`.

---

## Step 5: Fetch Planet Data in a Page

Replace the static `import planetData from '../data.json'` with a call to your new API.

Start with just **one page** to test (e.g., `pages/uranus.vue`):

```vue
<script>
export default {
  async setup() {
    const { data: planets } = await useFetch('/api/planets')
    // Find Uranus in the returned array
    const planet = planets.value?.find(p => p.fields.name === 'Uranus')
    return { planet }
  }
}
</script>
```

**Key concept:** `useFetch` is a Nuxt 3 composable that:
- Fetches data on the **server** during SSR
- Serializes the result and sends it to the client
- **Does not** re-fetch on the client (no double request)
- Returns a reactive `data` ref

---

## Step 6: Map the Contentful Response

Contentful returns data in a different shape than your `data.json`. Your `Planet.vue` component expects objects like:

```json
{
  "name": "Uranus",
  "color": "#1ec2a4",
  "overview": { "content": "...", "source": "..." },
  "images": { "planet": "/path/to/image.svg" }
}
```

But Contentful returns:

```json
{
  "fields": {
    "name": "Uranus",
    "color": "#1ec2a4",
    "overviewContent": "...",
    "planetImage": {
      "fields": {
        "file": { "url": "//images.ctfassets.net/..." }
      }
    }
  }
}
```

Write a **transform function** to convert one shape to the other. You can do this in your server route (so pages receive clean data) or in a utility file:

```ts
function transformPlanet(entry) {
  const f = entry.fields
  return {
    name: f.name,
    color: f.color,
    overview: {
      content: f.overviewContent,
      source: f.overviewSource,
    },
    structure: {
      content: f.structureContent,
      source: f.structureSource,
    },
    geology: {
      content: f.geologyContent,
      source: f.geologySource,
    },
    rotation: f.rotation,
    revolution: f.revolution,
    radius: f.radius,
    temperature: f.temperature,
    images: {
      planet: 'https:' + f.planetImage.fields.file.url,
      internal: 'https:' + f.internalImage.fields.file.url,
      geology: 'https:' + f.geologyImage.fields.file.url,
    },
  }
}
```

If you put this transform in your server route, your pages receive data in the exact same shape as `data.json` — and `Planet.vue` needs zero changes.

**Key concept:** Keeping a transform layer between your CMS and your components means you can swap CMSes later without touching your UI code.

---

## Step 7: Consolidate Into a Dynamic Route (Optional but Recommended)

Right now you have 8 nearly identical page files. Replace them with one:

**`pages/[planet].vue`** — the brackets make it a dynamic route.

```vue
<script>
export default {
  async setup() {
    const route = useRoute()
    const planetName = route.params.planet // e.g., "venus", "mars"

    const { data: planets } = await useFetch('/api/planets')
    const planet = planets.value?.find(
      p => p.name.toLowerCase() === planetName
    )

    return { planet }
  }
}
</script>

<template>
  <Planet v-if="planet" :planet="planet" />
</template>
```

For the home page (`/`), keep `pages/index.vue` but have it fetch Mercury from the same API.

**Key concept:** `useRoute().params.planet` gives you whatever value is in the URL. Visiting `/venus` sets `params.planet` to `"venus"`. This is Nuxt's file-based dynamic routing.

---

## Step 8: Handle Images

Contentful stores images as **Assets**. A few things to know:

- Pass `include: 2` in your `getEntries()` call so linked assets are resolved automatically
- Image URLs come from `entry.fields.planetImage.fields.file.url`
- Contentful URLs start with `//` (protocol-relative) — prepend `https:` to make them absolute
- Your current images in `public/` can stay as fallbacks while you test

---

## Verification Checklist

- [ ] Run `npm run dev` and confirm planets load from Contentful
- [ ] Visit `/api/planets` directly in your browser to see the raw API response
- [ ] Change a planet's description in the Contentful web UI
- [ ] Refresh your app — the new content should appear
- [ ] Check that all three views (overview, structure, geology) still work
- [ ] Check that images load correctly
- [ ] Test both desktop and mobile navigation

---

## Files to Create or Modify

| File | Change |
|------|--------|
| `.env` (new) | Space ID and access token |
| `.gitignore` | Add `.env` |
| `nuxt.config.ts` | Add `runtimeConfig` for Contentful keys |
| `server/api/planets.ts` (new) | Server-side API route that fetches from Contentful |
| `pages/uranus.vue` | Test page — replace JSON import with `useFetch` |
| `pages/[planet].vue` (new, optional) | Dynamic route to replace all 8 individual pages |

---

## Helpful Resources

- **Contentful JavaScript SDK:** search "contentful" on npmjs.com
- **Nuxt 3 Data Fetching:** search "Nuxt 3 useFetch" in the Nuxt docs
- **Nuxt 3 Runtime Config:** search "Nuxt 3 runtimeConfig" in the Nuxt docs
- **Nuxt 3 Server Routes:** search "Nuxt 3 server api" in the Nuxt docs
