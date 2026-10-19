import { bot } from 'EasyBot';

const ADMIN_ROLE_ID = ''; // who can post the role selector
const ROLES = [
  { label: '',  value: '', description: '', emoji: '👦' },
  { label: '', value: '', description: '', emoji: '👧' },
  { label: '', value: '', description: '', emoji: '👤' },
];

bot.onMessage()
  .ifHasRole(ADMIN_ROLE_ID)
  .command('!roles', 'Post the role selector')
  .componentV2({
    title: 'Choose Your Roles',
    content: 'Pick the roles you want from the menu below.\nDeselect a role to remove it.',
    color: 0x5865f2,
    selectMenu: {
      customId: 'roles:select',
      placeholder: 'Select your roles...',
      minValues: 0,
      maxValues: ROLES.length,
      options: ROLES,
    },
  })
  .else()
  .reply('You need the admin role to use this command.');

bot.onSelectMenu('roles:select')
  .reply(async (interaction) => {
    const member = interaction.member;
    const selected = interaction.values;
    const added = [];
    const removed = [];

    for (const role of ROLES) {
      const has = member.roles.cache.has(role.value);
      if (selected.includes(role.value) && !has) {
        await member.roles.add(role.value);
        added.push(`<@&${role.value}>`);
      } else if (!selected.includes(role.value) && has) {
        await member.roles.remove(role.value);
        removed.push(`<@&${role.value}>`);
      }
    }

    const lines = [];
    if (added.length) lines.push(`✅ Added: ${added.join(', ')}`);
    if (removed.length) lines.push(`➖ Removed: ${removed.join(', ')}`);

    return {
      content: lines.join('\n') || 'No changes made.',
      flags: bot.ui.MessageFlags.Ephemeral,
      allowedMentions: { parse: [] },
    };
  })
  .catchError()
  .reply({
    content: 'I could not update your roles. Make sure my role is above them and I have Manage Roles.',
    flags: bot.ui.MessageFlags.Ephemeral,
  });