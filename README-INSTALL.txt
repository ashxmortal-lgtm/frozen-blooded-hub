FROZEN BLOODED MINI APP — JAVA SERVERLESS UPDATE

This ZIP is an overlay for the ashxmortal-lgtm/Java tgcloud project.

FILES
- web/index.html: Mini App UI. Home screen has exactly two buttons: Game Mode and Study Mode.
- tgcloud/endpoints/getProfile.js: authenticated endpoint for the current Telegram user's existing profile data.
- tgcloud.jsonc: serves the web/ folder as the Mini App front-end.

INSTALL
1. Back up ~/my_bot first.
2. Extract/merge the ZIP into the ROOT of ~/my_bot (same folder as package.json and tgcloud/). Do not extract inside tgcloud/.
3. If tgcloud.jsonc already exists locally, do NOT blindly overwrite it. Keep the existing config and merge in static.source="web" and spa=true.
4. Check npx tgcloud status and inspect the diff before deployment.
5. No schema change or database migration is included. Deploy code with your normal npx tgcloud push workflow.
6. Use the exact Mini App URL printed by tgcloud push (typically https://app<app_id>.tgcloud.ai/) in the bot's Mini App settings/BotFather.
7. Open the Mini App from the bot inside Telegram to use Telegram.WebApp.Serverless.call.

IMPORTANT
- This Mini App must be hosted by the SAME Telegram Serverless app as the Java bot. A separate GitHub Pages copy cannot access that app's Serverless endpoints.
- getProfile trusts ctx.initData.user supplied by Telegram Serverless and does not accept a browser-supplied user ID.
- No bot token or CLI secret is included.
- Bot commands cannot be silently sent by the web page. Command buttons open the bot chat or explain group-only use; the user sends the command.
- Study links are taken from the existing /hnc module.
- XOXO/RPS are linked as casual group games; this Mini App adds no coin-stake controls.
