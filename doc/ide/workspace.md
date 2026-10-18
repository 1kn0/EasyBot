# IDE workspace

## Explorer and editor

- Create files using the Explorer's **+** button. Select a folder and enter a file name.
- Use a file's context menu to rename or delete it.
- Open files in tabs and switch between them. Workspace files, open tabs, and the active tab are saved in browser local storage.
- JavaScript editor completions include the EasyBot helper methods and Discord.js UI builders.
- JSON files are edited with JSON language support.

## Check

The **Check** button checks every workspace `.js`, `.mjs`, and `.cjs` file with the JavaScript parser, and every `.json` file with the JSON parser. Results appear in the check output panel, including file and line/column information when a syntax error is detected.

This is a syntax check, not a full type check, lint, Discord API validation, or execution test. Files in other formats are not checked.

## Build project

**Build project** validates JSON, generates the EasyBot runtime modules and `package.json`, preserves workspace file paths, and downloads `EasyBot.zip`. The generated project is an ES module package and uses Discord.js v14.

The builder rejects invalid paths, reserved generated-file paths, and malformed JSON. It does not include `.env`; add the token to a local `.env` after extraction.

## Templates

The template explorer lists repository folders and JavaScript source files. Markdown and image files are not shown in its file list. Public template source is fetched from the EasyBot GitHub repository.

## Keyboard shortcuts

Open the shortcut help from the icon at the bottom of the file sidebar. Editor shortcuts include undo, redo, and selecting the next matching occurrence; available commands depend on the editor focus.
