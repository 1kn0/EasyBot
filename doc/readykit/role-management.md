# Role management helpers

`AddRole()` and `RemoveRole()` add ready-to-use role-management slash command behavior. Both require a configured moderator role ID and send private replies.

```js
import { bot } from 'EasyBot';

const MODERATOR_ROLE_ID = 'MODERATOR_ROLE_ID';

bot.slashCommand('addrole', 'Give one or more roles to a member')
  .AddRole({ moderatorRoleId: MODERATOR_ROLE_ID });

bot.slashCommand('removerole', 'Remove selected roles or all manageable roles')
  .RemoveRole({ moderatorRoleId: MODERATOR_ROLE_ID });
```

## AddRole

Adds required `member` and `role1` options, optional `role2` through `role5`, and an optional audit-log `reason`. Select one to five roles. The helper checks each selected role is not managed, `@everyone`, or at/above the bot's highest role before assigning.

## RemoveRole

Adds required `member`, optional `role1` through `role5`, a `remove-all` boolean, and an optional audit-log `reason`.

- Set one or more role options to remove selected roles.
- Set `remove-all` to `true` to remove every role the bot can manage from the member.
- `@everyone`, integration/managed roles, and roles at or above the bot's highest role are never removed.
- When explicitly selected roles are not manageable, the helper refuses the change and identifies the blocked roles instead of silently skipping them.

## Permissions

The bot needs **Manage Roles**, and its highest role must be above every role it adds or removes. The moderator role should only be assigned by trusted administrators. Discord remains authoritative and may reject a change if the hierarchy or permissions change between validation and the request.
