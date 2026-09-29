# v1.2.0

## Highlights

- **Security: removed the `postinstall` lifecycle script.** Chromium now
  downloads lazily on first actual use (`dev-browser dev`/`open`)
  instead of automatically on every `npm install`. This was flagged by
  Socket.dev as a supply-chain risk (any install-time script is, by
  nature, arbitrary code that runs the moment the package is added) —
  it's gone now, with no loss of functionality. A new `dev-browser
  install` command is available if you'd rather pre-download it
  manually.
- **Fixed:** `init` now correctly upgrades a plain, untouched
  `"dev": "next dev"` script. Previously it mistook that default for a
  deliberate customization and left it alone, so `npm run dev` silently
  never opened the browser for projects that hadn't customized their
  `dev` script. Genuinely customized scripts (`--turbo`, custom ports,
  etc.) are still correctly left untouched.
- Added TypeScript type declarations and an automated test suite.

## Upgrading from 1.1.x

If `npm run dev` hasn't been opening the browser for you, this release
fixes it — just re-run:
```bash
npx nextjs-dev-browser@latest init
```

Full details: see [CHANGELOG.md](./CHANGELOG.md).

**Full diff:** https://github.com/k-s-pavan-kumar/nextjs-dev-browser/compare/v1.1.0...v1.2.0
