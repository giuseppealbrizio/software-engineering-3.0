---
title: "GitHub CLI - Guida Completa"
description: "Padroneggia gh: comandi essenziali, workflow, alias e integrazioni avanzate"
icon: "🐙"
tag: "Tutorial"
date: 2026-01-05
---

## Installazione

```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli
```

## Autenticazione

```bash
gh auth login
gh auth status
```

## Repository

```bash
# Clona repo
gh repo clone owner/repo

# Crea nuovo repo
gh repo create my-repo --public --clone

# Visualizza repo corrente
gh repo view

# Apri repo nel browser
gh browse
```

## Pull Requests

```bash
# Lista PR
gh pr list

# Crea PR
gh pr create --title "Title" --body "Description"

# Crea PR interattiva
gh pr create

# Checkout PR
gh pr checkout 123

# Merge PR
gh pr merge 123

# Review PR
gh pr review 123 --approve
gh pr review 123 --comment --body "LGTM!"
```

## Issues

```bash
# Lista issues
gh issue list

# Crea issue
gh issue create --title "Bug" --body "Description"

# Visualizza issue
gh issue view 123

# Chiudi issue
gh issue close 123
```

## Workflow (GitHub Actions)

```bash
# Lista workflow runs
gh run list

# Visualizza run
gh run view 123

# Watch run in tempo reale
gh run watch

# Re-run workflow
gh run rerun 123
```

## Gists

```bash
# Crea gist
gh gist create file.txt

# Lista gist
gh gist list

# Visualizza gist
gh gist view abc123
```

## Alias Utili

```bash
# Crea alias
gh alias set prc 'pr create'
gh alias set prv 'pr view'
gh alias set prl 'pr list'

# Lista alias
gh alias list
```

## Tips Avanzati

```bash
# Output JSON per scripting
gh pr list --json number,title,author

# Filtra con jq
gh pr list --json number,title | jq '.[0]'

# Template per PR
gh pr create --template .github/PULL_REQUEST_TEMPLATE.md
```

## Configurazione

```bash
# Editor default
gh config set editor "code --wait"

# Browser default
gh config set browser "firefox"

# Visualizza config
gh config list
```
