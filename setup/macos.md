# macOS Development Environment Setup

Context file for Claude Code to configure a complete macOS development environment.

## Prerequisites

- macOS 12 (Monterey) or later
- Admin access
- Internet connection

## 1. Homebrew (Package Manager)

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash
# Add Homebrew to PATH (Apple Silicon - M1/M2/M3)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

```bash
# Verify installation
brew --version
```

## 2. Essential CLI Tools

```bash
# Install core tools
brew install git gh curl wget jq yq tree htop
```

```bash
# Install modern CLI replacements
brew install bat eza ripgrep fzf tldr
```

## 3. Terminal Enhancement

```bash
# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```bash
# Install zsh plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

```bash
# Install Nerd Fonts
brew tap homebrew/cask-fonts
brew install --cask font-fira-code-nerd-font font-jetbrains-mono-nerd-font
```

### Configure ~/.zshrc

Add these lines to `~/.zshrc`:

```bash
# Plugins (find the plugins line and update it)
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)

# Aliases
alias cat="bat"
alias ls="eza --icons"
alias ll="eza -la --icons"
alias tree="eza --tree --icons"
```

## 4. Git Configuration

```bash
# Set identity (REPLACE with actual values)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

```bash
# Set defaults
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
```

```bash
# Useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

## 5. GitHub CLI

```bash
# Login to GitHub
gh auth login
```

```bash
# Verify
gh auth status
```

## 6. SSH Key (Optional)

```bash
# Generate SSH key (REPLACE email)
ssh-keygen -t ed25519 -C "your@email.com"
```

```bash
# Start ssh-agent and add key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

```bash
# Copy public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
# Then add to GitHub: Settings → SSH Keys → New
```

## 7. Node.js (via fnm)

```bash
# Install fnm
brew install fnm
```

```bash
# Add to ~/.zshrc
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
```

```bash
# Install latest LTS
fnm install --lts
fnm default lts-latest
```

```bash
# Verify
node --version
npm --version
```

```bash
# Install global packages
npm install -g pnpm yarn
```

## 8. Python (via pyenv + uv)

```bash
# Install pyenv
brew install pyenv
```

```bash
# Add to ~/.zshrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

```bash
# Install Python
pyenv install 3.12
pyenv global 3.12
```

```bash
# Install uv (fast package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```bash
# Verify
python --version
uv --version
```

## 9. Docker

```bash
# Install Docker Desktop
brew install --cask docker
```

```bash
# After opening Docker Desktop, verify
docker --version
docker run hello-world
```

## 10. VS Code

```bash
# Install VS Code
brew install --cask visual-studio-code
```

```bash
# Install essential extensions
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension github.copilot
```

## 11. Optional: Additional Apps

```bash
# Terminal
brew install --cask iterm2

# Window management
brew install --cask rectangle

# Spotlight replacement
brew install --cask raycast

# System monitor
brew install --cask stats

# Database client
brew install --cask tableplus
```

## 12. Verify Installation

Run these commands to verify everything is installed:

```bash
echo "=== Verification ===" && \
brew --version && \
git --version && \
gh --version && \
node --version && \
npm --version && \
python --version && \
uv --version && \
docker --version && \
code --version && \
echo "=== All OK ==="
```

## Post-Setup

1. Restart terminal to apply all changes
2. Open Docker Desktop and complete setup
3. Configure VS Code settings sync (if desired)
4. Import any dotfiles from backup

## Brewfile Export

To save your setup for future use:

```bash
brew bundle dump --file=~/Brewfile --force
```

To restore on a new machine:

```bash
brew bundle install --file=~/Brewfile
```
