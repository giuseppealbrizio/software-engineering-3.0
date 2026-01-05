---
title: "Windows Dev Environment Setup"
description: "Setup completo da zero: winget, Scoop, WSL2, Git, Node.js, Python, Docker e tools essenziali"
icon: "🪟"
tag: "Boilerplate"
date: 2026-01-05
---

## Panoramica

Guida completa per configurare un ambiente di sviluppo professionale su Windows.

## 1. Windows Terminal & PowerShell 7

```powershell
winget install Microsoft.WindowsTerminal
winget install Microsoft.PowerShell
```

## 2. Scoop (Package Manager)

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
scoop bucket add extras
```

## 3. CLI Tools

```powershell
scoop install git curl wget jq ripgrep fzf bat eza tldr
```

## 4. Terminal Enhancement

```powershell
winget install JanDeDobbeleer.OhMyPosh
scoop install nerd-fonts/FiraCode-NF
```

Aggiungi al `$PROFILE`:
```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\catppuccin.omp.json" | Invoke-Expression
Set-PSReadLineOption -PredictionSource History
```

## 5. WSL2

```powershell
wsl --install
# Riavvia, poi:
wsl --version
```

## 6. Git & GitHub

```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.autocrlf true

winget install GitHub.cli
gh auth login
```

## 7. Node.js (fnm)

```powershell
winget install Schniz.fnm
# Aggiungi al $PROFILE:
# fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression

fnm install --lts
fnm default lts-latest
npm install -g pnpm
```

## 8. Python (pyenv-win + uv)

```powershell
scoop install pyenv
pyenv install 3.12.0
pyenv global 3.12.0

# uv
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

## 9. Docker

```powershell
winget install Docker.DockerDesktop
# Abilita WSL2 backend nelle impostazioni
```

## 10. VS Code

```powershell
winget install Microsoft.VisualStudioCode

code --install-extension ms-python.python
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension github.copilot
```

## 11. Optional Apps

```powershell
winget install Microsoft.PowerToys
winget install voidtools.Everything
winget install TablePlus.TablePlus
```

## Verifica

```powershell
git --version; node --version; python --version; docker --version
```

---

Per la versione completa con tutti i comandi, vedi [setup/windows.md](/software-engineering-3.0/setup/windows.md)
