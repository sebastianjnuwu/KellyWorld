//importing all the packages that will be used!
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

//Exporting slash commands
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

//registering commands in slash
client.on("ready", async () => {
  await client.application.commands.set(arrayOfSlashCommands);
});
  
  //loading the bot events folder!
  const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
  eventFiles.map((value) => require(value)
);
//Poiser this is the end of the code ;-;
};