# Client and Discord.js exports

EasyBot exposes the underlying Discord.js client and selected Discord.js APIs. For other Discord.js functionality, import it directly from `discord.js` in generated bot files.

## `bot.client`

`bot.client` is the generated `discord.js` `Client`. Use it for native event listeners, managers, REST access, and APIs not wrapped by EasyBot.

```js
bot.client.on(bot.api.Events.GuildCreate, (guild) => {
  bot.log(`Joined ${guild.name}`);
});
```

Add event handlers before `bot.start()`.

## `bot.api`

The `bot.api` object contains:

- `REST`
- `Routes`
- `ApplicationCommandOptionType`
- `ChannelType`
- `GatewayIntentBits`
- `Events`
- `ActivityType`

Example:

```js
bot.useIntent(bot.api.GatewayIntentBits.GuildPresences);
bot.setActivity('the server', 'Watching');
```

`bot.useIntent(...intents)` adds intent bit flags to the client and returns `bot`. `bot.setActivity(name, type = 'Watching')` schedules activity setup after the client is ready and returns `bot`. Supported activity names are `Playing`, `Streaming`, `Listening`, `Watching`, and `Competing`.

## `bot.ui`

The `bot.ui` object exports these Discord.js builders and constants:

- Rows and buttons: `ActionRowBuilder`, `ButtonBuilder`, `ButtonStyle`
- Select menus: `StringSelectMenuBuilder`, `UserSelectMenuBuilder`, `RoleSelectMenuBuilder`, `ChannelSelectMenuBuilder`, `MentionableSelectMenuBuilder`
- Components V2: `ContainerBuilder`, `SectionBuilder`, `TextDisplayBuilder`, `ThumbnailBuilder`, `MediaGalleryBuilder`, `MediaGalleryItemBuilder`, `FileBuilder`, `SeparatorBuilder`, `SeparatorSpacingSize`, `MessageFlags`
- Embeds and modals: `EmbedBuilder`, `ModalBuilder`, `TextInputBuilder`
- Discord constants: `ActivityType`, `ApplicationCommandOptionType`, `ChannelType`, `Events`, `GatewayIntentBits`
- Slash commands: `SlashCommandBuilder`

The complete supported option shapes follow the installed Discord.js v14 builder APIs. When using builders directly, follow Discord's component and interaction limits.

## Direct Discord.js imports

The generated project includes `discord.js` as a dependency, so bot files can import any public API:

```js
import { Events, GatewayIntentBits } from 'discord.js';
import { bot } from 'EasyBot';

bot.client.on(Events.ClientReady, (client) => {
  bot.log(`Ready as ${client.user.tag}`);
});
```
