# Event flows

Event-flow methods are chainable. A flow is registered when a terminal handler such as `.reply(...)` or `.componentV2(...)` is added. Use `.else()` to set a fallback reply for a failed role check, and `.catchError()` to set a fallback for a thrown error.

## Message flow

```js
bot.onMessage()
  .ifHasRole('MODERATOR_ROLE_ID')
  .command('!hello', 'Say hello')
  .log((message) => `Command from ${message.author.tag}`)
  .reply('Hello!')
  .else()
  .reply('You need the moderator role.');
```

`onMessage` listens to guild messages only and ignores messages authored by bots. Without `.command(...)`, it handles every guild message. With `.command(name, description)`, a message is handled when its content starts with `name`; `description` is stored on the flow but is not used to register a slash command.

| Chain method | Signature | Behavior |
| --- | --- | --- |
| `ifHasRole` | `.ifHasRole(roleId)` | Continue only when the member has the role. |
| `log` | `.log(...values)` | Log values when a matching handler executes; function values receive the message. |
| `command` | `.command(name, description)` | Filter messages by `startsWith(name)`. |
| `react` | `.react(emoji)` | Add a reaction to each matching message. May be repeated. |
| `embed` | `.embed(titleOrData, description)` | Add an embed to the flow reply. May be repeated. |
| `button` | `.button(customId, label, style = 'Primary')` | Add one custom-ID button to the flow reply. |
| `selectMenu` | `.selectMenu(customId, placeholder, choices)` | Add one string select menu to the flow reply. |
| `componentV2` | `.componentV2(content)` | Send a Components V2 response; see [Components](components.md). |
| `else` | `.else()` | Set the next `.reply(...)` as the reply when the role check fails. |
| `catchError` | `.catchError()` | Set the next `.reply(...)` as the error fallback. |
| `reply` | `.reply(content)` | Set the response; content may be a string, Discord payload, or callback receiving the message. |

For message callbacks, return a string or Discord message payload. Added embeds and components are merged into the reply payload.

## Member-join flow

```js
bot.onMemberJoin()
  .sendTo('WELCOME_CHANNEL_ID')
  .log((member) => `Welcome ${member.user.tag}`)
  .reply('Welcome to the server, {user}!');
```

| Chain method | Signature | Behavior |
| --- | --- | --- |
| `sendTo` | `.sendTo(channelId)` | Select the channel used for the welcome message. |
| `ifHasRole` | `.ifHasRole(roleId)` | Require the joining member to have a role before sending the main reply. |
| `log` | `.log(...values)` | Log values when a member joins; function values receive the guild member. |
| `reply` | `.reply(content)` | Send a string, payload, or callback result to the selected text channel. |
| `else` | `.else().reply(content)` | Send a fallback string when the role check fails. `{user}` is replaced with the joining user mention. |
| `catchError` | `.catchError().reply(content)` | DM the member with the configured error fallback. |
| `componentV2` | `.componentV2(content)` | Send a Components V2 welcome payload. A callback receives the guild member. |

The flow fetches the configured channel when a member joins and requires it to be text-based. String replies replace `{user}` with the member mention. For rich payloads, build mentions explicitly in the callback.
