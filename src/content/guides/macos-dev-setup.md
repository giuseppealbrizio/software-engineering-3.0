---
title: "macOS Dev Environment Setup"
description: "Setup completo da zero: Homebrew, Git, Node.js, Python, Docker e tutti i tools essenziali"
icon: "🍎"
tag: "Boilerplate"
date: 2026-01-05
---

## Panoramica

Guida completa per configurare un ambiente di sviluppo professionale su macOS.

## 1. Homebrew

```bash
# Installa Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Aggiungi al PATH (Apple Silicon)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

## 2. CLI Tools Essenziali

```bash
brew install git gh curl wget jq yq tree htop
brew install bat eza ripgrep fzf tldr
```

## 3. Terminal Enhancement

```bash
# Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Fonts
brew tap homebrew/cask-fonts
brew install --cask font-fira-code-nerd-font
```

Aggiungi a `~/.zshrc`:
```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

## 4. Git & GitHub

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main

# GitHub CLI
gh auth login
```

## 5. Node.js (fnm)

```bash
brew install fnm
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc

fnm install --lts
fnm default lts-latest
npm install -g pnpm
```

## 6. Python (pyenv + uv)

```bash
brew install pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc

pyenv install 3.12
pyenv global 3.12

# uv package manager
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## 7. Docker

```bash
brew install --cask docker
```

## 8. VS Code

```bash
brew install --cask visual-studio-code

# Extensions
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension github.copilot
```

## 9. Optional Apps

```bash
brew install --cask iterm2 rectangle raycast stats tableplus
```

## Verifica

```bash
brew --version && git --version && node --version && python --version && docker --version
```

---

Per la versione completa con tutti i comandi, vedi [setup/macos.md](/software-engineering-3.0/setup/macos.md)
