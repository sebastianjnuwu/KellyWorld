const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client) => {
  const slashCommands = await globPromise(`${process.cwd()}/src/SlashCommands/*/*.js`);
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
  const file = require(value);

  if (!file?.name) return;
  client.slashCommands.set(file.name, file);

  if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
  arrayOfSlashCommands.push(file);
});

client.on("ready", async () => {
  await client.application.commands.set(arrayOfSlashCommands);
});
  
  const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
  eventFiles.map((value) => require(value)
);

};