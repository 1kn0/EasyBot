# Messages and Components V2

## Regular embeds and components

Build an embed and attach it to a message flow:

```js
bot.onMessage()
  .command('!info', 'Show server info')
  .embed('Server info', 'Welcome to the server.')
  .reply('Here is the information.');
```

`bot.embed(titleOrData, description)` returns a Discord.js `EmbedBuilder`. Pass a title string and optional description, a Discord embed data object, or an existing builder.

Message flows also support `.button(customId, label, style = 'Primary')`, `.selectMenu(customId, placeholder, choices)`, and `.react(emoji)`. For custom layouts or more select-menu types, build Discord.js components with `bot.ui` or Discord.js directly.

## Components V2 object syntax

Use `.componentV2(object)` inside a message, member-join, or slash-command flow:

```js
bot.onMemberJoin()
  .sendTo('WELCOME_CHANNEL_ID')
  .componentV2((member) => ({
    title: 'Welcome!',
    content: `Welcome ${member} to ${member.guild.name}!`,
    separator: true,
    image: 'https://example.com/banner.png',
    buttons: [
      { label: 'Rules', url: 'https://discord.com/channels/GUILD_ID/RULES_CHANNEL_ID' },
      { label: 'Verify', url: 'https://discord.com/channels/GUILD_ID/VERIFY_CHANNEL_ID' },
    ],
  }));
```

The callback receives the flow context: message, member, or interaction depending on the flow. It may also return the object directly when no dynamic values are needed.

### Object properties

| Property | Type | Behavior |
| --- | --- | --- |
| `title` | string | Adds a Markdown level-two heading to the text display. |
| `content` | string | Text shown beneath the title. `description` is accepted as an alias. |
| `footer` | string | Adds a small Markdown footer line. |
| `separator` | boolean or object | Adds a divider. Object options: `divider` (defaults to `true`) and `spacing` (`"Small"`, `"Large"`, `1`, or `2`). |
| `image` | URL string | Adds a single image. |
| `images` | array | Adds multiple images; each item is a URL string or `{ url, description }`. Takes precedence over `image`. |
| `color` | number | Sets the container accent color. |
| `buttons` | array | Adds link or custom-ID buttons. |
| `selectMenu` | object | Adds one string select menu. |
| `selectMenus` | array | Adds string select menus; takes precedence over `selectMenu` and supports up to five. |

Properties are rendered in this order: image gallery, separator, text display, button rows, then select menus.

### Button objects

- Link button: `{ label: 'Rules', url: 'https://example.com/rules' }`
- Interactive button: `{ label: 'Confirm', customId: 'welcome:confirm' }`
- Optional properties: `style`, `disabled`, and `emoji`.
- Link buttons are assigned Discord's Link style automatically. Non-link buttons require `customId`; their style defaults to `Primary`.
- Buttons are grouped into rows of at most five.

### Select-menu objects

Provide `customId` and optional properties:

```js
selectMenu: {
  customId: 'welcome:choice',
  placeholder: 'Choose an option',
  options: [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
  ],
  minValues: 1,
  maxValues: 1,
}
```

Each option follows Discord.js `StringSelectMenuBuilder` option data requirements.

## Native Discord.js builders

`bot.componentsV2(...components)` wraps component builders, a string, or an array in a Components V2 message payload. The builder methods and constants are available under `bot.ui`; see [Client and Discord.js exports](client-and-discord.md).
