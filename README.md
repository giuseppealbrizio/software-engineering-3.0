# Software Engineering 3.0

Raccolta di articoli e guide sul mondo dello sviluppo software nell'era dell'AI.

## Struttura

```
├── index.html   # Homepage del sito
├── articles/    # Articoli, analisi, roadmap
├── guides/      # Guide pratiche, tutorial, cheatsheet
└── setup/       # File di contesto per Claude Code (automazione setup)
```

## Live Site

Apri `index.html` nel browser per navigare il sito con interfaccia dark minimal e filtri per categoria.

## Articles

| File | Titolo |
|------|--------|
| [ai-developer-paradigm-python-v2.html](articles/ai-developer-paradigm-python-v2.html) | Il Nuovo Paradigma dello Sviluppatore AI - Python Edition |
| [ai-developer-paradigm-v2.html](articles/ai-developer-paradigm-v2.html) | Il Nuovo Paradigma dello Sviluppatore AI |
| [ai-developer-roadmap-2026-v3.html](articles/ai-developer-roadmap-2026-v3.html) | Roadmap AI Developer 2026 |
| [ai-jobs-overview-2026.html](articles/ai-jobs-overview-2026.html) | AI, Lavoro e Futuro dei Programmatori - Overview 2026 |
| [memory-war-enterprise.html](articles/memory-war-enterprise.html) | The Memory War That Will Define AI - Analisi Strategica |
| [python-fundamentals-to-generative.html](articles/python-fundamentals-to-generative.html) | Da Python Fundamentals a Generative Programming |
| [welcome-to-the-machine-analysis.html](articles/welcome-to-the-machine-analysis.html) | Welcome to the Machine - Analisi e Implicazioni |

## Guides

| File | Titolo |
|------|--------|
| [macos-dev-setup.html](guides/macos-dev-setup.html) | macOS Dev Environment Setup - Guida Completa |
| [windows-dev-setup.html](guides/windows-dev-setup.html) | Windows Dev Environment Setup - Guida Completa |
| [claude-code-setup-macos.html](guides/claude-code-setup-macos.html) | Installazione Claude Code su macOS |
| [claude-code-setup-windows.html](guides/claude-code-setup-windows.html) | Installazione Claude Code su Windows |
| [github-cli-guide.html](guides/github-cli-guide.html) | GitHub CLI - Guida Completa |
| [uv-cheatsheet.html](guides/uv-cheatsheet.html) | UV Cheatsheet |
| [windows-terminal-setup.html](guides/windows-terminal-setup.html) | Windows Terminal Setup - Guida Completa |

## Setup (for Claude Code)

File di contesto per automatizzare il setup dell'ambiente di sviluppo con Claude Code.

| File | Descrizione |
|------|-------------|
| [macos.md](setup/macos.md) | Setup completo macOS (Homebrew, Node, Python, Docker, etc.) |
| [windows.md](setup/windows.md) | Setup completo Windows (winget, Scoop, WSL2, Node, Python, etc.) |

**Come usare:** Apri la repo con Claude Code e chiedi di leggere il file di setup appropriato ed eseguire i comandi.

## Changelog

### v1.4.0 - 2026-01-05
- Aggiunta cartella `setup/` con file di contesto per Claude Code
- File markdown ottimizzati per automazione (macos.md, windows.md)
- Aggiunta documentazione open source (CONTRIBUTING, CODE_OF_CONDUCT, LICENSE)
- Aggiunti template GitHub per issues e PR

### v1.3.0 - 2026-01-05
- Aggiunte guide complete Dev Environment Setup per macOS e Windows
- Boilerplate per setup automatizzato con Claude Code

### v1.2.0 - 2026-01-04
- Aggiunta homepage `index.html` con design dark minimal
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