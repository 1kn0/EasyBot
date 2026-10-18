# Configuration and intents

## Environment variables

The generated project reads the bot token from `DISCORD_TOKEN`. Keep it in `.env`:

```env
DISCORD_TOKEN=your_bot_token
```

The generated entry point loads environment variables before importing workspace files. `.env` is excluded from the project ZIP, while `.env.example` is included as a safe template.

## JSON configuration files

Create a JSON file in the workspace, for example `settings.json`:

```json
{
  "welcome": {
    "channelId": "CHANNEL_ID",
    "message": "Welcome to the server, {user}!"
  }
}
```

Import JSON from JavaScript using Node.js JSON module syntax:

```js
import config from './settings.json' with { type: 'json' };
import { bot } from 'EasyBot';

bot.onMemberJoin()
  .sendTo(config.welcome.channelId)
  .reply(config.welcome.message);
```

Use a relative path from the importing JavaScript file. The builder preserves workspace file paths in the generated project.

## Default gateway intents

The generated Discord.js client enables:

- `Guilds`
- `GuildMessages`
- `MessageContent`
- `GuildMembers`
- `GuildMessageReactions`
- `DirectMessages`

It also enables partials for channels, messages, reactions, and users. Privileged intents such as `MessageContent` and `GuildMembers` must also be enabled in the Discord Developer Portal. Add further intents before starting with `bot.useIntent(...)`.
