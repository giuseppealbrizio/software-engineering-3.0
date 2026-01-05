---
title: "GitHub CLI - Guida Completa"
description: "Padroneggia gh: comandi essenziali, workflow, alias e integrazioni avanzate"
icon: "🐙"
tag: "Tutorial"
date: 2026-01-05
---

## Indice

- [Installazione](#installazione)
- [Autenticazione](#autenticazione)
- [Creare una repo](#creare-una-nuova-repository)
- [Push progetto esistente](#push-di-un-progetto-locale-esistente)
- [Comandi utili](#comandi-utili-quotidiani)
- [Troubleshooting](#troubleshooting)

---

## Installazione

### Windows

#### Metodo consigliato: winget

```bash
winget install GitHub.cli
```

> **Dopo l'installazione:** Chiudi e riapri il terminale per aggiornare il PATH.

#### Se hai gia gh installato con .exe

Prima di installare con winget, disinstalla la versione precedente:

1. Apri `Impostazioni` > `App` > `App installate`
2. Cerca "GitHub CLI"
3. Click sui tre puntini > `Disinstalla`
4. Poi procedi con `winget install GitHub.cli`

#### Verifica installazione

```bash
gh --version
```

### macOS

#### Metodo consigliato: Homebrew

```bash
brew install gh
```

> **Non hai Homebrew?** Installalo prima con:
> ```bash
> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
> ```

#### Aggiornare gh

```bash
brew upgrade gh
```

#### Verifica installazione

```bash
gh --version
```

---

## Autenticazione

Prima di poter usare gh, devi autenticarti con il tuo account GitHub:

```bash
gh auth login
```

### Procedura guidata

1. **Scegli l'host** - Seleziona `GitHub.com` (o Enterprise se usi quello aziendale)
2. **Protocollo preferito** - Scegli `HTTPS` (raccomandato) o `SSH`
3. **Metodo di autenticazione** - Seleziona `Login with a web browser` - si aprira il browser
4. **Copia il codice** - Il terminale mostra un codice one-time, incollalo nella pagina web

### Verifica autenticazione

```bash
gh auth status
```

**Output atteso:**

```
github.com
  ✓ Logged in to github.com as TUOUSERNAME
  ✓ Git operations for github.com configured to use https protocol.
```

---

## Creare una nuova repository

### Opzione 1: Crea repo e clona in locale

```bash
# Crea repo pubblica
gh repo create nome-progetto --public --clone

# Crea repo privata
gh repo create nome-progetto --private --clone
```

### Opzione 2: Wizard interattivo

```bash
gh repo create
```

Ti guida passo passo nella configurazione.

### Opzioni utili

| Flag | Descrizione |
|------|-------------|
| `--public` | Repository pubblica |
| `--private` | Repository privata |
| `--clone` | Clona subito in locale |
| `--description "testo"` | Aggiunge descrizione |
| `--gitignore node` | Aggiunge .gitignore (es: node, python) |
| `--license mit` | Aggiunge licenza |

### Esempio completo

```bash
gh repo create mio-progetto \
  --public \
  --clone \
  --description "Il mio progetto Node.js" \
  --gitignore node \
  --license mit
```

---

## Push di un progetto locale esistente

Hai gia un progetto in locale e vuoi pubblicarlo su GitHub? Ecco la procedura:

### Passo 1: Entra nella cartella del progetto

```bash
cd /percorso/al/tuo/progetto
```

### Passo 2: Inizializza git (se non gia fatto)

```bash
git init
```

### Passo 3: Aggiungi e committa i file

```bash
git add .
git commit -m "Initial commit"
```

### Passo 4: Crea la repo su GitHub e collega

```bash
# Crea repo e imposta come remote (usa il nome della cartella)
gh repo create --source=. --public --push

# Oppure con nome custom
gh repo create nome-repo --source=. --private --push
```

> **Fatto!** Il comando `--push` fa automaticamente il push del branch corrente.

### Se la repo esiste gia su GitHub

Devi solo collegare il remote e pushare:

```bash
# Aggiungi il remote
git remote add origin https://github.com/TUOUSERNAME/nome-repo.git

# Push
git push -u origin main
```

> **Branch main vs master:** Se il tuo branch locale si chiama `master` ma GitHub usa `main`:
> `git branch -M main` rinomina il branch prima del push.

---

## Comandi utili quotidiani

### Repository

| Comando | Descrizione |
|---------|-------------|
| `gh repo list` | Lista le tue repo |
| `gh repo clone owner/repo` | Clona una repo |
| `gh repo view` | Info sulla repo corrente |
| `gh repo view --web` | Apre la repo nel browser |
| `gh repo fork owner/repo --clone` | Forka e clona |
| `gh repo delete owner/repo` | Elimina repo (chiede conferma) |

### Pull Request

| Comando | Descrizione |
|---------|-------------|
| `gh pr create` | Crea una PR (wizard interattivo) |
| `gh pr list` | Lista PR aperte |
| `gh pr view 123` | Dettagli PR #123 |
| `gh pr checkout 123` | Checkout del branch della PR |
| `gh pr merge 123` | Mergia la PR |

### Issues

| Comando | Descrizione |
|---------|-------------|
| `gh issue create` | Crea una issue |
| `gh issue list` | Lista issue aperte |
| `gh issue view 42` | Dettagli issue #42 |
| `gh issue close 42` | Chiude issue #42 |

### Workflow (GitHub Actions)

| Comando | Descrizione |
|---------|-------------|
| `gh run list` | Lista run recenti |
| `gh run view` | Dettagli ultimo run |
| `gh run watch` | Watch live del run in corso |

### Gist

```bash
# Crea gist pubblico
gh gist create file.js --public

# Crea gist privato con piu file
gh gist create file1.js file2.py

# Lista i tuoi gist
gh gist list
```

---

## Troubleshooting

### "gh" non riconosciuto come comando

**Windows:** Chiudi e riapri il terminale. Se non basta, fai logout/login da Windows.

**macOS:** Esegui `source ~/.zshrc` o riapri il terminale.

**Verifica PATH:** `where.exe gh` (Windows) o `which gh` (macOS)

### Errore di autenticazione

Prova a riautenticarti:

```bash
gh auth logout
gh auth login
```

### Permission denied (push)

Verifica di avere i permessi sulla repo e che l'autenticazione sia corretta:

```bash
gh auth status
```

### Conflitto tra versioni (Windows)

Se hai installato gh sia con .exe che con winget, disinstalla entrambi da "App installate" e reinstalla solo con winget.

### Comandi di debug

```bash
# Stato autenticazione
gh auth status

# Versione installata
gh --version

# Configurazione attuale
gh config list

# Aggiorna gh
# Windows
winget upgrade GitHub.cli

# macOS
brew upgrade gh
```

---

**Documentazione ufficiale:** [cli.github.com/manual](https://cli.github.com/manual/)
