# Git CLI Handoff

Use this when moving the repo from Windows to macOS through GitHub instead of
copying local build artifacts.

## First Push From Windows

```bash
npm ci
npm run git:hooks
npm run ci

git status --short
git branch -M main
git add .
git commit -m "chore: initialize voltservice web"
git push -u origin main
```

The repo already points at:

```bash
git@github.com:voltserviceltd/voltservice-web.git
```

## Clone On macOS

```bash
git clone git@github.com:voltserviceltd/voltservice-web.git
cd voltservice-web
npm ci
npm run git:hooks
npm run ci
```

## Daily Branch Flow

```bash
git checkout main
git pull --ff-only
git checkout -b feature/short-description

npm run ci
git add .
git commit -m "feat: describe the change"
git push -u origin feature/short-description
```

## Space Cleanup Notes

After the repository is pushed and verified on macOS, these local generated
folders can be removed from Windows without losing source history:

- `node_modules`
- `.next`
- `coverage`

They are intentionally ignored and can be recreated with `npm ci`,
`npm run dev`, `npm run build`, or `npm run test:coverage`.
