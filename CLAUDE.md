# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Yarn workspaces monorepo containing two Nuxt 3 applications for Surf Garage:
- **boardStorage** (`packages/boardStorage`): Board storage/rental service site (surfgarage.es) - runs on port 3000
- **art** (`packages/art`): Art gallery/photography site (surfgarage.art) - runs on port 3001
- **core** (`packages/core`): Shared components, composables, and configuration

Both apps extend the core package and share common functionality while maintaining separate domains and content.

## Development Commands

```bash
# Install dependencies
yarn install

# Development (runs both apps concurrently)
yarn dev

# Development (individual apps)
yarn dev:board    # Board storage app on port 3000
yarn dev:art      # Art gallery app on port 3001

# Build
yarn build:board  # Build board storage app
yarn build:art    # Build art gallery app

# Linting (within individual packages)
cd packages/boardStorage && yarn lint
cd packages/art && yarn lint

# Deploy to production server
yarn deploy       # Runs deployToOcean.sh script
```

## Architecture

### Workspace Structure

The monorepo uses Yarn workspaces with three packages:

1. **packages/core**: Base configuration and shared code
   - Extends Nuxt config for both apps
   - Shared components (Footer, Accordion, Image, RichText, LanguageSwitcher, etc.)
   - Core composables (`useContentful`, `useHost`, `useSiteNav`, `useHamburgerMenu`)
   - Global CSS and Tailwind configuration
   - SVG icon system with auto-import from `@core/assets/icons/`
   - Google Fonts configuration (Work Sans)

2. **packages/boardStorage**: Board storage service
   - Extends `../core`
   - i18n with Spanish as default (`es`, `en`)
   - Contentful CMS integration for blog content
   - Custom composables: `useImages`, `useBlogSeo`
   - Pages: index, boards, art, blog posts (`[...blogSlug].vue`)

3. **packages/art**: Art gallery and photography
   - Extends `../core`
   - i18n with English as default (`es`, `en`)
   - Contentful CMS integration for art/photo content
   - E-commerce features (Snipcart integration)
   - Custom composables: `useContentfulPhotos`, `useContentfulPosters`, `useImages`, `useArtSeo`, `useTags`, `useCategory`
   - Dynamic routing for artists, collections, places, posters, and prints
   - Infinite scrolling pagination (12 items per page)
   - Sitemap generation

### Contentful CMS Integration

Both apps use Contentful as a headless CMS:
- Content types include: `artGalleryPage`, `artHomepage`, blog posts, etc.
- Images and metadata are tagged for filtering
- The `useContentful` composable provides:
  - `getEntries()` - fetch content entries
  - `getEntry()` - fetch single entry
  - `getAssets()` - fetch media assets
  - `getAsset()` - fetch single asset
  - `getFirstEntryOfType()` - fetch first entry of a content type
- All queries use `useAsyncData` for SSR support
- Environment variables: `contentfulSpace`, `contentfulAccessToken`

### i18n Configuration

Both apps use @nuxtjs/i18n with:
- Strategy: `prefix_except_default`
- Locales: Spanish (`es`) and English (`en`)
- Shared locale files in root `locales/` directory
- Browser language detection with cookie persistence
- Lazy loading enabled
- Different default locales per app (boardStorage: `es`, art: `en`)

### Component Loading Strategy

The art homepage uses dynamic component mapping to render Contentful components:
```javascript
const homepageComponent = {
  artHeroBanner: resolveComponent('LazyHeroBanner'),
  artCategoryGrid: resolveComponent('LazyCategoryGrid'),
  artistsSlider: resolveComponent('LazySliderArtists'),
  artPrintsSlider: resolveComponent('LazySliderPrints'),
  artPosterSlider: resolveComponent('LazySliderPosters')
}
```
Components are rendered based on Contentful content type IDs.

### PostCSS Configuration

Both apps use PostCSS with:
- `postcss-comment` parser
- `postcss-simple-vars` for CSS variables
- `postcss-nested` for nested CSS syntax
- `postcss-import` for CSS imports

### Production Deployment

Production uses PM2 with cluster mode (configured in `ecosystem.config.cjs`):
- Both apps run in cluster mode with max instances
- Board storage serves from `packages/boardStorage/.output/server/index.mjs`
- Art gallery serves from `packages/art/.output/server/index.mjs`
- Deploy script (`deployToOcean.sh`) SSH's to production server, pulls latest code, installs dependencies, builds both apps, and restarts PM2

## Environment Variables

Required in `.env` file at package level:
- `contentfulSpace` - Contentful space ID
- `contentfulAccessToken` - Contentful API access token
- `instaAccessToken` - Instagram access token (for core package)
- `enableCommerce` - Enable/disable e-commerce features (art package)
- `PORT` - Server port (optional)

## Key Technical Details

- Uses ESLint with TypeScript and Vue plugins
- Tailwind CSS for styling
- Nuxt 3 with SSR enabled
- Google Analytics integration via nuxt-gtag (different IDs per app)
- robots.txt configuration via @nuxtjs/robots
- Art app includes Splide slider library and Snipcart for e-commerce