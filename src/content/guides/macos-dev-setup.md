---
title: "macOS Dev Environment Setup"
description: "Setup completo da zero: Homebrew, Git, Node.js, Python, Docker e tutti i tools essenziali"
icon: "🍎"
tag: "Boilerplate"
date: 2026-01-05
---

## Indice

1. [Homebrew - Package Manager](#1-homebrew---package-manager)
2. [Terminal & Shell (iTerm2, Oh My Zsh)](#2-terminal--shell)
3. [Git & GitHub CLI](#3-git--github-cli)
4. [Node.js (fnm)](#4-nodejs-con-fnm)
5. [Python (pyenv + uv)](#5-python-con-pyenv--uv)
6. [Editor & IDE](#6-editor--ide)
7. [Docker](#7-docker)
8. [Tools Extra](#8-tools-extra)
9. [Backup Dotfiles](#9-backup-dotfiles)

---

## 1. Homebrew - Package Manager

Homebrew e il package manager essenziale per macOS. Installa tutto il resto.

### Installazione

```bash
# Installa Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Configurazione PATH (Apple Silicon)

```bash
# Aggiungi Homebrew al PATH (per Mac M1/M2/M3)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

> **Nota: Intel vs Apple Silicon**
> Su Mac Intel, Homebrew si installa in `/usr/local`. Su Apple Silicon (M1/M2/M3) in `/opt/homebrew`.

### Comandi Essenziali

```bash
# Aggiorna Homebrew e tutti i pacchetti
brew update && brew upgrade

# Cerca un pacchetto
brew search nome-pacchetto

# Installa un pacchetto
brew install nome-pacchetto

# Installa app GUI (cask)
brew install --cask nome-app

# Lista pacchetti installati
brew list

# Pulizia cache e vecchie versioni
brew cleanup
```

### Esporta/Importa Configurazione

```bash
# Esporta lista pacchetti in Brewfile
brew bundle dump --file=~/Brewfile

# Installa tutto da Brewfile
brew bundle install --file=~/Brewfile
```

---

## 2. Terminal & Shell

### iTerm2 (Opzionale ma consigliato)

```bash
brew install --cask iterm2
```

### Oh My Zsh

```bash
# Installa Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Plugin Essenziali

```bash
# Installa zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Installa zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Configura ~/.zshrc

```bash
# Modifica la riga plugins in ~/.zshrc
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

### Font Consigliati (Nerd Fonts)

```bash
# Installa font per icone nel terminale
brew tap homebrew/cask-fonts
brew install --cask font-fira-code-nerd-font
brew install --cask font-jetbrains-mono-nerd-font
```

---

## 3. Git & GitHub CLI

### Installazione

```bash
brew install git gh
```

### Configurazione Git

```bash
# Configura identita
git config --global user.name "Il Tuo Nome"
git config --global user.email "tua@email.com"

# Editor default
git config --global core.editor "code --wait"

# Branch default
git config --global init.defaultBranch main

# Alias utili
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

### GitHub CLI Login

```bash
# Autenticazione con GitHub
gh auth login

# Verifica
gh auth status
```

### SSH Key (Opzionale)

```bash
# Genera chiave SSH
ssh-keygen -t ed25519 -C "tua@email.com"

# Avvia ssh-agent
eval "$(ssh-agent -s)"

# Aggiungi chiave
ssh-add ~/.ssh/id_ed25519

# Copia chiave pubblica
pbcopy < ~/.ssh/id_ed25519.pub

# Aggiungi su GitHub: Settings -> SSH Keys -> New
```

---

## 4. Node.js con fnm

**fnm** (Fast Node Manager) e il version manager consigliato per Node.js. Piu veloce di nvm.

### Installazione fnm

```bash
brew install fnm
```

### Configurazione Shell

```bash
# Aggiungi a ~/.zshrc
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### Installa Node.js

```bash
# Installa ultima LTS
fnm install --lts

# Imposta come default
fnm default lts-latest

# Verifica
node --version
npm --version
```

### Comandi fnm

```bash
# Lista versioni installate
fnm list

# Lista versioni disponibili
fnm list-remote

# Installa versione specifica
fnm install 20

# Usa versione specifica
fnm use 20

# Auto-switch con .node-version
echo "20" > .node-version
```

### Package Manager Globali

```bash
# pnpm (consigliato)
npm install -g pnpm

# yarn
npm install -g yarn
```

---

## 5. Python con pyenv + uv

### Installa pyenv

```bash
brew install pyenv
```

### Configurazione Shell

```bash
# Aggiungi a ~/.zshrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

### Installa Python

```bash
# Installa ultima versione stabile
pyenv install 3.12

# Imposta come globale
pyenv global 3.12

# Verifica
python --version
```

### Installa uv (Package Manager Veloce)

```bash
# Installa uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Oppure con brew
brew install uv
```

### Comandi uv Essenziali

```bash
# Crea nuovo progetto
uv init mio-progetto
cd mio-progetto

# Aggiungi dipendenze
uv add requests pandas

# Esegui script
uv run python main.py

# Crea virtual environment
uv venv

# Installa da requirements.txt
uv pip install -r requirements.txt
```

---

## 6. Editor & IDE

### Visual Studio Code

```bash
brew install --cask visual-studio-code

# Abilita comando 'code' nel PATH
# Cmd+Shift+P -> "Shell Command: Install 'code' command in PATH"
```

### Estensioni VS Code Essenziali

```bash
# Installa estensioni da CLI
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension github.copilot
```

### Altri Editor

```bash
# Cursor (VS Code + AI)
brew install --cask cursor

# JetBrains Toolbox
brew install --cask jetbrains-toolbox

# Sublime Text
brew install --cask sublime-text
```

---

## 7. Docker

### Docker Desktop

```bash
brew install --cask docker
```

> **Tip: Alternativa Leggera**
> Per un'alternativa piu leggera a Docker Desktop, considera **Colima**:
> ```bash
> brew install colima docker
> colima start
> ```

### Verifica Installazione

```bash
docker --version
docker run hello-world
```

---

## 8. Tools Extra

### CLI Utilities

```bash
# Tools essenziali
brew install \
  wget \
  curl \
  jq \
  yq \
  tree \
  htop \
  bat \
  eza \
  ripgrep \
  fzf \
  tldr
```

| Tool | Descrizione | Sostituisce |
|------|-------------|-------------|
| `bat` | cat con syntax highlighting | cat |
| `eza` | ls moderno con icone e git | ls |
| `ripgrep` | grep velocissimo | grep |
| `fzf` | fuzzy finder interattivo | - |
| `tldr` | man pages semplificati | man |

### Applicazioni GUI Utili

```bash
brew install --cask \
  raycast \
  rectangle \
  alt-tab \
  stats \
  hiddenbar
```

| App | Descrizione |
|-----|-------------|
| **Raycast** | Spotlight replacement con superpowers |
| **Rectangle** | Window manager con shortcuts |
| **Alt-Tab** | Windows-style alt-tab |
| **Stats** | System monitor nella menubar |
| **HiddenBar** | Nascondi icone menubar |

### Database Tools

```bash
# Client database
brew install --cask tableplus
brew install --cask dbeaver-community

# Database CLI
brew install postgresql
brew install mysql
brew install redis
```

---

## 9. Backup Dotfiles

Salva le tue configurazioni in un repo Git per ripristinarle facilmente.

### File da Salvare

```bash
# File di configurazione importanti
~/.zshrc
~/.gitconfig
~/.ssh/config
~/Brewfile
```

### Script di Backup

```bash
# Crea Brewfile con tutti i pacchetti
brew bundle dump --file=~/dotfiles/Brewfile --force

# Copia configurazioni
cp ~/.zshrc ~/dotfiles/
cp ~/.gitconfig ~/dotfiles/
```

### Esempio Brewfile

```bash
# ~/Brewfile
tap "homebrew/bundle"
tap "homebrew/cask-fonts"

# CLI Tools
brew "git"
brew "gh"
brew "fnm"
brew "pyenv"
brew "uv"
brew "jq"
brew "ripgrep"
brew "fzf"

# Apps
cask "visual-studio-code"
cask "iterm2"
cask "docker"
cask "raycast"
cask "rectangle"

# Fonts
cask "font-fira-code-nerd-font"
```

---

> **Quick Start - Tutto in Un Comando**
> Dopo aver installato Homebrew e creato un Brewfile, puoi ripristinare tutto con:
> ```bash
> brew bundle install --file=~/Brewfile
> ```
