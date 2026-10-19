# Ban, kick, and timeout helpers

Each action is a built-in slash-command helper. Pass a trusted moderator role ID; the helper adds a required target member option, optional reason, role gate, action handler, and private success/error replies.

```js
import { bot } from 'EasyBot';

const MODERATOR_ROLE_ID = 'MODERATOR_ROLE_ID';

bot.slashCommand('ban', 'Ban a server member')
  .Ban({ moderatorRoleId: MODERATOR_ROLE_ID });

bot.slashCommand('kick', 'Kick a server member')
  .Kick({ moderatorRoleId: MODERATOR_ROLE_ID });

bot.slashCommand('timeout', 'Timeout a server member')
  .Timeout({ moderatorRoleId: MODERATOR_ROLE_ID });
```

## Actions and permissions

| Helper | Options added | Required bot permission |
| --- | --- | --- |
| `.Ban({ moderatorRoleId })` | `member`, optional `reason` | Ban Members |
| `.Kick({ moderatorRoleId })` | `member`, optional `reason` | Kick Members |
| `.Timeout({ moderatorRoleId })` | `member`, `minutes` (1–40320), optional `reason` | Moderate Members |

The helper checks that the command invoker has `moderatorRoleId`; unauthorized users receive a private denial. It checks Discord.js `bannable`, `kickable`, and `moderatable` status before taking action. Discord's permissions and role hierarchy remain authoritative. Timeout is limited to 28 days.

Replace the placeholder role ID with a trusted moderator role. Do not make this role self-assignable. Only grant the bot the permissions needed by the actions you enable.
