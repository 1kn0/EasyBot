# Interactions and reactions

The generated middleware routes interaction and reaction events to EasyBot's registered handlers.

## Button interactions

Register a reply handler for a button's exact custom ID:

```js
bot.onButton('help:rules')
  .ifHasRole('MEMBER_ROLE_ID')
  .reply('Please read the rules channel.')
  .else()
  .reply('This button is for server members.');
```

## Select menus

`bot.onSelectMenu(customId)` handles string, user, role, channel, and mentionable select menus with the matching custom ID.

```js
bot.onSelectMenu('settings:choice')
  .reply((interaction) => `Selected: ${interaction.values.join(', ')}`);
```

Read selected values and resolved users/roles/channels from the standard Discord.js interaction object.

## Modals

`bot.onModal(customId)` handles submitted modals with the matching custom ID:

```js
bot.onModal('feedback:submit')
  .reply((interaction) => `Thanks, ${interaction.user}!`);
```

Use `bot.ui.ModalBuilder` and `bot.ui.TextInputBuilder`, or Discord.js directly, to create and show a modal. Use `bot.onInteraction(...)` for custom modal display logic.

## Shared interaction-chain methods

`onButton`, `onSelectMenu`, and `onModal` return chains with:

- `.ifHasRole(roleId)` — require a role on the invoking member.
- `.log(...values)` — log values when invoked; function values receive the interaction.
- `.reply(response)` — set the main response. The response can be a string, an interaction payload, or a callback receiving the interaction.
- `.else().reply(response)` — set the response for a failed role check.
- `.catchError().reply(response)` — set a fallback for a handler error.

The interaction helper uses `reply` for new interactions and `followUp` after an interaction is already replied to or deferred.

## Raw interactions

`bot.onInteraction(handler)` subscribes a callback to every Discord interaction event. The callback receives the raw Discord.js interaction; use its type guards (`isButton()`, `isChatInputCommand()`, and others) to branch. Errors are logged by the helper.

## Reactions

`bot.onReaction(emoji)` handles added reactions. Pass an emoji name or custom emoji ID to filter; omit the argument to handle every reaction:

```js
bot.onReaction('✅')
  .log((reaction) => `Reaction in ${reaction.message.channelId}`)
  .reply((reaction, user) => `Thanks for reacting, ${user}!`);
```

Reaction-chain methods:

- `.log(...values)` — log when a matching reaction is handled; function values receive the reaction.
- `.reply(response)` — set a reply string, message payload, or callback result. The callback receives `(reaction, user)`.
- `.catchError().reply(response)` — configure a fallback reply on the reacted-to message.

Bot users are ignored. Partial reactions and users are fetched before handlers run.
