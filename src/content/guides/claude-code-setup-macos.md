---
title: "Installazione Claude Code su macOS"
description: "Setup completo di Claude Code su macOS con fnm/nvm, configurazione zsh e troubleshooting"
icon: "🍎"
tag: "Tutorial"
date: 2026-01-05
---

## 1. Installa un Node Version Manager

Usare un version manager per Node.js ti permette di gestire multiple versioni senza problemi di permessi. Su macOS hai due ottime opzioni:

### fnm (Consigliato)

#### Installa fnm con Homebrew

```bash
brew install fnm
```

#### Configura la shell

Aggiungi questa riga al tuo `~/.zshrc`:

```bash
eval "$(fnm env --use-on-cd)"
```

Oppure esegui questo comando per aggiungerla automaticamente:

```bash
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
```

**Vantaggi di fnm:**

- **Velocissimo** - Scritto in Rust, fnm e molto piu veloce di nvm
- **Auto-switch** - Cambia versione automaticamente con .node-version
- **Cross-platform** - Funziona identicamente su macOS, Linux e Windows
- **Homebrew native** - Installazione e aggiornamenti semplici

### nvm

#### Installa nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Lo script aggiungerà automaticamente le righe necessarie al tuo `~/.zshrc`.

**Vantaggi di nvm:**

- **Standard de facto** - Il version manager Node.js piu usato
- **Documentazione ampia** - Molto supporto online e community attiva
- **Compatibile .nvmrc** - Supporta il file .nvmrc presente in molti progetti
- **No dipendenze** - Non richiede Homebrew o altri tool

> **Dopo l'installazione:** Chiudi e riapri il terminale, oppure esegui `source ~/.zshrc` per ricaricare la configurazione.

---

## 2. Installa Node.js

Apri Terminal e installa la versione LTS (Long Term Support) di Node.js:

### Con fnm

```bash
fnm install --lts
fnm use lts-latest
```

### Con nvm

```bash
nvm install --lts
nvm use --lts
```

### Verifica l'installazione

```bash
node --version
npm --version
```

> **Output atteso:** Dovresti vedere i numeri di versione, es. `v22.x.x` e `10.x.x`

---

## 3. Installa Claude Code

Con npm disponibile, installa Claude Code globalmente:

```bash
npm install -g @anthropic-ai/claude-code
```

### Verifica l'installazione

```bash
claude --help
```

> **Installazione completata:** Il comando `claude` e ora disponibile in qualsiasi finestra di Terminal.

---

## 4. Primi passi con Claude Code

### Autenticazione

Al primo avvio, Claude Code ti chiedera di autenticarti con il tuo account Anthropic:

```bash
claude
```

### Comandi utili

```bash
# Avvia una sessione interattiva
claude

# Esegui un comando singolo
claude "spiega questo codice"

# Mostra la versione
claude --version

# Mostra tutti i comandi disponibili
claude --help
```

---

## Troubleshooting

### "fnm" o "nvm" non riconosciuto

Verifica che la configurazione sia presente nel tuo `~/.zshrc`:

```bash
cat ~/.zshrc | grep -E "(fnm|nvm)"
```

Se non vedi output, ripeti il passo di configurazione della shell.

### "claude" non riconosciuto dopo l'installazione

Verifica che npm abbia installato correttamente:

```bash
npm list -g @anthropic-ai/claude-code
```

Se il pacchetto e presente, riavvia il terminale.

### Errori di permessi con npm

Se usi un version manager (fnm/nvm) non dovresti avere problemi di permessi. Se hai installato Node tramite Homebrew o dal sito ufficiale, potresti avere conflitti. Rimuovilo e usa fnm/nvm.

### Conflitto con Node installato via Homebrew

Se hai Node installato anche via Homebrew:

```bash
brew uninstall node
```

Poi reinstalla tramite fnm o nvm.

### Comandi utili per debug

```bash
# Verifica quale Node stai usando
which node

# Verifica le versioni installate (fnm)
fnm list

# Verifica le versioni installate (nvm)
nvm list

# Verifica il PATH di npm
npm config get prefix

# Reinstalla Claude Code
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

---

## Aggiornamenti

### Aggiornare Node.js

#### Con fnm

```bash
fnm install --lts
fnm use lts-latest
fnm default lts-latest
```

#### Con nvm

```bash
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'
```

### Aggiornare Claude Code

```bash
npm update -g @anthropic-ai/claude-code
```

### Aggiornare fnm (se installato via Homebrew)

```bash
brew upgrade fnm
```
