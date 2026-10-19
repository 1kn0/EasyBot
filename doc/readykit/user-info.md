# User info helper

`UserInfo(options)` is a built-in slash-command action. Configure which fields to show with `true` or `false` in your bot code, then build and return a Components V2 card. It also adds an optional target-user slash-command option.

```js
import { bot } from 'EasyBot';

bot.slashCommand('userinfo', 'Show user information')
  .UserInfo({
    showName: true,
    showAvatar: false,
    showId: true,
    showBot: true,
    showCreated: false,
    showServerJoin: true,
    showNickname: true,
    showRoles: true,
  });
```

If no user is selected, the card is about the person who ran the command. Every display option defaults to `true`; set an option to `false` in the `.UserInfo({...})` call to hide that field.

| Option | Default | Displays |
| --- | --- | --- |
| `showName` | `true` | Account tag/name; also used as card title. |
| `showAvatar` | `true` | User avatar image at the top of the card. |
| `showId` | `true` | Discord user ID. |
| `showBot` | `true` | Whether the account is a bot. |
| `showCreated` | `true` | Account creation date. |
| `showServerJoin` | `true` | Join date when the target is a current guild member. |
| `showNickname` | `true` | Guild nickname, or `None`. |
| `showRoles` | `true` | Up to 20 guild role names and a count of any additional roles. |

The `user` option remains a slash-command option so users can choose whom to inspect; it defaults to the person who ran the command.

Account fields are available for any selected user. Guild-specific fields are shown when Discord resolves the user as a member of the current server.
