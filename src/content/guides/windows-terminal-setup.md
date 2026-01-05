---
title: "Windows Terminal Setup"
description: "Configurazione completa di Windows Terminal: temi, font, profili e personalizzazioni"
icon: "💻"
tag: "Tutorial"
date: 2026-01-05
---

Guida per configurare PowerShell 7 con autocompletamento, Oh My Posh e icone

## 1. Installa PowerShell 7

Apri il terminale e lancia:

```powershell
winget install Microsoft.PowerShell
```

Chiudi e riapri Windows Terminal. Ora vedrai "PowerShell" come nuovo profilo.

## 2. Abilita esecuzione script

Apri PowerShell 7 **come amministratore** ed esegui:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Conferma con `Y` quando richiesto.

## 3. Installa Oh My Posh

```powershell
winget install JanDeDobbeleer.OhMyPosh
```

Testa che funzioni:

```powershell
oh-my-posh init pwsh | Invoke-Expression
```

## 4. Installa un Nerd Font

Necessario per visualizzare le icone nel prompt:

```powershell
oh-my-posh font install
```

Scegli **CaskaydiaCove** o **FiraCode**.

> **Configurazione Font**
> Vai in Windows Terminal -> Settings -> Profiles -> Defaults -> Appearance -> Font face e seleziona il font installato (es. "CaskaydiaCove Nerd Font").

## 5. Installa Terminal-Icons

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery -Force
```

## 6. Crea il file $PROFILE

Questo file viene eseguito ad ogni avvio di PowerShell:

```powershell
New-Item -Path $PROFILE -Type File -Force
notepad $PROFILE
```

### Contenuto del $PROFILE

```powershell
# Oh My Posh
oh-my-posh init pwsh | Invoke-Expression

# PSReadLine - Autocompletamento
Set-PSReadLineOption -PredictionSource HistoryAndPlugin
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# Terminal Icons
Import-Module Terminal-Icons
```

Copia questo contenuto nel file e salva.

## 7. Imposta PowerShell 7 come default

**In Windows Terminal:**

Settings -> Startup -> Default profile -> seleziona "PowerShell"

**In VS Code:**

Apri settings.json e aggiungi:

```json
{
    "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

## 8. Riavvia e verifica

Chiudi tutto e riapri Windows Terminal. Verifica con:

```powershell
# Versione PowerShell (deve essere 7.x)
$PSVersionTable.PSVersion

# Versione PSReadLine (deve essere 2.2+)
Get-Module PSReadLine
```

> **Troubleshooting**
> Se PSReadLine non supporta `-PredictionSource`, aggiornalo manualmente:
> ```powershell
> Install-Module PSReadLine -Force -SkipPublisherCheck
> ```

---

*Setup testato su Windows 11 con PowerShell 7*
