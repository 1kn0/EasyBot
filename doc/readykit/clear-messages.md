# Clear recent messages

Add `.clearMessages(count)` to an `onMessage()` chain to delete recent messages from the channel where the command was received:

```js
import { bot } from 'EasyBot';

bot.onMessage()
  .ifHasRole('MODERATOR_ROLE_ID')
  .command('!clear', 'Delete recent messages')
  .clearMessages(10)
  .reply('Cleared recent messages.')
  .else()
  .reply('You need the moderator role to use this command.')
  .catchError()
  .reply('I could not clear the messages. Check my channel permissions.');
```

## Behavior and limits

- `count` must be an integer from **1 to 100**; invalid values throw immediately while the flow is configured.
- The bot requests the most recent `count` messages in the triggering channel and bulk-deletes messages younger than Discord's 14-day bulk-delete limit.
- The triggering command message can be included in the count. The bot's reply is sent afterward and is not included.
- Messages older than 14 days are skipped by Discord.js. If no messages remain eligible, nothing is deleted.
- The bot needs **Manage Messages** in the channel. The author also needs any role required by `.ifHasRole(...)`.
- A `!clear 10` message is only filtered by the configured command prefix; the count comes from `.clearMessages(10)` in the code, not from parsing the command text.
- The action runs before reactions and the configured reply. If deletion fails, the helper routes the error to `.catchError().reply(...)` when configured.

Only use this action where you have permission to moderate the channel.
