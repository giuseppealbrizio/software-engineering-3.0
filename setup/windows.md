# Windows Development Environment Setup

Context file for Claude Code to configure a complete Windows development environment.

## Prerequisites

- Windows 10 (build 19041+) or Windows 11
- Admin access
- Internet connection

## 1. Windows Terminal & PowerShell 7

```powershell
# Install Windows Terminal
winget install Microsoft.WindowsTerminal
```

```powershell
# Install PowerShell 7
winget install Microsoft.PowerShell
```

After installation, open Windows Terminal and set PowerShell 7 as default profile.

## 2. Scoop (Package Manager for CLI tools)

```powershell
# Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

```powershell
# Install Scoop
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

```powershell
# Add extras bucket
scoop bucket add extras
scoop bucket add nerd-fonts
```

## 3. Essential CLI Tools

```powershell
# Install via Scoop
scoop install git curl wget jq yq tree
```

```powershell
# Install modern CLI replacements
scoop install bat eza ripgrep fzf tldr
```

## 4. Terminal Enhancement (Oh My Posh)

```powershell
# Install Oh My Posh
winget install JanDeDobbeleer.OhMyPosh
```

```powershell
# Install Nerd Font
scoop install nerd-fonts/FiraCode-NF
```

### Configure PowerShell Profile

```powershell
# Create/open profile
notepad $PROFILE
```

Add these lines to the profile:

```powershell
# Oh My Posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\catppuccin.omp.json" | Invoke-Expression

# PSReadLine (better autocomplete)
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView

# Aliases
Set-Alias -Name cat -Value bat
Set-Alias -Name ls -Value eza
Set-Alias -Name g -Value git
Set-Alias -Name c -Value code

# Functions
function ll { eza -la --icons }
```

## 5. Git Configuration

```powershell
# Set identity (REPLACE with actual values)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

```powershell
# Set defaults
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
git config --global core.autocrlf true
```

```powershell
# Useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

## 6. GitHub CLI

```powershell
# Install
winget install GitHub.cli
```

```powershell
# Login
gh auth login
```

```powershell
# Verify
gh auth status
```

## 7. SSH Key (Optional)

```powershell
# Generate SSH key (REPLACE email)
ssh-keygen -t ed25519 -C "your@email.com"
```

```powershell
# Start ssh-agent service
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
```

```powershell
# Add key
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

```powershell
# Copy public key to clipboard
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
# Then add to GitHub: Settings → SSH Keys → New
```

## 8. WSL2 (Windows Subsystem for Linux)

```powershell
# Install WSL with Ubuntu
wsl --install
```

After restart:

```powershell
# Verify
wsl --version
```

```bash
# Inside WSL - Update packages
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl wget git unzip
```

## 9. Node.js (via fnm)

```powershell
# Install fnm
winget install Schniz.fnm
```

Add to PowerShell profile (`notepad $PROFILE`):

```powershell
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression
```

```powershell
# Restart PowerShell, then install Node
fnm install --lts
fnm default lts-latest
```

```powershell
# Verify
node --version
npm --version
```

```powershell
# Install global packages
npm install -g pnpm yarn
```

## 10. Python (via pyenv-win + uv)

```powershell
# Install pyenv-win
scoop install pyenv
```

```powershell
# Install Python
pyenv install 3.12.0
pyenv global 3.12.0
```

```powershell
# Install uv (fast package manager)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```powershell
# Verify
python --version
uv --version
```

## 11. Docker

```powershell
# Install Docker Desktop
winget install Docker.DockerDesktop
```

After installation:
1. Open Docker Desktop
2. Enable WSL 2 backend in Settings → General
3. Enable integration with your WSL distro in Settings → Resources → WSL Integration

```powershell
# Verify
docker --version
docker run hello-world
```

## 12. VS Code

```powershell
# Install VS Code
winget install Microsoft.VisualStudioCode
```

```powershell
# Install essential extensions
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension github.copilot
code --install-extension ms-vscode-remote.remote-wsl
```

## 13. Optional: Additional Apps

```powershell
# Utilities
winget install Microsoft.PowerToys
winget install voidtools.Everything
winget install 7zip.7zip

# Database client
winget install TablePlus.TablePlus

# Alternative editor
winget install Anysphere.Cursor
```

## 14. Optional: Cloud & DevOps

```powershell
# Google Cloud SDK
winget install Google.CloudSDK
```

```powershell
# Initialize gcloud (interactive)
gcloud init
```

```powershell
# Kubernetes CLI
winget install Kubernetes.kubectl
```

```powershell
# Kubernetes context manager (optional)
scoop install kubectx
```

```powershell
# API testing
winget install Postman.Postman
```

```powershell
# Tunneling for local development
winget install Ngrok.Ngrok
```

```powershell
# Configure ngrok (requires free account at ngrok.com)
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

```powershell
# MongoDB GUI
winget install MongoDB.Compass.Full
```

## 15. Verify Installation

```powershell
Write-Host "=== Verification ===" -ForegroundColor Green
git --version
gh --version
node --version
npm --version
python --version
uv --version
docker --version
code --version
Write-Host "=== All OK ===" -ForegroundColor Green
```

## Post-Setup

1. Restart Windows Terminal to apply all changes
2. Open Docker Desktop and complete setup
3. Configure Windows Terminal font to "FiraCode Nerd Font"
4. Configure VS Code settings sync (if desired)

## Export Package Lists

To save your setup for future use:

```powershell
# Export winget packages
winget export -o winget-packages.json

# Export Scoop packages
scoop export > scoop-packages.json
```

To restore on a new machine:

```powershell
winget import -i winget-packages.json
scoop import scoop-packages.json
```
