# Contributing to Software Engineering 3.0

Thank you for your interest in contributing! This guide will help you get started.

## Types of Contributions

- **New articles** - Analysis, insights on AI/dev world
- **New guides** - Tutorials, setup guides, cheatsheets
- **Improvements** - Corrections, updates, translations
- **Bug fixes** - HTML/CSS/JS errors

## Before You Start

1. Check existing [Issues](../../issues) to avoid duplicates
2. For significant contributions, open an Issue first to discuss your idea
3. Ensure content is **agnostic** (no personal/company-specific references)

## Workflow

### 1. Fork and Clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/YOUR-USERNAME/software-engineering-3.0.git
cd software-engineering-3.0
```

### 2. Create a Branch

```bash
# Use descriptive names
git checkout -b feature/docker-guide
git checkout -b fix/typo-readme
git checkout -b article/llm-analysis-2026
```

### 3. Make Your Changes

#### For new articles (`articles/`)
- Use `kebab-case.html` naming
- Copy styling from an existing article (dark theme)
- Include "Back to Home" link in footer

#### For new guides (`guides/`)
- Use `kebab-case.html` naming
- Follow existing guide structure
- Include TOC for longer guides

#### Recommended HTML Structure
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title - Software Engineering 3.0</title>
    <style>
        /* Copy existing dark theme styles */
    </style>
</head>
<body>
    <div class="container">
        <header>
            <span class="badge">ARTICLE/GUIDE</span>
            <h1>Title</h1>
        </header>

        <!-- Content -->

        <footer>
            <p><a href="../index.html">← Back to Home</a></p>
        </footer>
    </div>
</body>
</html>
```

### 4. Update index.html and README

- Add the card in `index.html` in the appropriate section
- Add the row in `README.md` table
- **DO NOT** modify the Changelog (maintainer will do it)

### 5. Test Locally

```bash
# Open index.html in browser
open index.html  # macOS
start index.html # Windows
```

Verify:
- [ ] Links work correctly
- [ ] Style is consistent with the rest of the site
- [ ] Responsive on mobile
- [ ] No browser console errors

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

1. Go to GitHub and open a PR to `main`
2. Fill out the PR template
3. Wait for review

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

## Code Review

PRs are reviewed for:

1. **Content quality** - Accuracy, usefulness, clarity
2. **Style consistency** - Alignment with existing design
3. **Functionality** - Links, responsive, no errors

## Questions?

Open an [Issue](../../issues) with `question` or `help wanted` label.

---

Thank you for contributing!
