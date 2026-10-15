# Frozen Blooded Community Hub

A free, mobile-first Telegram Mini App starter built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — complete frontend; no build step or package installation required.

## Run locally
Open `index.html` in a browser. Telegram-specific features activate when opened inside Telegram.

## Configure links
Near the bottom of `index.html`, find `const CONFIG = { ... }`.
- Put your bot username in `botUsername`, without the `@`.
- Replace each empty `links` value with a verified HTTPS link you control.
- Leave unconfirmed links empty. Empty links show a helpful notice rather than sending users somewhere unknown.

## Publish with GitHub Pages (free)
1. Create a new repository named `frozen-blooded-hub` under your GitHub account.
2. Upload `index.html` and this `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then save.
6. Wait for the Pages deployment to finish. The URL will be `https://YOUR-USERNAME.github.io/frozen-blooded-hub/`.

For a private source repository, check current GitHub Pages plan restrictions; use a public repository for the simplest free setup. Do not put bot tokens or other secrets in this frontend.

## Connect to Telegram
1. Open `@BotFather`.
2. Select your existing bot.
3. Use `/setmenubutton` and follow the prompts to set a menu button URL to the GitHub Pages URL.
4. Optionally configure the bot's Main Mini App in BotFather if that option is available for the bot.
5. Open the bot chat and tap the menu button.

The page loads Telegram's official Web App JavaScript SDK. It displays Telegram's first name/username when opened inside Telegram. This browser-side information is for display only.

## Security limits
- Never put the Telegram bot token in `index.html`.
- `initDataUnsafe` is used only for non-sensitive display personalization.
- Before adding balances, purchases, account permissions or private data, create a backend that validates Telegram `initData` cryptographically. Do not trust a user ID supplied by the browser.
- GitHub Pages is static hosting; it does not run a server-side database or bot code.
