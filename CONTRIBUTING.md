# Contributing

Thanks for considering a contribution.

## Local development

```bash
git clone https://github.com/k-s-pavan-kumar/nextjs-dev-browser.git
cd nextjs-dev-browser
npm install
```

Test changes against a real Next.js project without publishing, using
either method:

**`npm link` (fastest, symlinked — good while iterating):**
```bash
npm link
cd ../some-nextjs-app
npm link nextjs-dev-browser
npx dev-browser init
```

**`npm pack` (closer to what actually gets published):**
```bash
npm pack
cd ../some-nextjs-app
npm install --save-dev ../nextjs-dev-browser/nextjs-dev-browser-*.tgz
npx dev-browser init
```

Always run `npm pack --dry-run` before opening a PR that changes
`package.json`'s `files` field or adds new source files, to confirm the
right files would actually ship.

## Before opening a PR

- `node --check` every changed `.js` file (no build step / bundler here
  by design — keep it dependency-light and directly runnable)
- Test the change against a real Next.js dev server, not just in
  isolation — the whole point of this tool is the integration
- Update `README.md` if you change CLI behavior or add a config option
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
  style commit messages where practical (`fix:`, `feat:`, `docs:`) — not
  strictly enforced, but it helps changelog generation

## Reporting bugs

Open a GitHub issue with:
- Your OS and Node version
- The exact command you ran
- What you expected vs. what happened
- Terminal output (redact any real URLs/tokens if they appear)

## Scope

This tool intentionally does one thing: an ephemeral, localhost-only dev
browser for Next.js. PRs that meaningfully expand scope (e.g. supporting
other frameworks, becoming a general browser-automation tool) are likely
better as a fork or a separate package — please open an issue to discuss
before investing time in a large PR.
