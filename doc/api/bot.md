# Bot API reference

Import the helper in generated bot files:

```js
import { bot } from 'EasyBot';
```

The package also exposes named exports `client` and `log`. Most projects only need `bot`.

## Event and command registration

| Method | Purpose |
| --- | --- |
| `bot.onMessage()` | Start a guild message flow. See [Event flows](event-flows.md). |
| `bot.onMemberJoin()` | Start a guild member-join flow. See [Event flows](event-flows.md). |
| `bot.slashCommand(name, description)` | Create and register a slash command. See [Slash commands](slash-commands.md). |
| `bot.registerSlashCommand(definition, handler)` | Register a native `SlashCommandBuilder` and a handler. Returns `bot`. |
| `bot.onButton(customId)` | Handle a button interaction with the matching custom ID. |
| `bot.onSelectMenu(customId)` | Handle a supported select-menu interaction with the matching custom ID. |
| `bot.onModal(customId)` | Handle a modal submission with the matching custom ID. |
| `bot.onReaction(emoji)` | Handle a reaction add. See [Interactions and reactions](interactions.md). |
| `bot.onInteraction(handler)` | Register a raw listener for every Discord interaction. Returns `bot`. |
| `bot.onReady(handler)` | Register a one-time callback after the client is ready. Returns `bot`. |

## Building messages

| Method | Purpose |
| --- | --- |
| `bot.embed(titleOrData, description)` | Create a Discord `EmbedBuilder`, or pass an existing builder/data object. |
| `bot.button(customId, label, style)` | Create a custom-ID `ButtonBuilder`; style defaults to `Primary`. |
| `bot.actionRow(...components)` | Create an action row from Discord component builders. |
| `bot.stringSelectMenu(customId, choices, placeholder)` | Build a string select menu. `choices` defaults to `[]`. |
| `bot.userSelectMenu(customId)` | Build a user select menu. |
| `bot.roleSelectMenu(customId)` | Build a role select menu. |
| `bot.channelSelectMenu(customId, channelTypes)` | Build a channel select menu; optional channel types restrict choices. |
| `bot.mentionableSelectMenu(customId)` | Build a mentionable select menu. |
| `bot.componentsV2(...components)` | Convert an object, string, or Discord component builders into a Components V2 payload. |

See [Messages and Components V2](components.md) for object options and examples.

## Fetching Discord data

| Method | Result |
| --- | --- |
| `bot.fetchUser(userId)` | Fetch a user from the client user manager. |
| `bot.fetchGuild(guildId)` | Fetch a guild from the client guild manager. |
| `bot.fetchChannel(channelId)` | Fetch a channel from the client channel manager. |
| `bot.fetchMember(guildId, userId)` | Fetch the guild, then fetch a member from it. |
| `bot.fetchMessage(channelId, messageId)` | Fetch a text-based channel message. |
| `bot.reactToMessage(channelId, messageId, emoji)` | Fetch a message and react to it. |

These methods return promises; use `await` inside an async callback or handle the promise.

## Client configuration and startup

| Property or method | Purpose |
| --- | --- |
| `bot.useIntent(...intents)` | Add Discord.js gateway intent bit flags before starting. Returns `bot`. |
| `bot.setActivity(name, type)` | Set bot activity after ready. Type defaults to `Watching`; returns `bot`. |
| `bot.client` | Access the underlying Discord.js `Client`. |
| `bot.api` | Access the selected Discord.js API constants and REST helpers. |
| `bot.ui` | Access Discord.js UI/component builders and related constants. |
| `bot.log(...values)` | Format and write a message to standard output. |
| `await bot.start()` | Log in using `DISCORD_TOKEN`, log readiness, and register configured slash commands globally. |

See [Client and Discord.js exports](client-and-discord.md) for exposed namespace members.

Methods that configure the client or register callbacks return `bot` where noted, so setup calls can be chained. Event and command methods return flow-specific chains; their methods are documented in the linked references above.
