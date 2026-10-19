# Avatar and image URLs

Discord.js provides URL methods for user and guild images. These methods return a URL string (or `null` for a guild image that is not set).

## Sender's avatar in a message flow

The `onMessage` callback receives a Discord `Message`; the sender is `message.author`.

```js
bot.onMessage()
  .command('!avatar', 'Show your avatar')
  .reply((message) => {
    const avatarUrl = message.author.displayAvatarURL({
      extension: 'png',
      size: 256,
    });

    return {
      embeds: [
        bot.embed({
          title: `${message.author.username}'s avatar`,
          image: { url: avatarUrl },
        }),
      ],
    };
  });
```

`displayAvatarURL()` returns the user's displayed avatar, including a default avatar when they have not set a custom one. Use `avatarURL()` if you specifically want only their custom avatar; it may return `null`.

## Joining member's avatar

In an `onMemberJoin` flow, use `member.user` to access the Discord user:

```js
bot.onMemberJoin()
  .sendTo('WELCOME_CHANNEL_ID')
  .reply((member) => ({
    embeds: [
      bot.embed({
        title: `Welcome, ${member.user.username}!`,
        thumbnail: { url: member.user.displayAvatarURL({ size: 256 }) },
      }),
    ],
  }));
```

## Server icon

Use `guild.iconURL()` to get the server icon. It can be `null` if the server has no icon.

```js
bot.onMessage()
  .command('!servericon', 'Show the server icon')
  .reply((message) => {
    const iconUrl = message.guild?.iconURL({ size: 512 });
    if (!iconUrl) return 'This server does not have an icon.';

    return {
      embeds: [bot.embed({ title: message.guild.name, image: { url: iconUrl } })],
    };
  });
```

## Bot avatar

Read the bot user's avatar after the client is ready:

```js
bot.onReady((client) => {
  const avatarUrl = client.user.displayAvatarURL({ size: 256 });
  bot.log(`Bot avatar: ${avatarUrl}`);
});
```

For image links in Discord embeds, pass the URL as `image: { url }` or `thumbnail: { url }`. The URL must be reachable by Discord; local file paths on your computer will not work.
