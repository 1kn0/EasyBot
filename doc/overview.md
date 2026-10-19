# EasyBot Documentation

EasyBot is a browser IDE for creating Discord.js v14 bot projects. Write bot code in the editor, check JavaScript and JSON syntax, and build a downloadable `EasyBot.zip` project.

## Documentation by category

### Start here

- [Getting started](guides/getting-started.md) — create a bot application, configure a token, and run the generated project.
- [IDE features](ide/workspace.md) — files, editor tabs, templates, syntax checking, and project builds.

### Bot API

- [Bot API reference](api/bot.md) — every method exposed on the imported `bot` helper.
- [Event flows](api/event-flows.md) — message, member-join, and member-leave chains.
- [Slash commands](api/slash-commands.md) — command creation, typed options, Ready Kit actions, permissions, and replies.
- [Interactions and reactions](api/interactions.md) — buttons, menus, modals, generic interactions, and reactions.
- [Messages and Components V2](api/components.md) — embeds, buttons, select menus, and Components V2 cards.
- [Client and Discord.js exports](api/client-and-discord.md) — access to the client, Discord.js API namespaces, and UI builders.
- [Runtime internals](api/runtime-internals.md) — generated helper module functions and how event dispatch works.

### Guides

- [Configuration and intents](guides/configuration.md) — JSON settings, environment variables, and gateway intents.
- [Errors and logging](guides/errors-and-logging.md) — flow logs, error replies, and startup logging.
- [Ready Kits](readykit/Kits.md) — copy-ready moderation and information features.

## Generated project layout

Building the IDE workspace creates a Node.js ES-module project:

```text
EasyBot/
  .env.example
  package.json
  README.md
  bot.js                  Your workspace JavaScript files, with paths preserved
  settings.json           Your workspace configuration files
  src/
    index.js              Imports bot files and starts the client
    EasyBot.js            Public `bot` helper
    client.js             Discord.js client and default intents
    functions/flows.js    Event, interaction, slash-command, and reaction chains
    middleware/           Discord interaction and reaction dispatch
    utils/                Discord builders, Ready Kit actions, errors, and logging
```

The IDE intentionally excludes `.env` from the ZIP. Set `DISCORD_TOKEN` in a local `.env` file after extracting the project.
