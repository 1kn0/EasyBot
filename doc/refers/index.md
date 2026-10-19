# Discord references

Short, copyable references for common Discord values used in EasyBot projects. Each topic has its own guide:

- [Discord IDs](ids.md) — enable Developer Mode, copy IDs, and distinguish a message ID from its author's user ID.
- [Mentions](mentions.md) — mention users, channels, and roles in messages.
- [Avatar and image URLs](avatars.md) — get user, member, server, and bot avatar URLs.

Examples use the callback values provided by EasyBot event flows. In `bot.onMessage().reply((message) => ...)`, the callback receives one Discord `Message`. In `bot.onMemberJoin().reply((member) => ...)`, it receives one `GuildMember`.
