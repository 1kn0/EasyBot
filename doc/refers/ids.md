# Discord IDs

Discord IDs are unique strings of digits (often called snowflakes). Keep them as strings in your code; do not do arithmetic with them or convert them to JavaScript numbers.

## Copy an ID in Discord

1. Open **User Settings → Advanced** and turn on **Developer Mode**.
2. Right-click the relevant server, channel, user, or role.
3. Choose **Copy Server ID**, **Copy Channel ID**, **Copy User ID**, or **Copy Role ID**.

For a message ID, right-click the message and choose **Copy Message ID**.

## IDs available in an `onMessage` callback

The callback receives one `message` argument. `message.id` is the message's ID; the sender is `message.author`.

```js
import { bot } from 'EasyBot';

bot.onMessage()
  .command('!ids', 'Show message and sender IDs')
  .reply((message) => {
    const senderId = message.author.id;
    const messageId = message.id;
    const serverId = message.guild?.id ?? 'This message is not in a server.';
    const channelId = message.channel.id;

    return `Sender: ${senderId}\nMessage: ${messageId}\nServer: ${serverId}\nChannel: ${channelId}`;
  });
```

`message.guild` is `null` in a direct message, so check for it before reading the server ID.

## IDs available when a member joins

The callback receives a `GuildMember`, not a message. Its ID is the joining user's ID.

```js
bot.onMemberJoin()
  .sendTo('WELCOME_CHANNEL_ID')
  .reply((member) =>
    `User ID: ${member.id}\nServer ID: ${member.guild.id}`,
  );
```

## Role ID

Copy a role ID with Developer Mode, or find a role by its ID from the guild role cache:

```js
bot.onMessage()
  .command('!role', 'Show a role')
  .reply((message) => {
    const role = message.guild?.roles.cache.get('ROLE_ID');
    return role ? `Role: ${role.name} (${role.id})` : 'Role not found.';
  });
```

## Keep IDs quoted

Use IDs as strings, including when storing them in settings:

```js
const WELCOME_CHANNEL_ID = '123456789012345678';
```

Do not share your bot token. A token is a secret credential, not an ID.
