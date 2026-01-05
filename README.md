# Software Engineering 3.0

Raccolta di articoli e guide sul mondo dello sviluppo software nell'era dell'AI.

## Live Site

🌐 **[https://giuseppealbrizio.github.io/software-engineering-3.0](https://giuseppealbrizio.github.io/software-engineering-3.0)**

## Sviluppo Locale

```bash
npm install        # Installa dipendenze
npm run dev        # Avvia server locale (localhost:4321)
npm run build      # Genera sito statico in dist/
npm run preview    # Preview build di produzione
```

## Struttura

```
src/
├── content/
│   ├── articles/    # Articoli in MDX
│   └── guides/      # Guide in MDX
├── pages/           # Route Astro
├── layouts/         # Layout riutilizzabili
├── components/      # Componenti Astro
└── styles/          # CSS globale

setup/               # File automazione Claude Code
legacy-html/         # Versioni HTML originali (retrocompatibilità)
```

## Articoli

| Articolo | Descrizione |
|----------|-------------|
| [ai-developer-paradigm](src/content/articles/ai-developer-paradigm.mdx) | Il Nuovo Paradigma dello Sviluppatore AI |
| [ai-developer-paradigm-python](src/content/articles/ai-developer-paradigm-python.mdx) | Il Nuovo Paradigma - Python Edition |
| [ai-developer-roadmap-2026](src/content/articles/ai-developer-roadmap-2026.mdx) | Roadmap AI Developer 2026 |
| [ai-jobs-overview-2026](src/content/articles/ai-jobs-overview-2026.mdx) | AI, Lavoro e Futuro dei Programmatori |
| [memory-war-enterprise](src/content/articles/memory-war-enterprise.mdx) | The Memory War That Will Define AI |
| [python-fundamentals-to-generative](src/content/articles/python-fundamentals-to-generative.mdx) | Da Python Fundamentals a Generative Programming |
| [welcome-to-the-machine-analysis](src/content/articles/welcome-to-the-machine-analysis.mdx) | Welcome to the Machine - Analisi |

## Guide

| Guida | Descrizione |
|-------|-------------|
| [macos-dev-setup](src/content/guides/macos-dev-setup.mdx) | macOS Dev Environment Setup |
| [windows-dev-setup](src/content/guides/windows-dev-setup.mdx) | Windows Dev Environment Setup |
| [claude-code-setup-macos](src/content/guides/claude-code-setup-macos.mdx) | Installazione Claude Code su macOS |
| [claude-code-setup-windows](src/content/guides/claude-code-setup-windows.mdx) | Installazione Claude Code su Windows |
| [github-cli-guide](src/content/guides/github-cli-guide.mdx) | GitHub CLI - Guida Completa |
| [uv-cheatsheet](src/content/guides/uv-cheatsheet.mdx) | UV Cheatsheet |
| [windows-terminal-setup](src/content/guides/windows-terminal-setup.mdx) | Windows Terminal Setup |

## Setup Automazione (Claude Code)

File di contesto per automatizzare il setup dell'ambiente di sviluppo con Claude Code.

| File | Descrizione |
|------|-------------|
| [macos.md](setup/macos.md) | Setup completo macOS (Homebrew, Node, Python, Docker, etc.) |
| [windows.md](setup/windows.md) | Setup completo Windows (winget, Scoop, WSL2, Node, Python, etc.) |

**Come usare:** Apri la repo con Claude Code e chiedi di leggere il file di setup appropriato ed eseguire i comandi.

## Tech Stack

- **[Astro](https://astro.build/)** - Framework per siti statici
- **MDX** - Markdown con componenti Astro
- **Content Collections** - Gestione contenuti con schema Zod
- **GitHub Pages** - Hosting statico

## Changelog

### v2.1.0 - 2026-01-05
- Convertiti tutti i contenuti da Markdown a MDX
- Aggiunti 11 componenti Astro per styling avanzato (InfoBox, ProsCons, Quote, etc.)
- Styling visuale migliorato con box colorati, griglie, timeline

### v2.0.0 - 2026-01-05
- Migrazione completa ad Astro framework
- Contenuti convertiti da HTML a Markdown con Content Collections
- File HTML originali preservati in `legacy-html/` per retrocompatibilità
- Aggiunto `CLAUDE.md` per guidance Claude Code

### v1.4.0 - 2026-01-05
- Aggiunta cartella `setup/` con file di contesto per Claude Code
- File markdown ottimizzati per automazione (macos.md, windows.md)
- Aggiunta documentazione open source (CONTRIBUTING, CODE_OF_CONDUCT, LICENSE)
- Aggiunti template GitHub per issues e PR

### v1.3.0 - 2026-01-05
- Aggiunte guide complete Dev Environment Setup per macOS e Windows
- Boilerplate per setup automatizzato con Claude Code

### v1.2.0 - 2026-01-04
- Aggiunta homepage con design dark minimal
- Cards interattive con filtri per categoria (Articoli/Guide)
- Documenti resi agnostici (rimossi riferimenti personali)

### v1.1.0 - 2026-01-04
- Riorganizzazione file in cartelle `articles/` e `guides/`
- Rinominati tutti i file in kebab-case
- Aggiunta guida Claude Code per macOS
- Aggiunto articolo "Da Python Fundamentals a Generative Programming"

### v1.0.0 - 2025-12-28
- Setup iniziale repository
- Primi articoli e guide
