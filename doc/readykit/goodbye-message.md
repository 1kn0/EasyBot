# Goodbye helper

`onMemberLeave()` listens for Discord's `GuildMemberRemove` event. Call `.sendTo(channelId)` and `.Goodbye(options)` to send a ready-made Components V2 goodbye card:

```js
import { bot } from 'EasyBot';

bot.onMemberLeave()
  .sendTo('GOODBYE_CHANNEL_ID')
  .Goodbye({
    showUser: true,
    showServerName: true,
    showMemberCount: true,
    showAccountCreated: false,
    showAvatar: false,
  });
```

`Goodbye(options)` accepts:

| Option | Default | Behavior |
| --- | --- | --- |
| `title` | `"Goodbye!"` | Card title. |
| `showUser` | `true` | Include the departing member's account tag/name. |
| `showServerName` | `true` | Include the server name. |
| `showMemberCount` | `true` | Include the member count after departure. |
| `showAccountCreated` | `false` | Include the user's account creation date. |
| `showAvatar` | `false` | Use the departing member's avatar as the card image. |
| `image` | unset | Optional custom banner URL; takes priority over the avatar. |
| `separator` | `true` | Add a Components V2 divider; accepts the normal separator options too. |
| `color` | unset | Optional container accent color. |

The bot needs **View Channel** and **Send Messages** in the goodbye channel. The Server Members privileged intent must be enabled in the Developer Portal and is already part of the generated client's default intents. A leave event does not include a reason; it only indicates the member left or was removed.
