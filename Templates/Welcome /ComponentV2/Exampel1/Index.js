
import { bot } from 'EasyBot';

const WELCOME_CHANNEL_ID = 'YOUR_WELCOME_CHANNEL_ID';
const RULES_CHANNEL_ID = 'YOUR_RULES_CHANNEL_ID';
const VERIFY_CHANNEL_ID = 'YOUR_VERIFY_CHANNEL_ID';

bot.onMemberJoin()
  .sendTo(WELCOME_CHANNEL_ID)
  .componentV2((member) => new bot.ui.ContainerBuilder()
    .addMediaGalleryComponents(
      new bot.ui.MediaGalleryBuilder().addItems(
        new bot.ui.MediaGalleryItemBuilder()
          .setURL('https://i.pinimg.com/1200x/ac/37/fe/ac37fede2ad971ae36fdffb9cee1fbbe.jpg'),
      ),
    )
    .addSeparatorComponents(
      new bot.ui.SeparatorBuilder().setDivider(true),
    )
    .addTextDisplayComponents(
      new bot.ui.TextDisplayBuilder().setContent(
        `## Welcome to ${member.guild.name}!\n\nHello ${member}, you are member **#${member.guild.memberCount.toLocaleString()}**.`,
      ),
    )
    .addActionRowComponents(
      new bot.ui.ActionRowBuilder().addComponents(
        new bot.ui.ButtonBuilder()
          .setLabel('Rules')
          .setStyle(bot.ui.ButtonStyle.Link)
          .setURL(`https://discord.com/channels/${member.guild.id}/${RULES_CHANNEL_ID}`),
        new bot.ui.ButtonBuilder()
          .setLabel('Verify')
          .setStyle(bot.ui.ButtonStyle.Link)
          .setURL(`https://discord.com/channels/${member.guild.id}/${VERIFY_CHANNEL_ID}`),
      ),
    ));
