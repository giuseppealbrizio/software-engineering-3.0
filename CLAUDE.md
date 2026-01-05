# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start local dev server (localhost:4321)
npm run build    # Generate static site in dist/
npm run preview  # Preview production build locally
```

## Architecture Overview

This is an Astro static site for Italian AI/software development articles and guides, deployed to GitHub Pages.

### Content Collections

Two Zod-validated content collections in `src/content/`:
- **articles/** - Analysis pieces, roadmaps (7 markdown files)
- **guides/** - Practical tutorials, cheatsheets (7 markdown files)

Frontmatter schema (both collections):
```yaml
title: string       # Required
description: string # Required - shown on cards
icon: string        # Required - emoji icon
tag: string         # Optional - category badge
date: date          # Optional
```

### Routing

- `src/pages/index.astro` - Homepage with filterable card grid
- `src/pages/articles/[...slug].astro` - Dynamic route for articles
- `src/pages/guides/[...slug].astro` - Dynamic route for guides

Routes use `getStaticPaths()` + `getCollection()` for static generation.

### Layouts & Components

- `BaseLayout.astro` - HTML wrapper for homepage
- `ArticleLayout.astro` - Wrapper for content pages (accepts `category: 'article' | 'guide'`)
- `Card.astro` - Reusable content card with filtering support via data attributes

### Key Configuration

`astro.config.mjs`:
- Site: `https://giuseppealbrizio.github.io`
- Base path: `/software-engineering-3.0` (use `import.meta.env.BASE_URL` for links)
- Integration: `@astrojs/mdx`

### Special Directories

- `legacy-html/` - Original HTML versions for backwards compatibility
- `setup/` - Claude Code automation files (macos.md, windows.md)
- `public/setup/` - Static setup files served directly

## Adding Content

1. Create `.md` file in `src/content/articles/` or `src/content/guides/`
2. Add required frontmatter (title, description, icon)
3. Slug derived from filename (e.g., `my-guide.md` → `/guides/my-guide`)
