# Server info helper

`ServerInfo(options)` is a built-in slash-command action. Configure which fields to show with `true` or `false` in your bot code; every field is shown by default. The action automatically returns a Components V2 card and does not add display-toggle options to the slash command.

```js
import { bot } from 'EasyBot';

bot.slashCommand('serverinfo', 'Show server information')
  .ServerInfo({
    showName: true,
    showIcon: true,
    showDescription: true,
    showOwner: true,
    showCreated: true,
    showMembers: true,
    showChannels: true,
    showRoles: true,
    showBoosts: true,
    showVerification: false,
  });
```

`ServerInfo(options)` accepts:

| Option | Default | Displays |
| --- | --- | --- |
| `showName` | `true` | Server name; also used as the card title. |
| `showIcon` | `true` | Server icon image at the top of the card. |
| `showDescription` | `true` | Server description, when one is set. |
| `showOwner` | `true` | Server owner mention. |
| `showCreated` | `true` | Server creation date. |
| `showMembers` | `true` | Current server member count. |
| `showChannels` | `true` | Cached channel count, labelled as cached. |
| `showRoles` | `true` | Role count excluding `@everyone`. |
| `showBoosts` | `true` | Boost count and server boost tier. |
| `showVerification` | `true` | Server verification level. |

Set any field to `false` in the `.ServerInfo({...})` call to hide it. If all fields are hidden, the card explains that no information fields are selected.

The helper can only display server information when invoked inside a server. Enable the Server Members privileged intent in the Developer Portal if the bot also needs member lifecycle events.
