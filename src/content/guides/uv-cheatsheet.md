---
title: "UV Cheatsheet"
description: "Riferimento rapido per uv: il package manager Python ultra-veloce scritto in Rust"
icon: "⚡"
tag: "Cheatsheet"
date: 2026-01-05
---

## Installazione

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Homebrew
brew install uv
```

## Gestione Progetti

```bash
# Crea nuovo progetto
uv init my-project
cd my-project

# Aggiungi dipendenza
uv add requests
uv add pandas numpy

# Aggiungi dev dependency
uv add --dev pytest black ruff

# Rimuovi dipendenza
uv remove requests

# Aggiorna dipendenze
uv lock --upgrade
```

## Virtual Environment

```bash
# Crea venv
uv venv

# Crea venv con Python specifico
uv venv --python 3.12

# Attiva venv
source .venv/bin/activate  # Unix
.venv\Scripts\activate     # Windows
```

## Esecuzione

```bash
# Esegui script (crea venv se necessario)
uv run python main.py

# Esegui comando nel venv
uv run pytest
uv run black .
```

## pip Compatibility

```bash
# Installa da requirements.txt
uv pip install -r requirements.txt

# Installa pacchetto
uv pip install requests

# Lista pacchetti installati
uv pip list

# Freeze requirements
uv pip freeze > requirements.txt
```

## Python Versions

```bash
# Installa Python
uv python install 3.12

# Lista Python disponibili
uv python list

# Usa Python specifico
uv venv --python 3.11
```

## Sync & Lock

```bash
# Sincronizza dipendenze
uv sync

# Solo dev deps
uv sync --dev

# Genera lockfile
uv lock
```

## pyproject.toml

```toml
[project]
name = "my-project"
version = "0.1.0"
dependencies = [
    "requests>=2.28",
    "pandas>=2.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "black>=23.0",
]

[tool.uv]
dev-dependencies = [
    "ruff>=0.1",
]
```

## Performance

uv è **10-100x più veloce** di pip:

| Operazione | pip | uv |
|------------|-----|-----|
| Install Django | 8s | 0.3s |
| Fresh venv + deps | 30s | 2s |
| Lock resolution | 10s | 0.5s |

## Tips

```bash
# Cache globale (risparmia spazio)
uv cache clean

# Verbose output
uv add requests -v

# Offline mode
uv sync --offline
```
