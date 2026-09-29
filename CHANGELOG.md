# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versioning follows [Semantic Versioning](https://semver.org/).

## [1.2.0] — Unreleased

### Changed
- **Removed the `postinstall` lifecycle script entirely.** Chromium now
  downloads lazily the first time a browser is actually launched
  (`dev-browser dev` or `dev-browser open`), instead of automatically on
  every `npm install`. This removes the package's only install-time
  script, which is what supply-chain scanners like Socket.dev flag as a
  risk regardless of what the script does. No user-facing change to the
  normal `npx nextjs-dev-browser init` → `npm run dev` flow — the
  download just happens a moment later, on first real use, instead of at
  install time.
- `init` no longer treats a project's *untouched* `"dev": "next dev"` as
  a customization. Previously, any pre-existing `dev` script — including
  the plain, never-modified Next.js default — was left alone, which
  meant `init` would add `dev:plain` and `browser` but silently skip
  wiring up the actual `dev` script, so `npm run dev` never opened the
  browser. Now, an exact `"next dev"` is recognized as safe to upgrade
  automatically; a genuinely customized script (`next dev --turbo`,
  a custom port, a monorepo command, etc.) is still left untouched as
  before.

### Added
- `dev-browser install` command: manually pre-download Chromium (e.g. for
  warming a Docker image or CI cache) as an alternative to the automatic
  lazy download.
- TypeScript type declarations (`lib/localhost-browser.d.ts`) and a
  `"types"` field in `package.json`.
- An automated test suite (`test/`, run via `npm test`, using Node's
  built-in test runner — no new dependency) covering the localhost
  allowlist logic. Wired into CI and the release workflow.

### Removed
- `scripts/postinstall.js` (superseded by the lazy-install logic in
  `lib/localhost-browser.js`).
- The `SKIP_PLAYWRIGHT_INSTALL` environment variable (no longer
  meaningful — there's no install-time download to skip anymore).

### Upgrade notes
If you ran `npx nextjs-dev-browser init` against `1.1.0` **on a project
that already had a plain `"dev": "next dev"` script**, that bug means
your `package.json` was left with `dev:plain` and `browser` wired up but
`dev` itself untouched — so `npm run dev` never opened the browser.
After upgrading to `1.2.0`, re-run:
```bash
npx nextjs-dev-browser@latest init
```
This will now correctly upgrade `dev` to `dev-browser dev`. It won't
touch anything else — safe to re-run any time.

## [1.1.0] — 2026-09-XX

### Added
- `init` command: one-shot setup that adds the package as a
  devDependency, runs `npm install`, and wires up `dev` / `dev:plain` /
  `browser` scripts — all from a single `npx nextjs-dev-browser init`.
- Detection (and optional `--remove-legacy` cleanup) of leftover
  hand-copied `scripts/*.js` files from the pre-package manual setup.

## [1.0.0] — 2026-09-XX

### Added
- Initial release: `dev-browser dev` (auto-opens an ephemeral,
  localhost-only Playwright browser alongside `next dev`) and
  `dev-browser open` (reopen without restarting the dev server).
- Terminal banner + best-effort native OS notification when the browser
  window closes.
- `postinstall` script to download Playwright's Chromium automatically
  (later removed in 1.2.0 — see above).
