/** A running ephemeral browser session. */
export interface BrowserHandle {
  /** Closes the browser and its context, discarding all session state. */
  close(): Promise<void>;
  /** Registers a callback fired when the browser window is closed
   * (by the user, or via `close()`). */
  onClose(fn: () => void): void;
}

/**
 * Launches an ephemeral, localhost-only Chromium window pointed at
 * `startUrl`. Throws if `startUrl` is not a localhost/127.0.0.1/::1 URL.
 * Downloads Chromium automatically on first use if it isn't already
 * present.
 */
export function launchLocalhostBrowser(startUrl: string): Promise<BrowserHandle>;

/** True if `urlString`'s hostname is localhost, 127.0.0.1, or ::1. */
export function isAllowed(urlString: string): boolean;
