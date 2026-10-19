# User info helper

`UserInfo()` is a built-in slash-command action. It adds an optional target-user option and a boolean option for each information field, then builds and returns a Components V2 card.

```js
import { bot } from 'EasyBot';

bot.slashCommand('userinfo', 'Show user information')
  .UserInfo();
```

If no user is selected, the card is about the person who ran the command. Every `show-*` option defaults to `true`; set individual options to `false` in the slash command to hide that field.

| Option | Displays |
| --- | --- |
| `user` | Optional user to inspect; defaults to the invoker. |
| `show-name` | Account tag/name; also used as card title. |
| `show-avatar` | User avatar image at the top of the card. |
| `show-id` | Discord user ID. |
| `show-bot` | Whether the account is a bot. |
| `show-created` | Account creation date. |
| `show-server-join` | Join date when the target is a current guild member. |
| `show-nickname` | Guild nickname, or `None`. |
| `show-roles` | Up to 20 guild role names and a count of any additional roles. |

Account fields are available for any selected user. Guild-specific fields are shown when Discord resolves the user as a member of the current server.
