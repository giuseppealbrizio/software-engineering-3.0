# Contributing to Software Engineering 3.0

Thank you for your interest in contributing! This guide will help you get started.

## Types of Contributions

- **New articles** - Analysis, insights on AI/dev world
- **New guides** - Tutorials, setup guides, cheatsheets
- **Improvements** - Corrections, updates, translations
- **Bug fixes** - Code/styling errors

## Before You Start

1. Check existing [Issues](../../issues) to avoid duplicates
2. For significant contributions, open an Issue first to discuss your idea
3. Ensure content is **agnostic** (no personal/company-specific references)

## Branch Strategy

```
main     → Production (protected, deploy automatico)
develop  → Development (target per le PR)
```

**Important:** All Pull Requests must target the `develop` branch, NOT `main`.

## Workflow

### 1. Fork and Clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/YOUR-USERNAME/software-engineering-3.0.git
cd software-engineering-3.0
npm install
```

### 2. Create a Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/docker-guide
# or
git checkout -b fix/typo-readme
# or
git checkout -b article/llm-analysis-2026
```

### 3. Make Your Changes

#### For new articles (`src/content/articles/`)
- Use `kebab-case.mdx` naming
- Include required frontmatter (see below)
- Use Astro components for styling

#### For new guides (`src/content/guides/`)
- Use `kebab-case.mdx` naming
- Follow existing guide structure
- Include TOC for longer guides

#### Required Frontmatter

```yaml
---
title: "Your Title"
description: "Brief description shown on cards"
icon: "🎯"           # Emoji icon
tag: "Category"      # Optional: Analisi, Tutorial, Cheatsheet, etc.
date: 2026-01-05     # Optional
---
```

#### Available Components

Import components at the top of your MDX file:

```mdx
import InfoBox from '../../components/InfoBox.astro';
import ProsCons from '../../components/ProsCons.astro';
import Quote from '../../components/Quote.astro';
import StepHeader from '../../components/StepHeader.astro';
import StatCard from '../../components/StatCard.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';
import VersionBadge from '../../components/VersionBadge.astro';
```

Example usage:

```mdx
<InfoBox type="info" title="Note">
Content here...
</InfoBox>

<InfoBox type="warning" title="Attention">
Warning content...
</InfoBox>

<InfoBox type="success" title="Done">
Success message...
</InfoBox>

<ProsCons
  pros={["Pro 1", "Pro 2"]}
  cons={["Con 1", "Con 2"]}
/>

<Quote author="Author Name">
Quote text here...
</Quote>
```

### 4. Test Locally

```bash
npm run dev   # Start dev server at localhost:4321
```

Verify:
- [ ] Page renders without errors
- [ ] Links work correctly
- [ ] Style is consistent with the rest of the site
- [ ] Responsive on mobile

### 5. Build and Verify

```bash
npm run build    # Generate static site
npm run preview  # Preview production build
```

### 6. Commit and Push

```bash
git add .
git commit -m "add: Docker guide for developers"
git push origin feature/docker-guide
```

#### Commit Message Convention

```
add: description     # New content
fix: description     # Bug fixes
update: description  # Updates to existing content
style: description   # Style/formatting changes only
docs: description    # README, CONTRIBUTING, etc.
```

### 7. Open a Pull Request

1. Go to GitHub and open a PR
2. **Target branch: `develop`** (NOT main!)
3. Fill out the PR template
4. Wait for review

```bash
# Or via CLI:
gh pr create --base develop --title "Add: Docker guide"
```

## Review Process

1. **You open PR** → targeting `develop`
2. **Maintainer reviews** → may request changes
3. **PR approved and merged** → into `develop`
4. **Periodically**, maintainer merges `develop` → `main`
5. **Auto-deploy** → site updated

## Content Guidelines

### Writing Style

- **Clear and concise** - Avoid unnecessary words
- **Practical** - Concrete examples > abstract theory
- **Up-to-date** - Verify information is current
- **Agnostic** - No references to specific people/companies

### What to Avoid

- Promotional or advertising content
- Outdated or unverified information
- Untested code
- Copyright violations

### Language

- Italian for articles and guides (primary audience)
- English accepted for technical content
- Code and commands always in English

## Code Review Checklist

PRs are reviewed for:

1. **Content quality** - Accuracy, usefulness, clarity
2. **Style consistency** - Alignment with existing design
3. **Functionality** - Links work, responsive, no errors
4. **Build passes** - `npm run build` succeeds

## Questions?

Open an [Issue](../../issues) with `question` or `help wanted` label.

---

Thank you for contributing!
