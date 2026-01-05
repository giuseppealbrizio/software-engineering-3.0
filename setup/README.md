# Setup Files for Claude Code

This folder contains context files designed to be read by **Claude Code** (or similar AI coding assistants) to automatically configure a development environment.

## What's Inside

| File | Description |
|------|-------------|
| [macos.md](macos.md) | Complete macOS dev environment setup |
| [windows.md](windows.md) | Complete Windows dev environment setup |

## How to Use

### With Claude Code

1. Open this repository in your terminal
2. Start Claude Code: `claude`
3. Ask Claude to read the appropriate setup file and execute the commands:

```
Read setup/macos.md and help me configure my development environment.
Execute the commands step by step, asking for confirmation when needed.
```

Or for Windows:
```
Read setup/windows.md and configure my Windows dev environment.
```

### What Gets Installed

Both setup files will configure:

- **Package Manager** - Homebrew (macOS) / winget + Scoop (Windows)
- **Terminal** - Oh My Zsh / Oh My Posh + Windows Terminal
- **Git & GitHub CLI** - With SSH key setup
- **Node.js** - Via fnm (Fast Node Manager)
- **Python** - Via pyenv + uv package manager
- **Docker** - Docker Desktop
- **VS Code** - With essential extensions
- **CLI Tools** - bat, eza, ripgrep, fzf, jq, etc.

## Customization

Feel free to fork this repo and modify the setup files to match your preferred tools and configurations.

### Adding Your Own Tools

Edit the appropriate `.md` file and add commands in the relevant section. Keep the format consistent so Claude Code can parse and execute them correctly.

## Related Documentation

For detailed explanations and manual installation steps, see the guides:

- [macOS Dev Environment Setup](../guides/macos-dev-setup.html)
- [Windows Dev Environment Setup](../guides/windows-dev-setup.html)

## Notes

- These files are optimized for AI assistants to read and execute
- Commands are grouped logically and can be run in sequence
- Some commands require user input (credentials, choices)
- Always review commands before execution in production environments
