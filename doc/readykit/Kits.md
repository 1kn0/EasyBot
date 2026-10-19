# EasyBot Ready Kits

Ready Kits are built-in helper actions in the generated EasyBot project. They add the slash-command options, run the Discord.js action, and build Components V2 cards where applicable.

## Server and member information

- [Server info](server-info.md) — `.ServerInfo()` registers configurable fields and builds the Components V2 response.
- [User info](user-info.md) — `.UserInfo()` registers configurable account/member fields and builds the Components V2 response.

## Community

- [Goodbye message](goodbye-message.md) — `.onMemberLeave().sendTo(channelId).Goodbye(options)` sends a ready-made Components V2 card.

## Moderation

- [Ban, kick, and timeout](moderation.md) — `.Ban()`, `.Kick()`, and `.Timeout()` add protected moderation actions to slash commands.
- [Add and remove roles](role-management.md) — `.AddRole()` and `.RemoveRole()` add multi-role actions, including safe remove-all.
- [Clear recent messages](clear-messages.md) — delete recent messages in the invoking channel.

Replace placeholder IDs, install the helper in a project JavaScript file, and grant only the bot permissions required by the feature. See [Getting started](../guides/getting-started.md) before running a generated project.
