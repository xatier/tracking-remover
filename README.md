# Tracking remover

Chrome extension for removing tracking such as `fbclid`.

## Installation

1. Clone the repo to wherever-you-like
2. Navigate to `chrome://extensions` on Chromium.
3. Load unpacked

## Technical details and limitations

- This plugin leverages the `chrome.tabs.onUpdated` API to inspect the URL.
- If `fbclid` is in the URL parameters, it immediately issues a redirection to the same URL *without* `fbclid` parameter.
- Since `chrome.tabs.onUpdated` is a non-blocking API, the browser may (or may not) fire the request already.
- Since `chrome.tabs.onUpdated` is monitoring on the callee URL, this extension requires the permission with `<all_url>`.

## Developement

- `chromium --auto-open-devtools-for-tabs` is really handy. :D
