---
layout: ../../../layouts/MarkdownLayout.astro
title: "Privacy Policy — CodeAgent CLI Launcher"
description: "Privacy policy for the CodeAgent CLI Launcher browser extension."
---

# Privacy Policy — CodeAgent CLI Launcher

_Last updated: 2026-04-18_

## Summary
CodeAgent CLI Launcher ("the extension") does **not** collect, transmit, sell, or share any user data. All configuration is stored locally on the user's device and never leaves the browser.

## Data the extension handles
The extension reads and/or stores the following data **only on the local device**:

| Data | Purpose | Storage |
|---|---|---|
| URL of the currently active tab | Parse GitHub owner/repo/issue/PR to build a launch command | In-memory, not persisted |
| Local repository base path (e.g. `~/repos`) | Build the `cd` portion of the generated command | `chrome.storage.local` |
| User-defined commands (name, prompt, page types) | Populate the command dropdown and export/import feature | `chrome.storage.local` |

The extension does **not** read page contents, cookies, credentials, or any information outside of the active tab's URL.

## Data transmission
The extension performs **no network requests**. Nothing is sent to the developer, to Google, or to any third party.

## Permissions justification
- `activeTab`: required to read the current tab's URL (only when the user clicks the extension icon) in order to detect a GitHub repo/issue/PR.
- `clipboardWrite`: required to copy the generated shell command to the clipboard on user action.
- `storage`: required to persist the user's base path and custom commands across sessions.

## Third-party services
None. The extension has no analytics, no remote configuration, no telemetry.

## Children's privacy
The extension does not knowingly collect data from anyone, including children under 13.

## Changes to this policy
If the data handling behavior ever changes, this document will be updated and the "Last updated" date revised.

## Contact
Questions or concerns: open an issue at the project's GitHub repository, or contact the developer via the email listed on the Chrome Web Store developer page.
