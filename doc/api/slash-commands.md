# Slash commands

`bot.slashCommand(name, description)` creates a Discord chat-input command and returns a chain. Add option definitions before setting the handler:

```js
bot.slashCommand('greet', 'Greet a user')
  .userOption('member', 'Who to greet', true)
  .reply((interaction) => `Hello ${interaction.options.getUser('member')}!`);
```

Use a lowercase command name that meets Discord's command naming rules. Command and option descriptions are required.

## Option methods

Each option method has the signature `(name, description, required = false)` and returns the chain:

| Method | Discord option type |
| --- | --- |
| `.stringOption(name, description, required)` | String |
| `.integerOption(name, description, required)` | Integer |
| `.numberOption(name, description, required)` | Number |
| `.booleanOption(name, description, required)` | Boolean |
| `.userOption(name, description, required)` | User |
| `.roleOption(name, description, required)` | Role |
| `.channelOption(name, description, required)` | Channel |
| `.mentionableOption(name, description, required)` | Mentionable |

Read submitted values through the standard Discord.js `interaction.options` API in the reply callback.

## Handler methods

- `.ifHasRole(roleId)` requires the invoking member to have the role.
- `.log(...values)` logs when the command is invoked; function values receive the interaction.
- `.reply(response)` sets the main response and registers the command.
- `.else().reply(response)` sets a response for a failed role check.
- `.catchError().reply(response)` sets an error fallback.

The response can be a string, a Discord interaction reply payload, or an async callback receiving the interaction. Call `.reply(...)` or one of the Ready Kit actions below to register the command.

## Ready Kit actions

The generated slash-command chain also includes built-in PascalCase actions. They add their own options and handler; do not add `.reply(...)` afterward unless you intentionally want to replace the built-in handler.

```js
bot.slashCommand('serverinfo', 'Show server information')
  .ServerInfo({ showMembers: true, showVerification: false });

bot.slashCommand('userinfo', 'Show user information')
  .UserInfo({ showAvatar: false, showRoles: true });

bot.slashCommand('ban', 'Ban a member')
  .Ban({ moderatorRoleId: 'MODERATOR_ROLE_ID' });
```

| Action | Behavior |
| --- | --- |
| `.ServerInfo(options)` | Configures display fields in code and returns a Components V2 guild-information card. |
| `.UserInfo(options)` | Configures display fields in code, adds an optional target-user option, and returns a Components V2 user card. |
| `.Ban({ moderatorRoleId })` | Adds a target and optional reason; requires the configured moderator role and bot ban permission. |
| `.Kick({ moderatorRoleId })` | Adds a target and optional reason; requires the configured moderator role and bot kick permission. |
| `.Timeout({ moderatorRoleId })` | Adds a target, duration (1–40320 minutes), and optional reason; requires the moderator role and Moderate Members permission. |
| `.AddRole({ moderatorRoleId })` | Adds a target and up to five role options; requires the moderator role and Manage Roles. |
| `.RemoveRole({ moderatorRoleId })` | Adds a target, five optional roles, and `remove-all`; protects managed roles, `@everyone`, and roles above the bot. |

Moderation helper replies are private. They check the configured moderator role and Discord.js manageability/role hierarchy where applicable. Discord's permission checks remain authoritative. See [Ready Kits](../readykit/Kits.md) for full usage and configuration details.

## Registration behavior

The generated `bot.start()` registers all commands created with `bot.slashCommand(...)` globally after the client becomes ready. Global command changes may take time to appear in Discord. For native builders and custom registration behavior, use `bot.registerSlashCommand(...)` or the lower-level `bot.client` and `bot.api` surfaces.

```js
import { SlashCommandBuilder } from 'discord.js';
import { bot } from 'EasyBot';

const command = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check bot availability');

bot.registerSlashCommand(command, (interaction) => interaction.reply('Pong!'));
```

`bot.registerSlashCommand(definition, handler)` registers the definition and handler in the generated helper. Handlers receive the Discord.js interaction.
