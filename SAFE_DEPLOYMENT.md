# BROKEN MINI BOT — Safe deployment notes

## Security changes applied
- Removed the bundled SESSION_ID blob from config.js. Do not commit session credentials.
- Owner numbers are read from Railway variable OWNER_NUMBER (comma-separated, digits only).
- Bot branding changed to BROKEN MINI BOT.
- `.pair` no longer sends a phone number to a third-party pairing-code API.
- `.update` remote ZIP execution is disabled. Update only from your own trusted GitHub repository.
- `.restart` no longer executes shell commands. Restart from Railway dashboard.
- Calculator no longer uses `eval`.
- Removed local debug telemetry requests from Instagram scraper files.

## Railway variables
- `OWNER_NUMBER`: your own WhatsApp number, country code included, no `+`; e.g. `923001234567`.
- `OWNER_NAME`: display name for the owner.
- `SESSION_ID`: leave empty; never paste session data into GitHub.

## Important pairing note
This package's original `index.js` is obfuscated and uses a legacy session-import path. The safe patch removes its bundled session blob but does **not** claim that startup pairing-code flow has been fully reimplemented. Verify login flow before production use; do not share pairing codes, QR codes, or the `session/` folder. Use persistent storage for the session directory on Railway.

## Channel
The existing newsletter/channel JID in config.js has been retained as requested.
