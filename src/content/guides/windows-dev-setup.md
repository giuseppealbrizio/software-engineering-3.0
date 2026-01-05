---
title: "Windows Dev Environment Setup"
description: "Setup completo da zero: winget, Scoop, WSL2, Git, Node.js, Python, Docker e tools essenziali"
icon: "🪟"
tag: "Boilerplate"
date: 2026-01-05
---

## Indice

1. [Windows Terminal & PowerShell](#1-windows-terminal--powershell)
2. [Package Managers (winget, Scoop, Chocolatey)](#2-package-managers)
3. [WSL2 (Windows Subsystem for Linux)](#3-wsl2-windows-subsystem-for-linux)
4. [Git & GitHub CLI](#4-git--github-cli)
5. [Node.js (fnm)](#5-nodejs-con-fnm)
6. [Python (pyenv-win + uv)](#6-python-con-pyenv-win--uv)
7. [Editor & IDE](#7-editor--ide)
8. [Docker](#8-docker)
9. [Tools Extra](#9-tools-extra)

---

## 1. Windows Terminal & PowerShell

### Installa Windows Terminal

Windows Terminal e il terminale moderno di Microsoft. Installalo dal Microsoft Store o via winget:

```powershell
# PowerShell (Admin)
winget install Microsoft.WindowsTerminal
```

### Aggiorna PowerShell

```powershell
# PowerShell (Admin)
winget install Microsoft.PowerShell
```

> **PowerShell 5 vs 7**: Windows include PowerShell 5.1 di default. PowerShell 7 e la versione moderna, cross-platform e con piu features. Usala!

### Oh My Posh (Prompt Moderno)

```powershell
# Installa Oh My Posh
winget install JanDeDobbeleer.OhMyPosh

# Installa font Nerd Font
oh-my-posh font install FiraCode

# Crea/modifica profilo PowerShell
notepad $PROFILE
```

### Configura $PROFILE

```powershell
# Aggiungi al file $PROFILE
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\catppuccin.omp.json" | Invoke-Expression

# Alias utili
Set-Alias -Name g -Value git
Set-Alias -Name c -Value code
Set-Alias -Name ll -Value Get-ChildItem
```

### PSReadLine (Autocompletamento)

```powershell
# Installa PSReadLine
Install-Module PSReadLine -Force

# Aggiungi al $PROFILE
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
```

---

## 2. Package Managers

Windows ha tre principali package manager. Ecco quando usare ciascuno:

| Manager | Pro | Quando Usarlo |
|---------|-----|---------------|
| **winget** | Integrato, ufficiale Microsoft | App GUI, software mainstream |
| **Scoop** | Portable, no admin, CLI-focused | Dev tools, utilities CLI |
| **Chocolatey** | Piu pacchetti, maturo | Software legacy, enterprise |

### winget (Pre-installato)

```powershell
# Cerca pacchetto
winget search vscode

# Installa pacchetto
winget install Microsoft.VisualStudioCode

# Aggiorna tutto
winget upgrade --all

# Esporta lista app installate
winget export -o packages.json
```

### Scoop (Consigliato per Dev Tools)

```powershell
# Installa Scoop
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

# Aggiungi bucket extras
scoop bucket add extras
scoop bucket add nerd-fonts

# Installa pacchetti
scoop install git curl wget jq ripgrep fzf

# Installa font
scoop install nerd-fonts/FiraCode-NF
```

### Chocolatey

```powershell
# PowerShell (Admin)
# Installa Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Installa pacchetti
choco install nodejs python vscode -y
```

---

## 3. WSL2 (Windows Subsystem for Linux)

WSL2 ti permette di eseguire Linux nativamente su Windows. Essenziale per sviluppo web moderno.

### Installazione

```powershell
# PowerShell (Admin)
# Installa WSL con Ubuntu (default)
wsl --install

# Riavvia il PC

# Verifica versione
wsl --version

# Lista distro disponibili
wsl --list --online

# Installa distro specifica
wsl --install -d Ubuntu-24.04
```

### Configurazione WSL

```powershell
# WSL/Ubuntu
# Aggiorna pacchetti
sudo apt update && sudo apt upgrade -y

# Installa tools essenziali
sudo apt install -y build-essential curl wget git unzip
```

> **Tip: Integrazione VS Code** - Installa l'estensione "WSL" in VS Code per editare file Linux direttamente. Usa `code .` da WSL per aprire VS Code.

### Accedi ai File

```powershell
# Da Windows, accedi ai file WSL:
\\wsl$\Ubuntu\home\tuouser

# Da WSL, accedi ai file Windows:
/mnt/c/Users/TuoUser
```

---

## 4. Git & GitHub CLI

### Installazione

**Con winget:**
```powershell
winget install Git.Git
winget install GitHub.cli
```

**Con Scoop:**
```powershell
scoop install git gh
```

### Configurazione Git

```powershell
# Configura identita
git config --global user.name "Il Tuo Nome"
git config --global user.email "tua@email.com"

# Editor default
git config --global core.editor "code --wait"

# Branch default
git config --global init.defaultBranch main

# Line endings (importante su Windows!)
git config --global core.autocrlf true

# Alias utili
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

### GitHub CLI Login

```powershell
gh auth login
gh auth status
```

### SSH Key

```powershell
# Genera chiave SSH
ssh-keygen -t ed25519 -C "tua@email.com"

# Avvia ssh-agent
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent

# Aggiungi chiave
ssh-add $env:USERPROFILE\.ssh\id_ed25519

# Copia chiave pubblica
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard

# Aggiungi su GitHub: Settings -> SSH Keys -> New
```

---

## 5. Node.js con fnm

### Installazione fnm

**Con winget:**
```powershell
winget install Schniz.fnm
```

**Con Scoop:**
```powershell
scoop install fnm
```

### Configurazione Shell

```powershell
# Aggiungi al $PROFILE
notepad $PROFILE

# Inserisci questa riga:
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression
```

### Installa Node.js

```powershell
# Installa ultima LTS
fnm install --lts

# Imposta come default
fnm default lts-latest

# Verifica
node --version
npm --version
```

### Comandi fnm

```powershell
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

```powershell
# pnpm (consigliato)
npm install -g pnpm

# yarn
npm install -g yarn
```

---

## 6. Python con pyenv-win + uv

### Installa pyenv-win

```powershell
# Con Scoop (consigliato)
scoop install pyenv

# Oppure manualmente
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
```

### Configura Environment Variables

```powershell
# PowerShell (Admin)
# Aggiungi al PATH di sistema
[Environment]::SetEnvironmentVariable("PYENV", "$env:USERPROFILE\.pyenv\pyenv-win", "User")
[Environment]::SetEnvironmentVariable("PATH", "$env:USERPROFILE\.pyenv\pyenv-win\bin;$env:USERPROFILE\.pyenv\pyenv-win\shims;$env:PATH", "User")

# Riavvia PowerShell
```

### Installa Python

```powershell
# Lista versioni disponibili
pyenv install --list

# Installa versione
pyenv install 3.12.0

# Imposta come globale
pyenv global 3.12.0

# Verifica
python --version
```

### Installa uv (Package Manager Veloce)

```powershell
# Con Scoop
scoop install uv

# Oppure con installer ufficiale
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Comandi uv Essenziali

```powershell
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

## 7. Editor & IDE

### Visual Studio Code

```powershell
winget install Microsoft.VisualStudioCode
```

### Estensioni VS Code Essenziali

```powershell
# Installa estensioni da CLI
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension github.copilot
code --install-extension ms-vscode-remote.remote-wsl
```

### Altri Editor

```powershell
# Cursor (VS Code + AI)
winget install Anysphere.Cursor

# JetBrains Toolbox
winget install JetBrains.Toolbox

# Sublime Text
winget install SublimeHQ.SublimeText.4
```

---

## 8. Docker

### Docker Desktop

```powershell
winget install Docker.DockerDesktop
```

> **Requisiti:**
> - Windows 10/11 Pro, Enterprise o Education per Hyper-V
> - Su Windows Home, Docker usa WSL2 backend
> - Virtualizzazione abilitata nel BIOS

### Configura Docker con WSL2

1. Apri Docker Desktop Settings
2. General -> "Use the WSL 2 based engine" (attivo)
3. Resources -> WSL Integration -> Abilita per la tua distro

### Verifica

```powershell
docker --version
docker run hello-world
```

---

## 9. Tools Extra

### CLI Utilities (via Scoop)

```powershell
scoop install `
  curl `
  wget `
  jq `
  yq `
  tree `
  bat `
  eza `
  ripgrep `
  fzf `
  tldr
```

| Tool | Descrizione | Sostituisce |
|------|-------------|-------------|
| `bat` | cat con syntax highlighting | type/cat |
| `eza` | ls moderno con icone e git | dir/ls |
| `ripgrep` | grep velocissimo | findstr/grep |
| `fzf` | fuzzy finder interattivo | - |
| `tldr` | man pages semplificati | help |

### Applicazioni GUI Utili

```powershell
winget install `
  Microsoft.PowerToys `
  voidtools.Everything `
  Notepad++.Notepad++ `
  7zip.7zip
```

| App | Descrizione |
|-----|-------------|
| **PowerToys** | Utilities Microsoft (FancyZones, PowerRename, etc.) |
| **Everything** | Ricerca file istantanea |
| **Notepad++** | Editor di testo avanzato |

### Database Tools

```powershell
# Client database
winget install TablePlus.TablePlus
winget install dbeaver.dbeaver

# Database locali (via Docker consigliato)
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
docker run -d --name redis -p 6379:6379 redis
```

---

## Quick Export/Import Setup

```powershell
# Esporta lista app winget
winget export -o winget-packages.json

# Esporta lista app Scoop
scoop export > scoop-packages.json

# Importa su nuovo PC
winget import -i winget-packages.json
scoop import scoop-packages.json
```
