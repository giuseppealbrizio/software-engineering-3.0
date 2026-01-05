---
title: "Installazione Claude Code su macOS"
description: "Setup completo di Claude Code su macOS con fnm/nvm, configurazione zsh e troubleshooting"
icon: "🍎"
tag: "Tutorial"
date: 2026-01-05
---

## Prerequisiti

- macOS 12 (Monterey) o successivo
- Node.js 18+
- Account Anthropic con API key

## 1. Installa Node.js

### Opzione A: fnm (consigliato)

```bash
# Installa fnm
brew install fnm

# Configura shell
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc

# Installa Node
fnm install --lts
fnm default lts-latest
```

### Opzione B: nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc
nvm install --lts
```

## 2. Installa Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

## 3. Configura API Key

```bash
# Imposta la chiave API
export ANTHROPIC_API_KEY="sk-ant-..."

# Per renderla persistente, aggiungi a ~/.zshrc:
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
```

## 4. Verifica Installazione

```bash
claude --version
claude --help
```

## 5. Primo Utilizzo

```bash
cd /path/to/your/project
claude
```

## Troubleshooting

### "command not found: claude"
```bash
# Verifica PATH npm
npm config get prefix
# Aggiungi al PATH se necessario
export PATH="$PATH:$(npm config get prefix)/bin"
```

### Errori di permessi
```bash
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

### API Key non riconosciuta
```bash
# Verifica che sia impostata
echo $ANTHROPIC_API_KEY
```

## Tips

- Usa `claude` nella root del progetto per dare contesto
- Leggi i file di setup di questo repo per configurare l'ambiente
- Claude Code può eseguire comandi: usalo per automatizzare setup
