// lib/install-browser.js
//
// Invoked via `dev-browser install`. Manually triggers the Chromium
// download. Not required in normal use — launchLocalhostBrowser()
// already downloads it lazily on first launch — but useful for CI
// warm-up, Docker image builds, or anyone who wants to pre-fetch it
// before the first `npm run dev`.

const { spawnSync } = require('child_process');

console.log('[dev-browser] Installing Chromium for Playwright...');
const result = spawnSync('npx', ['playwright', 'install', 'chromium'], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status || 0);
