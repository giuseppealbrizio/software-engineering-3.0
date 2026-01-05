---
title: "Installazione Claude Code su Windows"
description: "Setup completo di Claude Code su Windows con fnm/nvm, PowerShell e troubleshooting"
icon: "🪟"
tag: "Tutorial"
date: 2026-01-05
---

## Prerequisiti

- Windows 10/11
- Node.js 18+
- Account Anthropic con API key

## 1. Installa Node.js

### Opzione A: fnm (consigliato)

```powershell
# Installa fnm
winget install Schniz.fnm

# Configura PowerShell profile
notepad $PROFILE
# Aggiungi:
# fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression

# Riavvia PowerShell, poi:
fnm install --lts
fnm default lts-latest
```

### Opzione B: nvm-windows

```powershell
winget install CoreyButler.NVMforWindows
# Riavvia PowerShell
nvm install lts
nvm use lts
```

## 2. Installa Claude Code

```powershell
npm install -g @anthropic-ai/claude-code
```

## 3. Configura API Key

```powershell
# Temporanea (sessione corrente)
$env:ANTHROPIC_API_KEY = "sk-ant-..."

# Persistente (utente)
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-...", "User")
# Riavvia PowerShell
```

## 4. Verifica Installazione

```powershell
claude --version
claude --help
```

## 5. Primo Utilizzo

```powershell
cd C:\path\to\your\project
claude
```

## Troubleshooting

### "claude: command not found"
```powershell
# Verifica PATH npm
npm config get prefix
# Dovrebbe essere in PATH automaticamente
```

### Execution Policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### API Key non riconosciuta
```powershell
# Verifica
$env:ANTHROPIC_API_KEY
# O verifica nelle env vars di sistema
```

## Tips

- Usa Windows Terminal per esperienza migliore
- WSL2 + Claude Code funziona benissimo
- Per progetti cross-platform, usa Git Bash o WSL
