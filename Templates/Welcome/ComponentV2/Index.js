import { bot } from 'EasyBot';

const WELCOME_CHANNEL_ID = 'YOUR_WELCOME_CHANNEL_ID';
const RULES_CHANNEL_ID = 'YOUR_RULES_CHANNEL_ID';
const VERIFY_CHANNEL_ID = 'YOUR_VERIFY_CHANNEL_ID';

bot.onMemberJoin()
  .sendTo(WELCOME_CHANNEL_ID)
  .componentV2((member) => ({
    title: 'Welcome!',
    content: `Welcome to ${member.guild.name}, ${member}!\nYou are member **#${member.guild.memberCount.toLocaleString()}**.`,
    separator: true,
    image: 'https://i.pinimg.com/1200x/ac/37/fe/ac37fede2ad971ae36fdffb9cee1fbbe.jpg',
    buttons: [
      {
        label: 'Rules',
        url: `https://discord.com/channels/${member.guild.id}/${RULES_CHANNEL_ID}`,
      },
      {
        label: 'Verify',
        url: `https://discord.com/channels/${member.guild.id}/${VERIFY_CHANNEL_ID}`,
      },
    ],
  }));