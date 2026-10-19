# Server info helper

`ServerInfo()` is a built-in slash-command action. It adds one optional boolean option for each field and automatically returns a Components V2 card. Every field is shown by default; set its option to `false` when running the slash command to hide it.

```js
import { bot } from 'EasyBot';

bot.slashCommand('serverinfo', 'Show server information')
  .ServerInfo();
```

The helper adds these slash options:

| Option | Displays |
| --- | --- |
| `show-name` | Server name; also used as the card title. |
| `show-icon` | Server icon image at the top of the card. |
| `show-description` | Server description, when one is set. |
| `show-owner` | Server owner mention. |
| `show-created` | Server creation date. |
| `show-members` | Current server member count. |
| `show-channels` | Cached channel count, labelled as cached. |
| `show-roles` | Role count excluding `@everyone`. |
| `show-boosts` | Boost count and server boost tier. |
| `show-verification` | Server verification level. |

Example command use: run `/serverinfo` and set `show-icon` to `false` to omit the icon. If all fields are hidden, the card explains that no information fields are selected.

The helper can only display server information when invoked inside a server. Enable the Server Members privileged intent in the Developer Portal if the bot also needs member lifecycle events.
