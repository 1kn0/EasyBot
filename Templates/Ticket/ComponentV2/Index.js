import { PermissionFlagsBits as PermissionFlags } from 'discord.js';
import { bot } from 'EasyBot';

const ADMIN_ROLE_ID   = '';   
const SUPPORT_ROLE_ID = ''; 
const CATEGORY_ID     = ''; 

const { ChannelType, MessageFlags } = bot.ui;

bot.onMessage()
  .ifHasRole(ADMIN_ROLE_ID)
  .command('!ticket-setup', 'Post the ticket panel')
  .log((message) => `Ticket panel posted by ${message.author.tag}`)
  .componentV2({
    title: 'Support Tickets',
    content: 'Need help? Press the button below and a private channel will be created for you.',
    color: 0x5865f2,
    buttons: [
      { label: 'Create Ticket', customId: 'ticket:create', style: 'Success', emoji: '🎫' },
    ],
  })
  .else()
  .reply('You need the admin role to use this command.')
  .catchError()
  .reply('Could not post the ticket panel. Check the terminal for details.');

bot.onButton('ticket:create')
  .log((interaction) => `Ticket requested by ${interaction.user.tag}`)
  .reply(async (interaction) => {
    const { guild, user } = interaction;
    const ephemeral = MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral;

    const existing = guild.channels.cache.find(
      (c) => c.type === ChannelType.GuildText && c.topic === `ticket:${user.id}`,
    );
    if (existing) {
      return {
        flags: ephemeral,
        components: bot.componentsV2(`You already have an open ticket: ${existing}`).components,
      };
    }

    const channel = await guild.channels.create({
      name: `ticket-${user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 90),
      type: ChannelType.GuildText,
      parent: CATEGORY_ID || undefined,
      topic: `ticket:${user.id}`,
      permissionOverwrites: [
        { id: guild.roles.everyone.id, deny: [PermissionFlags.ViewChannel] },
        {
          id: user.id,
          allow: [PermissionFlags.ViewChannel, PermissionFlags.SendMessages, PermissionFlags.ReadMessageHistory],
        },
        {
          id: SUPPORT_ROLE_ID,
          allow: [PermissionFlags.ViewChannel, PermissionFlags.SendMessages, PermissionFlags.ReadMessageHistory],
        },
        {
          id: bot.client.user.id,
          allow: [PermissionFlags.ViewChannel, PermissionFlags.SendMessages, PermissionFlags.ManageChannels],
        },
      ],
    });

    await channel.send({
      ...bot.componentsV2({
        title: `Ticket for ${user.username}`,
        content:
          `Hello ${user}, welcome to your ticket!\n` +
          `Describe your problem and <@&${SUPPORT_ROLE_ID}> will help you soon.`,
        separator: true,
        footer: 'Press "Close Ticket" when you are done.',
        color: 0x57f287,
        buttons: [
          { label: 'Close Ticket', customId: 'ticket:close', style: 'Danger', emoji: '🔒' },
        ],
      }),
      allowedMentions: { users: [user.id], roles: [SUPPORT_ROLE_ID] },
    });
    return {
      flags: ephemeral,
      components: bot.componentsV2(`Your ticket has been created: ${channel}`).components,
    };
  })
  .catchError()
  .reply({ content: 'Could not create the ticket. Make sure the bot has Manage Channels permission.', flags: MessageFlags.Ephemeral });

bot.onButton('ticket:close')
  .ifHasRole(SUPPORT_ROLE_ID)
  .log((interaction) => `Ticket ${interaction.channel.name} closed by ${interaction.user.tag}`)
  .reply(async (interaction) => {
    const channel = interaction.channel;
    setTimeout(() => channel.delete('Ticket closed').catch(() => {}), 5000);
    return 'Ticket will be deleted in 5 seconds...';
  })
  .else()
  .reply({ content: 'Only support staff can close tickets.', flags: MessageFlags.Ephemeral })
  .catchError()
  .reply({ content: 'Could not close the ticket.', flags: MessageFlags.Ephemeral });