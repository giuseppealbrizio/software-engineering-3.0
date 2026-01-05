---
title: "Windows Terminal Setup"
description: "Configurazione completa di Windows Terminal: temi, font, profili e personalizzazioni"
icon: "💻"
tag: "Tutorial"
date: 2026-01-05
---

## Installazione

```powershell
winget install Microsoft.WindowsTerminal
```

## Configurazione Base

Apri Settings (Ctrl+,) o modifica `settings.json`.

### Default Profile

```json
{
    "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
}
```

### Font (Nerd Font consigliato)

```powershell
# Installa font
scoop bucket add nerd-fonts
scoop install nerd-fonts/FiraCode-NF
```

```json
{
    "profiles": {
        "defaults": {
            "font": {
                "face": "FiraCode Nerd Font",
                "size": 12
            }
        }
    }
}
```

## Temi

### Dark Theme (GitHub Dark)

```json
{
    "schemes": [
        {
            "name": "GitHub Dark",
            "background": "#0d1117",
            "foreground": "#c9d1d9",
            "black": "#484f58",
            "red": "#ff7b72",
            "green": "#3fb950",
            "yellow": "#d29922",
            "blue": "#58a6ff",
            "purple": "#bc8cff",
            "cyan": "#39c5cf",
            "white": "#b1bac4"
        }
    ]
}
```

### Applica tema

```json
{
    "profiles": {
        "defaults": {
            "colorScheme": "GitHub Dark"
        }
    }
}
```

## Profili

### PowerShell 7

```json
{
    "profiles": {
        "list": [
            {
                "name": "PowerShell",
                "source": "Windows.Terminal.PowershellCore",
                "colorScheme": "GitHub Dark",
                "font": {
                    "face": "FiraCode Nerd Font"
                }
            }
        ]
    }
}
```

### Git Bash

```json
{
    "name": "Git Bash",
    "commandline": "C:\\Program Files\\Git\\bin\\bash.exe",
    "icon": "C:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico",
    "startingDirectory": "%USERPROFILE%"
}
```

### WSL

```json
{
    "name": "Ubuntu",
    "source": "Windows.Terminal.Wsl"
}
```

## Shortcuts

| Shortcut | Azione |
|----------|--------|
| Ctrl+Shift+T | Nuova tab |
| Ctrl+Shift+W | Chiudi tab |
| Ctrl+Tab | Tab successiva |
| Alt+Shift+D | Split pane |
| Ctrl+Shift+P | Command palette |

## Oh My Posh

```powershell
winget install JanDeDobbeleer.OhMyPosh
```

Aggiungi al `$PROFILE`:
```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\catppuccin.omp.json" | Invoke-Expression
```

## Tips

### Background Image
```json
{
    "backgroundImage": "C:\\path\\to\\image.png",
    "backgroundImageOpacity": 0.1
}
```

### Acrylic Effect
```json
{
    "useAcrylic": true,
    "acrylicOpacity": 0.8
}
```

### Tab Title
```json
{
    "tabTitle": "My Terminal"
}
```
