# Getting started

## Requirements

- Node.js 20.18.0 or newer.
- A Discord application and bot created in the [Discord Developer Portal](https://discord.com/developers/applications).

## Create and configure a bot

1. Create an application in the Developer Portal and add a bot user.
2. Copy the bot token into the workspace `.env` file:

   ```env
   DISCORD_TOKEN=your_bot_token
   ```

3. Enable the privileged intents that your bot needs under **Bot → Privileged Gateway Intents**. Message commands need **Message Content Intent**; member join events need **Server Members Intent**.
4. Invite the bot to your server with the permissions required by its features.

Keep the token private. Do not commit `.env` or paste its contents into public code or messages.

## Write a first message flow

```js
import { bot } from 'EasyBot';

bot.onMessage()
  .command('!hello', 'Say hello')
  .reply('Hello!');
```

The message content intent must be enabled in Discord for prefix matching to read message text.

## Build and run the project

1. Use **Check** in the IDE to validate JavaScript and JSON syntax.
2. Choose **Build project** and save `EasyBot.zip`.
3. Extract the ZIP, copy `.env.example` to `.env`, and add the bot token.
4. In the extracted project directory, run:

   ```powershell
   npm install
   npm start
   ```

The generated project starts from `src/index.js`, which imports workspace JavaScript files and then calls `bot.start()`. A static production website only edits and builds projects; running a Discord bot requires a Node.js process on your machine or a Node.js host.
