# AGENTS.md

Educational SENA project for DOM manipulation learning. Vanilla HTML/CSS/JS — no build tools.

## Entry Point

Open `Client/index.html` directly in browser (no server needed).

## Key Facts

- **Frontend**: `Client/` contains `index.html`, `script.js`, `styles.css`
- **Backend API**: Uses `http://10.5.225.181:3050/` (script.js:24)
- **Fallback**: Falls back to hardcoded users + localStorage if backend unavailable
- **No npm**: README references `npm run dev` but no package.json exists — template for future setup

## Code Structure

- JavaScript: `Client/script.js` — DOM manipulation for user search and task management
- Styles: `Client/styles.css`
- HTML: Uses BEM-like naming (`block__element--modifier`)

## Git Workflow

- Never commit directly to `main` or `develop`
- Feature branches: `git checkout -b feat/nombre-tarea`
- Only Líder can merge PRs to protected branches

## Documentation

- `docs/02-guia-metodologia/` — Gitflow, PR guidelines, conventional commits
- `docs/01-guia-sistema/` — Issue/Milestone creation guides
- `.github/` and `docs/03-formatos-maestros/` — Issue/PR templates