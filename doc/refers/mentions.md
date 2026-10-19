# Discord mentions

Discord mentions are formatted strings. Use the callback's Discord.js object when you can; Discord.js formats a user mention when interpolated.

## Mention the sender of a message

In an `onMessage` callback, `message` is the Discord message. Its author is `message.author`.

```js
bot.onMessage()
  .command('!hello', 'Say hello')
  .reply((message) =>
    `Hello ${message.author}! Your user ID is ${message.author.id}.`,
  );
```

You can also create the mention explicitly using the author ID:

```js
`Hello <@${message.author.id}>!`
```

Do not write `.reply((member, message) => ...)` for this flow. EasyBot passes only one argument to the callback.

## Mention the joining member

The `onMemberJoin` callback receives a `GuildMember`:

```js
bot.onMemberJoin()
  .sendTo('WELCOME_CHANNEL_ID')
  .reply((member) => `Welcome, ${member}!`);
```

Or format it explicitly with the member's user ID:

```js
`Welcome, <@${member.id}>!`
```

## Mention a channel or role

Use `<#CHANNEL_ID>` for a channel and `<@&ROLE_ID>` for a role:

```js
bot.onMessage()
  .command('!links', 'Show useful server links')
  .reply(() =>
    'Read the rules in <#RULES_CHANNEL_ID> and ask <@&HELPER_ROLE_ID> if you need help.',
  );
```

Replace the placeholders with real IDs copied using Discord Developer Mode. The bot needs permission to view the mentioned channels for members to use them.
