# Runtime internals

This page documents functions shared between generated runtime modules. They are implementation details, not part of the normal `import { bot } from 'EasyBot'` interface. Prefer the public methods in [Bot API reference](bot.md).

## `src/functions/flows.js`

### Exported registries

- `slashDefinitions` — map of slash command names to `SlashCommandBuilder` definitions.
- `slashHandlers` — map of slash command names to handler options.
- `componentHandlers` — map keyed by `<component type>:<custom ID>` for button, select, and modal flows.
- `reactionHandlers` — reaction handlers registered through `bot.onReaction(...)`.

### Event and interaction functions

- `flow(eventType)` — creates the message or member-join fluent chain used by `bot.onMessage()` and `bot.onMemberJoin()`.
- `slashCommand(name, description)` — creates a slash-command definition and fluent chain.
- `interactionFlow(type, id)` — creates a component-interaction chain for a custom ID.
- `dispatchInteraction(interaction)` — routes chat-input commands and supported component interactions to registered handlers.
- `dispatchReaction(reaction, user)` — ignores bot users, fetches partial data, filters by emoji, then executes registered reaction handlers.

The chain methods and behavior are documented in [Event flows](event-flows.md), [Slash commands](slash-commands.md), and [Interactions and reactions](interactions.md).

## `src/utils/discord.js`

- `roleMatches(member, roleId)` — checks the member role cache (or an array-shaped role list) for the role ID.
- `interactionReply(interaction, value)` — ignores `null` and `undefined`; sends strings as content and uses `followUp` when an interaction has already been replied to or deferred.
- `fetchMessage(channelId, messageId)` — fetches a channel and then a message; throws if the channel is not text-based or cannot fetch messages.
- `createEmbed(titleOrData, description)` — returns an `EmbedBuilder` from a title and optional description, embed data, or an existing builder.

## `src/utils/components.js`

- `makeButton(customId, label, style = 'Primary')` — creates a custom-ID button. `style` can be a `ButtonStyle` name or numeric style value; unknown names fall back to `Primary`.
- `createV2Payload(content)` — converts Components V2 object syntax, a string, a component builder, or an array of components into a payload with `MessageFlags.IsComponentsV2`. Invalid images, buttons, menus, or separator spacing throw errors.

See [Messages and Components V2](components.md) for supported object fields.

## `src/utils/errorHandler.js`

- `safelyRun(action, onError)` — awaits an action, logs thrown errors, then optionally awaits an error handler. Errors from the error handler are also logged.

## `src/utils/logger.js`

- `log(...values)` — formats values with Node.js `util.format` and writes one line to standard output.
- `writeFlowLogs(options, context)` — evaluates function-valued log arguments with the triggering context and sends each configured entry to `log`.

## `src/middleware/discordEvents.js`

This module subscribes `dispatchInteraction` to Discord's `InteractionCreate` event and `dispatchReaction` to `MessageReactionAdd`. Importing the generated `EasyBot.js` loads this middleware.
