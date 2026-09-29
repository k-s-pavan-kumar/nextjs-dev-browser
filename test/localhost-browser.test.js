// test/localhost-browser.test.js
//
// Uses Node's built-in test runner (node:test) so there's no extra
// devDependency just to run tests. Run with `npm test`.

const test = require('node:test');
const assert = require('node:assert/strict');
const { isAllowed, launchLocalhostBrowser } = require('../lib/localhost-browser');

test('isAllowed: accepts localhost URLs', () => {
  assert.equal(isAllowed('http://localhost:3000'), true);
  assert.equal(isAllowed('http://localhost:3000/some/path?x=1'), true);
});

test('isAllowed: accepts 127.0.0.1 and ::1', () => {
  assert.equal(isAllowed('http://127.0.0.1:8080'), true);
  assert.equal(isAllowed('http://[::1]:3000'), true);
});

test('isAllowed: rejects external hosts', () => {
  assert.equal(isAllowed('https://example.com'), false);
  assert.equal(isAllowed('https://evil.com/localhost'), false);
  assert.equal(isAllowed('https://localhost.evil.com'), false);
});

test('isAllowed: rejects malformed URLs without throwing', () => {
  assert.equal(isAllowed('not a url'), false);
  assert.equal(isAllowed(''), false);
});

test('launchLocalhostBrowser: rejects a non-localhost start URL before launching anything', async () => {
  await assert.rejects(
    () => launchLocalhostBrowser('https://example.com'),
    /is not a localhost URL/
  );
});
