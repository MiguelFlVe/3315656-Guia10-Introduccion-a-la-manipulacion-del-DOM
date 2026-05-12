# AGENTS.md

## Project Context

Educational SENA project for DOM manipulation learning. Vanilla HTML/CSS/JS only — no build tools, no package.json.

## Key Facts

- **Entry point**: Open `Client/index.html` directly in browser (no server needed)
- **Client folder**: Contains all frontend code (`index.html`, `script.js`, `styles.css`)
- **Server folder**: Currently empty placeholder
- **No npm**: README references `npm run dev` but no package.json exists — this is a template expecting future Vite/similar setup

## Working with Code

- JavaScript lives in `Client/script.js` — contains TODO implementations for DOM exercises
- Styles in `Client/styles.css`
- HTML structure uses BEM-like class naming (`block__element--modifier`)

## Git Workflow (Strict)

- Never commit directly to `main` or `develop`
- Create feature branches: `git checkout -b feat/nombre-tarea`
- Pull requests required; only Líder (Architect) can merge
- Branch protection enabled on main/develop

## Documentation

- Methodology guides: `docs/02-guia-metodologia/` (Gitflow, PR guidelines, commits)
- Issue/PR templates: `.github/` and `docs/03-formatos-maestros/`

## Known Issue

Fixed: `script.js` was rewritten to properly implement the task management system matching `index.html`.