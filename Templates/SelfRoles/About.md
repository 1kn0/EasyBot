# Self Roles Components V2

This example adds a self role system built with Components V2. An admin posts a role selector with the `!roles` command. Members pick the roles they want from a select menu, and deselecting a role removes it. After each selection, the bot sends a private message listing which roles were added or removed.

## Preview

![Self roles preview](./preview.webp)

## Setup

In `index.js`, replace `ADMIN_ROLE_ID` with the role allowed to post the selector. Then edit the `ROLES` list: set each `value` to the role ID from your server, and change the `label`, `description`, and `emoji` to match. You can add or remove entries, and the menu will allow selecting up to as many roles as the list contains.

Make sure the bot has the **Manage Roles** permission and that its own role sits above every role in the list, or it won't be able to assign them. Then type `!roles` in the channel where you want the selector to appear.