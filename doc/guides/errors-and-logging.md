# Errors and logging

## Logging from a flow

Call `.log(...)` on a supported event, interaction, reaction, or slash-command chain:

```js
bot.onMessage()
  .command('!ping', 'Check the bot')
  .log('Ping command received')
  .reply('Pong!');
```

Each registered log runs when the flow handler runs. A log argument may be a function that receives the triggering context:

```js
bot.onMemberJoin()
  .sendTo('WELCOME_CHANNEL_ID')
  .log((member) => `Joined: ${member.user.tag}`)
  .reply('Welcome, {user}!');
```

The callback context is the message for `onMessage`, guild member for `onMemberJoin`, interaction for interaction and slash-command chains, and reaction for `onReaction`.

## Startup logging

Use the `bot.log` method without importing another logger:

```js
bot.log('Starting setup');
bot.log('Loaded %d cogs', 3);
```

The `log` function is also a named export from `EasyBot` for callers that prefer it:

```js
import { log } from 'EasyBot';
log('Startup complete');
```

The logger uses Node.js `util.format` and writes to standard output.

## Error handlers and fallback replies

Use `.catchError().reply(...)` to set a user-facing fallback for an error thrown while a helper handler runs:

```js
bot.onMessage()
  .command('!profile', 'Show your profile')
  .reply(async (message) => loadProfile(message.author.id))
  .catchError()
  .reply('Could not load your profile.');
```

Unhandled helper errors are written to standard error. When a fallback reply itself fails, that error is also logged. A Discord failure can still prevent a fallback response from reaching the user.

Use `.else().reply(...)` for the alternate response when a configured role check fails. `.else()` is not a general-purpose conditional branch.
